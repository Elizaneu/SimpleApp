export type MockData = {
  readonly publicId: number;
  readonly name: string;
};

export function getMocksToWrite(mocksCount: number): MockData[] {
  const mocks: MockData[] = [];

  for (let i = 0; i < mocksCount; i++) {
    const mock: MockData = {
      publicId: i,
      name: `${i} - name`,
    };

    mocks.push(mock);
  }

  return mocks;
}
