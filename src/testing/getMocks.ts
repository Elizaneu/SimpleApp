import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

export type MockData = {
  readonly publicId: number;
  readonly name: string;
  readonly createdAt: number;
};

export function getMocksToWrite(mocksCount: number): MockData[] {
  const mocks: MockData[] = [];

  for (let i = 0; i < mocksCount; i++) {
    const mock: MockData = {
      publicId: i,
      name: uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
        length: 3,
      }),
      createdAt: Date.now(),
    };

    mocks.push(mock);
  }

  return mocks;
}
