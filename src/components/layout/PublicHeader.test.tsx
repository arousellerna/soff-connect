import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { PublicHeader } from "./PublicHeader";
import userEvent from "@testing-library/user-event";

// Mock react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        utbildning: "Utbildning",
        omOss: "Om oss",
        loggaIn: "Logga in",
      };
      return translations[key] || key;
    },
  }),
}));

// Mock LanguageSwitcher since it might have its own complex logic or hooks
vi.mock("@/components/LanguageSwitcher", () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher-mock">Lang</div>,
}));

describe("PublicHeader", () => {
  const renderHeader = () => {
    return render(
      <MemoryRouter>
        <PublicHeader />
      </MemoryRouter>
    );
  };

  it("renders the logo properly", () => {
    renderHeader();
    const logo = screen.getByAltText("SOFF - Säkerhets- och försvarsföretagen");
    expect(logo).toBeInTheDocument();
  });

  it("renders desktop navigation links and login button", () => {
    renderHeader();

    // Test navigation links
    const utbildningLinks = screen.getAllByText("Utbildning");
    expect(utbildningLinks.length).toBeGreaterThan(0);

    const omOssLinks = screen.getAllByText("Om oss");
    expect(omOssLinks.length).toBeGreaterThan(0);

    // Test login button
    const loginButtons = screen.getAllByText("Logga in");
    expect(loginButtons.length).toBeGreaterThan(0);
  });

  it("toggles mobile menu when the hamburger icon is clicked", async () => {
    renderHeader();
    const user = userEvent.setup();

    const toggleButton = screen.getByLabelText("Toggle menu");

    // Initially the mobile menu should have max-h-0 class (hidden)
    // There are multiple nav elements, the second one is the mobile menu
    const navs = screen.getAllByRole("navigation");
    const mobileMenuContainer = navs[1].parentElement;
    expect(mobileMenuContainer).toHaveClass("max-h-0");

    // Click to open
    await user.click(toggleButton);
    expect(mobileMenuContainer).toHaveClass("max-h-64");

    // Click to close
    await user.click(toggleButton);
    expect(mobileMenuContainer).toHaveClass("max-h-0");
  });

  it("closes mobile menu when a mobile link is clicked", async () => {
    renderHeader();
    const user = userEvent.setup();

    const toggleButton = screen.getByLabelText("Toggle menu");
    const navs = screen.getAllByRole("navigation");
    const mobileMenuContainer = navs[1].parentElement;

    // Open menu
    await user.click(toggleButton);
    expect(mobileMenuContainer).toHaveClass("max-h-64");

    // Find a link in the mobile menu and click it
    // We can target the mobile specific links by querying inside the mobile menu container
    const mobileUtbildningLink = mobileMenuContainer?.querySelector('a[href="/utbildning"]');
    if (mobileUtbildningLink) {
      await user.click(mobileUtbildningLink);
    } else {
      throw new Error("Mobile link not found");
    }

    // Should be closed again
    expect(mobileMenuContainer).toHaveClass("max-h-0");
  });
});
