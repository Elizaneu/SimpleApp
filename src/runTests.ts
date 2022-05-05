import findMultiple from "./test-suits/findMultiple";
import findSeparate from "./test-suits/findSeparate";
import insertMultiple from "./test-suits/insertMultiple";
import insertSeparate from "./test-suits/insertSeparate";
import { getDbs } from "./utils/getDbs";

// Runs test suites for each database and prints results into console
export const runTests = async () => {
  // Get databases
  const dbs = getDbs();

  // Connect
  for (const db of dbs) {
    await db.connect();
  }

  // Prepare pool of test suites to run for each database
  const testSuites = [
    insertMultiple,
    insertSeparate,
    findMultiple,
    findSeparate,
  ];

  // Prepare object for storing test suit results
  const stats: any = testSuites.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.options.name]: {},
    };
  }, {} as any);

  // Running each test suite for each database and store results in 'stats' object
  for (const testSuite of testSuites) {
    for (const db of dbs) {
      testSuite.setMongoDb(db);
      const result = await testSuite.run();

      // Set initial data for test suite run
      stats[testSuite.options.name][db.localName] = {
        time: null,
        avg: null,
      };

      // If test suite has nested results, evaluate average
      if (result.nested.length) {
        const avg = result.nested.reduce((acc, { time }) => {
          return acc + time / result.nested.length;
        }, 0);

        // Store average in stats object
        stats[testSuite.options.name][db.localName].avg = avg;
      }

      // Store time in stats object
      stats[testSuite.options.name][db.localName].time = result.time;
    }
  }

  // Print data to console
  for (const key of Object.keys(stats)) {
    const value = stats[key];

    console.log(key);
    console.table(value);
    console.log("\n");
  }

  // Disconnect
  for (const db of dbs) {
    await db.disconnect();
  }
};
