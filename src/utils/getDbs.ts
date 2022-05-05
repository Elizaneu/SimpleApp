import { Config } from "src/core/Config";
import { MongoDb } from "src/core/MongoDb";

// Create MongoDb instances
export function getDbs(): MongoDb[] {
  const localDb = new MongoDb(
    Config.getLocalMongoDbConfig().url,
    Config.getLocalMongoDbConfig().db,
    "local"
  );
  const containerDb = new MongoDb(
    Config.getContainerMongoDbConfig().url,
    Config.getContainerMongoDbConfig().db,
    "container"
  );
  const cloudDb = new MongoDb(
    Config.getCloudMongoDbConfig().url,
    Config.getCloudMongoDbConfig().db,
    "cloud"
  );

  return [localDb, containerDb, cloudDb];
}
