import { loadAliases } from "./src/utils/loadAliases";
loadAliases();

import { Config } from "src/core/Config";
import insertMultiple from "src/test-suits/insertMultiple";
import insertSeparate from "src/test-suits/insertSeparate";
import findMultiple from "src/test-suits/findMultiple";
import findSeparate from "src/test-suits/findSeparate";
import { MongoDb } from "src/core/MongoDb";
import { DbTestCase } from "src/testing";
Config.loadEnv();

const init = async () => {
  const localDb = new MongoDb(
    Config.getLocalMongoDbConfig().url,
    Config.getLocalMongoDbConfig().db
  );
  const containerDb = new MongoDb(
    Config.getContainerMongoDbConfig().url,
    Config.getContainerMongoDbConfig().db
  );
  const cloudDb = new MongoDb(
    Config.getCloudMongoDbConfig().url,
    Config.getCloudMongoDbConfig().db
  );

  await localDb.connect();
  await containerDb.connect();
  await cloudDb.connect();

  const testSuites = [
    insertMultiple,
    insertSeparate,
    findMultiple,
    findSeparate,
  ];

  const stats: any = testSuites.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.name]: {},
    };
  }, {} as any);

  const runTestSuit = async (
    testSuit: DbTestCase,
    db: MongoDb,
    type: string
  ) => {
    testSuit.setMongoDb(db);
    const result = await testSuit.run();

    stats[testSuit.name][type] = {
      time: null,
      avg: null,
    };

    if (result.nested.length) {
      const avg = result.nested.reduce((acc, { name, time }, index) => {
        return acc + time / result.nested.length;
      }, 0);

      stats[testSuit.name][type].avg = avg;
    }

    stats[testSuit.name][type].time = result.time;
  };

  for (const testSuit of testSuites) {
    await runTestSuit(testSuit, localDb, "local");
    await runTestSuit(testSuit, containerDb, "container");
    await runTestSuit(testSuit, cloudDb, "cloud");
  }

  for (const key of Object.keys(stats)) {
    const value = stats[key];

    console.log(key);
    console.table(value);
    console.log("\n");
  }

  localDb.disconnect();
  containerDb.disconnect();
  cloudDb.disconnect();
};

init();
