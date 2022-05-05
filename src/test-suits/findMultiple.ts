import { DbTestCase, getMocksToWrite } from "src/testing";

const MOCKS_COUNT = 100;

export default new DbTestCase({
  name: "findMultiple",
  onRun: async (db) => {
    const mocks = getMocksToWrite(MOCKS_COUNT);
    const collection = db.getCollection();

    const ids = mocks.slice(50, 20).map(({ publicId }) => publicId);

    await collection
      .find({
        publicId: { $in: ids },
      })
      .toArray();
  },
  onDispose: async (db) => {
    const collection = db.getCollection();
    await collection.deleteMany({});
  },
  onBefore: async (db) => {
    const mocks = getMocksToWrite(MOCKS_COUNT);
    const collection = db.getCollection();

    await collection.insertMany(mocks);
  },
});
