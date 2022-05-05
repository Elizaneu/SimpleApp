import path from "path";

export type MongoDbConnectionConfig = {
  readonly url: string;
  readonly db: string;
};

export type ConfigEnv = {
  readonly local: MongoDbConnectionConfig;
  readonly container: MongoDbConnectionConfig;
  readonly cloud: MongoDbConnectionConfig;
};

export abstract class Config {
  protected static isEnvLoaded: boolean;
  protected static env: ConfigEnv;

  public static loadEnv(): void {
    const envPath = path.join(process.cwd(), ".env.json");

    this.env = require(envPath);
    this.isEnvLoaded = true;
  }

  public static getLocalMongoDbConfig(): MongoDbConnectionConfig {
    this.checkIfEnvLoaded();

    return this.env.local;
  }

  public static getContainerMongoDbConfig(): MongoDbConnectionConfig {
    this.checkIfEnvLoaded();

    return this.env.container;
  }

  public static getCloudMongoDbConfig(): MongoDbConnectionConfig {
    this.checkIfEnvLoaded();

    return this.env.cloud;
  }

  protected static checkIfEnvLoaded(): void {
    if (!this.isEnvLoaded) {
      throw new Error(
        "[ERROR]: .env.json is not loaded. Please, check file existence"
      );
    }
  }
}
