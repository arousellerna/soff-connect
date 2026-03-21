import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useIsMobile } from "./use-mobile";

describe("useIsMobile", () => {
  let addEventListenerMock: any;
  let removeEventListenerMock: any;
  let changeListener: any;

  beforeEach(() => {
    // Reset window.innerWidth
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });

    addEventListenerMock = vi.fn((event, callback) => {
      if (event === "change") {
        changeListener = callback;
      }
    });

    removeEventListenerMock = vi.fn((event, callback) => {
      if (event === "change" && changeListener === callback) {
        changeListener = null;
      }
    });

    // Mock matchMedia
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: addEventListenerMock,
        removeEventListener: removeEventListenerMock,
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return false when window.innerWidth is >= 768", () => {
    window.innerWidth = 1024;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("should return true when window.innerWidth is < 768", () => {
    window.innerWidth = 500;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("should update when window size changes to mobile", () => {
    window.innerWidth = 1024;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    act(() => {
      window.innerWidth = 600;
      if (changeListener) {
        changeListener({ matches: true } as MediaQueryListEvent);
      }
    });

    expect(result.current).toBe(true);
  });

  it("should update when window size changes to desktop", () => {
    window.innerWidth = 500;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);

    act(() => {
      window.innerWidth = 800;
      if (changeListener) {
        changeListener({ matches: false } as MediaQueryListEvent);
      }
    });

    expect(result.current).toBe(false);
  });

  it("should clean up event listener on unmount", () => {
    const { unmount } = renderHook(() => useIsMobile());

    expect(addEventListenerMock).toHaveBeenCalledWith("change", expect.any(Function));

    unmount();

    expect(removeEventListenerMock).toHaveBeenCalledWith("change", expect.any(Function));
  });
});
