import { two } from "../../src/main";

test("calling three()", () => {
  expect(two()).toBe("from three");
});
