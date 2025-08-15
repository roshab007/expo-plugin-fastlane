import { ConfigPlugin, withDangerousMod } from "@expo/config-plugins";
import fs from "fs-extra";
import path from "path";

type PlatformConfig = {
  src: string; // mandatory if platform provided
  dest?: string; // optional, defaults to "ios" or "android"
};

type FastlaneConfig = {
  ios?: PlatformConfig;
  android?: PlatformConfig;
};

const copyFastlaneFiles = async (
  projectRoot: string,
  platform: "ios" | "android",
  config: PlatformConfig
) => {
  if (!config.src) {
    throw new Error(`❌ "src" is required for ${platform} fastlane config`);
  }

  const resolvedSrc = path.resolve(projectRoot, config.src);
  const resolvedDest = path.resolve(projectRoot, config.dest || platform);

  if (!(await fs.pathExists(resolvedSrc))) {
    throw new Error(`❌ Source path does not exist: ${resolvedSrc}`);
  }

  const fastlaneDir = path.join(resolvedDest, "fastlane");
  await fs.ensureDir(fastlaneDir);

  console.log(`📂 Copying Fastlane files for ${platform}...`);
  const files = await fs.readdir(resolvedSrc);

  for (const file of files) {
    const srcPath = path.join(resolvedSrc, file);

    if (file === "Gemfile" || file === "Gemfile.lock") {
      await fs.copy(srcPath, path.join(resolvedDest, file));
    } else {
      await fs.copy(srcPath, path.join(fastlaneDir, file));
    }
  }

  console.log(`✅ Fastlane files copied to ${resolvedDest}`);
};

const withFastlane: ConfigPlugin<FastlaneConfig> = (cfg, { ios, android }) => {
  if (ios) {
    cfg = withDangerousMod(cfg, [
      "ios",
      async (config) => {
        await copyFastlaneFiles(config.modRequest.projectRoot, "ios", ios);
        return config;
      },
    ]);
  }

  if (android) {
    cfg = withDangerousMod(cfg, [
      "android",
      async (config) => {
        await copyFastlaneFiles(
          config.modRequest.projectRoot,
          "android",
          android
        );
        return config;
      },
    ]);
  }

  return cfg;
};

export default withFastlane;
