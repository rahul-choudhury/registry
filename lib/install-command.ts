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

export function readPackageManagerPreference(storage?: StorageReader | null) {
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

export function writePackageManagerPreference(
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
