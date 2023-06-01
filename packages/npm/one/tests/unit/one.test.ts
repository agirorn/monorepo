import { one } from "../../src/main";

test("calling three()", () => {
  // expect(!!something).toBe(true); // comment in this line
  expect(one()).toBe("from three");
});
