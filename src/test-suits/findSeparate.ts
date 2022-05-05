import { DbTestCase, DbTestCaseResults, getMocksToWrite } from "src/testing";

const MOCKS_COUNT = 100;

export default new DbTestCase(
  "findSeparate",
  async (db) => {
    const mocks = getMocksToWrite(MOCKS_COUNT);
    const nestedTestCases = mocks.map(
      (mock, index) =>
        new DbTestCase(
          index.toString(),
          async (db) => {
            const collection = db.getCollection();
            await collection.findOne({
              publicId: index,
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
  async (db) => {
    const mocks = getMocksToWrite(MOCKS_COUNT);
    const collection = db.getCollection();

    for (const mock of mocks) {
      await collection.insertOne({
        ...mock,
      });
    }
  }
);
