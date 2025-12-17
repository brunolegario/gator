import os from "node:os";
import path from "node:path";
import { writeFileSync, readFileSync } from "node:fs";

type Config = {
  dbUrl: string;
  currentUserName: string;
};

export function setUser(user: string) {
  const config = readConfig();
  config.currentUserName = user;
  writeConfig(config);
}

export function readConfig(): Config {
  const filePath = getConfigFilePath();

  const fileContent = readFileSync(filePath, { encoding: "utf-8" });
  const parsed = JSON.parse(fileContent);

  return validateConfig(parsed);
}

function getConfigFilePath(): string {
  const homeDir = os.homedir();
  const fileName = ".gatorconfig.json";

  return path.join(homeDir, fileName);
}

function validateConfig(_config: any): Config {
  if (!_config.db_url || typeof _config.db_url !== "string") {
    throw new Error("Invalid or missing 'db_url' in config file.");
  }
  if (
    !_config.current_user_name ||
    typeof _config.current_user_name !== "string"
  ) {
    throw new Error("Invalid or missing 'current_user_name' in config file.");
  }

  const config: Config = {
    dbUrl: _config.db_url,
    currentUserName: _config.current_user_name,
  };
  return config;
}

const writeConfig = (config: Config) => {
  const filePath = getConfigFilePath();

  const _config = {
    db_url: config.dbUrl,
    current_user_name: config.currentUserName,
  };
  const data = JSON.stringify(_config, null, 2);

  writeFileSync(filePath, data, { encoding: "utf-8" });
};
