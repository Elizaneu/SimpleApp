import { DbTestCase, DbTestCaseResults, getMocksToWrite } from "src/testing";

const MOCKS_COUNT = 100;

export default new DbTestCase(
  __filename,
  async (db) => {
    const mocks = getMocksToWrite(MOCKS_COUNT);
    const collection = db.getCollection();

    await collection.insertMany(mocks);
  },
  async (db) => {
    const collection = db.getCollection();
    await collection.deleteMany({});
  },
  async (db) => {}
);
