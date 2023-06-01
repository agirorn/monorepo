import { one } from "../../../src/main";

test("This is broken()", () => {
  // expect(!!something).toBe(true); // comment in this line
  expect(one()).toBe("from three");
});
