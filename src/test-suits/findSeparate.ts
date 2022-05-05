import { DbTestCase, DbTestCaseResults, getMocksToWrite } from "src/testing";

const MOCKS_COUNT = 100;

// Finds a subset of mock data in the database using one opration for each mock data item
export default new DbTestCase({
  name: "findSeparate",
  onRun: async (db) => {
    const mocks = getMocksToWrite(MOCKS_COUNT);

    const nestedTestCases = mocks.map(
      (mock, index) =>
        new DbTestCase({
          name: `findSeparate - #${index}`,
          onRun: async (db) => {
            const collection = db.getCollection();
            await collection.findOne({
              publicId: mock.publicId,
            });
          },
        })
    );

    const results: DbTestCaseResults[] = [];
    for (const testCase of nestedTestCases) {
      testCase.setMongoDb(db);
      results.push(await testCase.run());
    }

    return results;
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
