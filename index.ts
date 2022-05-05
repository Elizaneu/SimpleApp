import { loadAliases } from "./src/utils/loadAliases";
loadAliases();

import { Config } from "src/core/Config";
import { runTests } from "src/runTests";
import { clearDbs, fillDbs } from "src/checkDbs";
Config.loadEnv();

// Main function of the application
// Calls subling function based on a given process argument
const run = async () => {
  const mode = process.argv[2];

  switch (mode) {
    case "tests":
      // Run performance tests
      await runTests();
      break;

    case "fill":
      // Fill database with mock data
      await fillDbs();
      break;

    case "clear":
      // Clear database from any data
      await clearDbs();
      break;

    default:
      return;
  }
};

run();
