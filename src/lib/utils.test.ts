import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("should merge basic classes", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("should handle conditional classes", () => {
    // using a variable to avoid constant binary expression linting error
    const isFalse = false;
    expect(cn("a", isFalse && "b", undefined, null, "c")).toBe("a c");
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

  it("should handle empty inputs", () => {
    expect(cn()).toBe("");
  });

  it("should ignore falsy values", () => {
    expect(cn(0, "", NaN, null, undefined, false)).toBe("");
  });

  it("should handle deeply nested arrays", () => {
    expect(cn(["a", ["b", ["c"]]])).toBe("a b c");
  });

  it("should correctly merge arbitrary tailwind values", () => {
    expect(cn("text-[14px]", "text-[16px]")).toBe("text-[16px]");
    expect(cn("bg-[#000]", "bg-[#fff]")).toBe("bg-[#fff]");
  });

  it("should retain non-conflicting tailwind classes", () => {
    expect(cn("text-red-500", "bg-blue-500", "p-4")).toBe("text-red-500 bg-blue-500 p-4");
  });

  it("should correctly handle tailwind responsive modifiers", () => {
    expect(cn("p-2", "md:p-4")).toBe("p-2 md:p-4");
    expect(cn("p-2", "md:p-4", "p-4")).toBe("md:p-4 p-4");
    expect(cn("md:p-2", "md:p-4")).toBe("md:p-4");
  });

  it("should correctly handle state modifiers", () => {
    expect(cn("hover:text-red-500", "hover:text-blue-500")).toBe("hover:text-blue-500");
    expect(cn("text-red-500 hover:text-blue-500")).toBe("text-red-500 hover:text-blue-500");
  });
});
