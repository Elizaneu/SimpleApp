import { MongoDb } from "src/core/MongoDb";
import { TimeTracker } from "./TimeTracker";

export type DbTestCaseResults = {
  readonly name: string;
  readonly time: number;
  readonly nested: DbTestCaseResults[];
};

export class DbTestCase {
  private db: MongoDb | undefined;

  public constructor(
    public readonly options: {
      readonly name: string;
      readonly onRun: (db: MongoDb) => Promise<DbTestCaseResults[] | void>;
      readonly onDispose?: (db: MongoDb) => Promise<void>;
      readonly onBefore?: (db: MongoDb) => Promise<void>;
    }
  ) {}

  public setMongoDb(db: MongoDb): void {
    this.db = db;
  }

  public async run(): Promise<DbTestCaseResults> {
    if (!this.db) {
      throw new Error("[ERROR] Db was not provided!");
    }

    const tracker = new TimeTracker();

    if (this.options.onBefore) {
      console.log(
        `[TEST_CASE] : ${this.options.name} on ${this.db.localName} : preparing...`
      );
      await this.options.onBefore(this.db);
    }

    tracker.start();
    console.log(
      `[TEST_CASE] : ${this.options.name} on ${this.db.localName} : running...`
    );
    const results = await this.options.onRun(this.db);
    tracker.stop();

    if (this.options.onDispose) {
      console.log(
        `[TEST_CASE] : ${this.options.name} on ${this.db.localName} : disposing...`
      );
      await this.options.onDispose(this.db);
    }

    return {
      name: this.options.name,
      time: tracker.getTime(),
      nested: results || ([] as DbTestCaseResults[]),
    };
  }
}
