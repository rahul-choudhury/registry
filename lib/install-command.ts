export const INSTALL_COMMAND_STORAGE_KEY = "registry-package-manager";
export const DEFAULT_PACKAGE_MANAGER = "bun";

export const PACKAGE_MANAGERS = ["pnpm", "yarn", "npm", "bun"] as const;

export type PackageManager = (typeof PACKAGE_MANAGERS)[number];

const COMMAND_PREFIXES: Record<PackageManager, string> = {
  pnpm: "pnpm dlx",
  yarn: "yarn",
  npm: "npx",
  bun: "bunx --bun",
};

type StorageReader = Pick<Storage, "getItem">;
type StorageWriter = Pick<Storage, "setItem">;

export function isPackageManager(
  value: string | null,
): value is PackageManager {
  return PACKAGE_MANAGERS.includes(value as PackageManager);
}

export function buildInstallCommand(
  packageManager: PackageManager,
  url: string,
) {
  return `${COMMAND_PREFIXES[packageManager]} shadcn@latest add ${url}`;
}

function readPackageManagerPreference(
  storage?: StorageReader | null,
): PackageManager {
  if (!storage) {
    return DEFAULT_PACKAGE_MANAGER;
  }

  try {
    const value = storage.getItem(INSTALL_COMMAND_STORAGE_KEY);
    return isPackageManager(value) ? value : DEFAULT_PACKAGE_MANAGER;
  } catch {
    return DEFAULT_PACKAGE_MANAGER;
  }
}

function writePackageManagerPreference(
  storage: StorageWriter | null | undefined,
  packageManager: PackageManager,
) {
  if (!storage) {
    return;
  }

  try {
    storage.setItem(INSTALL_COMMAND_STORAGE_KEY, packageManager);
  } catch {
    // Ignore storage write failures so the picker still works in private mode.
  }
}

const packageManagerStore = {
  listeners: new Set<() => void>(),
  current: DEFAULT_PACKAGE_MANAGER as PackageManager,
  hasInitialized: false,
  hasStorageListener: false,

  emitChange() {
    for (const listener of this.listeners) {
      listener();
    }
  },

  ensureInitialized() {
    if (this.hasInitialized || typeof window === "undefined") {
      return;
    }

    this.current = readPackageManagerPreference(window.localStorage);
    this.hasInitialized = true;
  },

  ensureStorageSubscription() {
    if (this.hasStorageListener || typeof window === "undefined") {
      return;
    }

    window.addEventListener("storage", (event) => {
      if (event.key !== INSTALL_COMMAND_STORAGE_KEY) {
        return;
      }

      this.current = readPackageManagerPreference(window.localStorage);
      this.emitChange();
    });

    this.hasStorageListener = true;
  },

  subscribe(listener: () => void) {
    this.ensureInitialized();
    this.ensureStorageSubscription();
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  },

  getSnapshot(): PackageManager {
    this.ensureInitialized();
    return this.current;
  },

  getServerSnapshot(): PackageManager {
    return DEFAULT_PACKAGE_MANAGER;
  },

  set(packageManager: PackageManager) {
    this.current = packageManager;

    if (typeof window !== "undefined") {
      writePackageManagerPreference(window.localStorage, packageManager);
    }

    this.emitChange();
  },
};

export const subscribeToPackageManagerPreference =
  packageManagerStore.subscribe.bind(packageManagerStore);

export const getPackageManagerPreferenceSnapshot =
  packageManagerStore.getSnapshot.bind(packageManagerStore);

export const getPackageManagerPreferenceServerSnapshot =
  packageManagerStore.getServerSnapshot.bind(packageManagerStore);

export const setPackageManagerPreference =
  packageManagerStore.set.bind(packageManagerStore);
