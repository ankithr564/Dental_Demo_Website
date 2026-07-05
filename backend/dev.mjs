import { spawnSync } from "node:child_process";

const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const useShell = process.platform === "win32";
const env = {
  ...process.env,
  NODE_ENV: "development",
  PORT: process.env.PORT ?? "5000",
};

const build = spawnSync(npm, ["run", "build"], {
  stdio: "inherit",
  env,
  shell: useShell,
});

if (build.error) {
  throw build.error;
}

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const start = spawnSync(npm, ["run", "start"], {
  stdio: "inherit",
  env,
  shell: useShell,
});

if (start.error) {
  throw start.error;
}

if (start.status !== 0) {
  process.exit(start.status ?? 1);
}
