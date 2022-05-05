import { DbTestCase, DbTestCaseResults, getMocksToWrite } from "src/testing";

const MOCKS_COUNT = 100;

export default new DbTestCase(
  "findMultiple",
  async (db) => {
    const mocks = getMocksToWrite(MOCKS_COUNT);
    const collection = db.getCollection();

    const fromIndex = Math.floor((Math.random() * MOCKS_COUNT) / 2);

    const ids = mocks
      .slice(fromIndex, Math.floor(MOCKS_COUNT / 3))
      .map(({ publicId }) => publicId);

    await collection
      .find({
        publicId: { $nin: ids },
      })
      .toArray();
  },
  async (db) => {
    const collection = db.getCollection();
    await collection.deleteMany({});
  },
  async (db) => {
    const mocks = getMocksToWrite(MOCKS_COUNT);
    const collection = db.getCollection();

    await collection.insertMany(mocks);
  }
);
