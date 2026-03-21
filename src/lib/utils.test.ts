import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("should merge basic classes", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("should handle conditional classes", () => {
    expect(cn("a", false && "b", undefined, null, "c")).toBe("a c");
  });

  it("should merge tailwind classes correctly", () => {
    // p-4 should override p-2
    expect(cn("p-2", "p-4")).toBe("p-4");
    // px-4 should override p-2 horizontal padding
    expect(cn("p-2", "px-4")).toBe("p-2 px-4");
    // text-lg should override text-sm
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
  });

  it("should handle arrays and objects", () => {
    expect(cn(["a", "b"], { c: true, d: false })).toBe("a b c");
  });

  it("should handle complex combinations", () => {
    expect(
      cn(
        "bg-red-500",
        { "bg-blue-500": true },
        ["text-white", "p-2"],
        "p-4"
      )
    ).toBe("bg-blue-500 text-white p-4");
  });
});
