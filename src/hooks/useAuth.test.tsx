import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "./useAuth";
import { supabase } from "@/integrations/supabase/client";
import React from "react";

// Mock the dependencies
vi.mock("@/integrations/supabase/client", () => {
  return {
    supabase: {
      auth: {
        getSession: vi.fn(),
        onAuthStateChange: vi.fn(),
      },
      from: vi.fn(),
    },
  };
});

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: vi.fn() }),
}));

describe("useAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should handle error in fetchProfile gracefully and set loading to false", async () => {
    // Mock getSession to return a user so fetchProfile is called
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: {
        session: {
          user: { id: "test-user-id" },
        },
      },
    } as any);

    // Mock onAuthStateChange
    vi.mocked(supabase.auth.onAuthStateChange).mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    } as any);

    // Mock the chain for supabase.from("profiles").select("*").eq("id", userId).single()
    const mockSingle = vi.fn().mockResolvedValue({
      data: null,
      error: new Error("Failed to fetch profile"),
    });
    const mockEq = vi.fn().mockReturnValue({ single: mockSingle });
    const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });
    vi.mocked(supabase.from).mockReturnValue({ select: mockSelect } as any);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    // Initially loading might be true
    expect(result.current.loading).toBe(true);

    // Wait for the effect to complete and fetchProfile to finish
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Verify profile is null because fetch failed
    expect(result.current.profile).toBeNull();

    // Ensure supabase was called correctly
    expect(supabase.from).toHaveBeenCalledWith("profiles");
    expect(mockSelect).toHaveBeenCalledWith("*");
    expect(mockEq).toHaveBeenCalledWith("id", "test-user-id");
    expect(mockSingle).toHaveBeenCalled();
  });
});
