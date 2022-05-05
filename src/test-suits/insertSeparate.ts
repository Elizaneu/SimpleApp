import { DbTestCase, DbTestCaseResults, getMocksToWrite } from "src/testing";

const MOCKS_COUNT = 100;

export default new DbTestCase(
  "insertSeparate",
  async (db) => {
    const mocks = getMocksToWrite(MOCKS_COUNT);
    const nestedTestCases = mocks.map(
      (mock, index) =>
        new DbTestCase(
          index.toString(),
          async (db) => {
            const collection = db.getCollection();
            await collection.insertOne({
              ...mock,
            });
          },
          async (db) => {},
          async (db) => {}
        )
    );

    const results: DbTestCaseResults[] = [];
    for (const testCase of nestedTestCases) {
      testCase.setMongoDb(db);
      results.push(await testCase.run());
    }

    return results;
  },
  async (db) => {
    const collection = db.getCollection();
    await collection.deleteMany({});
  },
  async (db) => {}
);
