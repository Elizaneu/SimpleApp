import { Config } from "./core/Config";
import { MongoDb } from "./core/MongoDb";
import { DbTestCase, getMocksToWrite } from "./testing";
import { getDbs } from "./utils/getDbs";

// Fill databases with mock data to test that databases connected successfully
export const fillDbs = async () => {
  // Get dbs
  const dbs = getDbs();

  // Connect
  for (const db of dbs) {
    await db.connect();
  }

  // Create test case to fill db with mock data
  const fillDbCase = new DbTestCase({
    name: "fill database",
    onRun: async (db) => {
      const collection = db.getCollection();

      await collection.insertMany(getMocksToWrite(15));
    },
  });

  // Running test case for each database
  for (const db of dbs) {
    fillDbCase.setMongoDb(db);
    await fillDbCase.run();
  }

  // Disconnect
  for (const db of dbs) {
    await db.disconnect();
  }
};

// Clear databases from mock data
export const clearDbs = async () => {
  // Get dbs
  const dbs = getDbs();

  // Connect
  for (const db of dbs) {
    await db.connect();
  }

  // Delete all data in test collection
  const clearDbTestCase = new DbTestCase({
    name: "clear database",
    onRun: async (db) => {
      const collection = db.getCollection();
      await collection.deleteMany({});
    },
  });

  for (const db of dbs) {
    clearDbTestCase.setMongoDb(db);
    await clearDbTestCase.run();
  }

  // Disconnect
  for (const db of dbs) {
    await db.disconnect();
  }
};
