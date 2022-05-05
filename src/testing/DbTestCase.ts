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
    public readonly name: string,
    protected readonly onRun: (
      db: MongoDb
    ) => Promise<DbTestCaseResults[] | void>,
    protected readonly onDispose: (db: MongoDb) => Promise<void>,
    protected readonly onBefore: (db: MongoDb) => Promise<void>
  ) {}

  public setMongoDb(db: MongoDb): void {
    this.db = db;
  }

  public async run(): Promise<DbTestCaseResults> {
    if (!this.db) {
      throw new Error("[ERROR] Db was not provided!");
    }

    const tracker = new TimeTracker();

    await this.onBefore(this.db);
    tracker.start();
    const results = await this.onRun(this.db);
    tracker.stop();
    await this.onDispose(this.db);

    return {
      name: this.name,
      time: tracker.getTime(),
      nested: results || ([] as DbTestCaseResults[]),
    };
  }
}
