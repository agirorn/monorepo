import { one } from "../../src/main";

test("calling three()", () => {
  expect(one()).toBe("from three");
});
