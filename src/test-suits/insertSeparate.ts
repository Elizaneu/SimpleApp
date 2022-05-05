import { DbTestCase, DbTestCaseResults, getMocksToWrite } from "src/testing";

const MOCKS_COUNT = 100;

// Inserts an array of mock data one by one.
// For each mock item we are calling one operation in database
export default new DbTestCase({
  name: "insertSeparate",
  onRun: async (db) => {
    const mocks = getMocksToWrite(MOCKS_COUNT);

    const nestedTestCases = mocks.map(
      (mock, index) =>
        new DbTestCase({
          name: `insertSeparate - #${index}`,
          onRun: async (db) => {
            const collection = db.getCollection();
            await collection.insertOne({
              ...mock,
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
});
