import { loadAliases } from "./src/utils/loadAliases";
loadAliases();

import { Config } from "src/core/Config";
import { runTests } from "src/runTests";
import { clearDbs, fillDbs } from "src/checkDbs";
Config.loadEnv();

const run = async () => {
  const mode = process.argv[2];

  switch (mode) {
    case "tests":
      await runTests();
      break;

    case "fill":
      await fillDbs();
      break;

    case "clear":
      await clearDbs();
      break;

    default:
      return;
  }
};

run();
