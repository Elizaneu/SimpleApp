import { Collection, MongoClient } from "mongodb";
import { MockData } from "src/testing";

export class MongoDb {
  protected readonly connection: MongoClient;
  protected _isConnected: boolean;

  public get isConnected(): boolean {
    return this._isConnected;
  }

  public constructor(
    protected readonly url: string,
    protected readonly dbName: string
  ) {
    this.connection = new MongoClient(url);
    this._isConnected = false;
  }

  public async connect(): Promise<void> {
    await this.connection.connect();
    this._isConnected = true;
  }

  public async disconnect(): Promise<void> {
    await this.connection.close();
  }

  public getCollection<T = MockData>(name: string = "testing"): Collection<T> {
    return this.connection.db(this.dbName).collection(name);
  }
}
