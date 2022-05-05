import { DbTestCase } from "./DbTestCase";

export type TestSuit = {
  readonly name: string;
  readonly cases: DbTestCase[];
};

export function createTestSuit(suit: TestSuit): TestSuit {
  return suit;
}
