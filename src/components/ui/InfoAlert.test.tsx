import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { InfoAlert } from "./InfoAlert";

describe("InfoAlert", () => {
  it("renders with title and children", () => {
    render(
      <InfoAlert title="Test Title">
        Test Content
      </InfoAlert>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders without title", () => {
    render(
      <InfoAlert>
        Test Content
      </InfoAlert>
    );

    expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies the correct classes for info variant (default)", () => {
    const { container } = render(
      <InfoAlert>
        Test Content
      </InfoAlert>
    );

    const div = container.firstChild as HTMLElement;
    expect(div).toHaveClass("bg-primary/5");
    expect(div).toHaveClass("border-primary/20");
    expect(div).toHaveClass("text-primary");

    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("lucide-info");
    expect(svg).toHaveClass("text-primary");
  });

  it("applies the correct classes for warning variant", () => {
    const { container } = render(
      <InfoAlert variant="warning">
        Test Content
      </InfoAlert>
    );

    const div = container.firstChild as HTMLElement;
    expect(div).toHaveClass("bg-gold/10");
    expect(div).toHaveClass("border-gold/30");
    expect(div).toHaveClass("text-gold-dark");

    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("lucide-circle-alert");
    expect(svg).toHaveClass("text-gold-dark");
  });

  it("applies the correct classes for success variant", () => {
    const { container } = render(
      <InfoAlert variant="success">
        Test Content
      </InfoAlert>
    );

    const div = container.firstChild as HTMLElement;
    expect(div).toHaveClass("bg-green-50");
    expect(div).toHaveClass("border-green-200");
    expect(div).toHaveClass("text-green-800");

    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("lucide-circle-check-big");
    expect(svg).toHaveClass("text-green-600");
  });

  it("applies the correct classes for error variant", () => {
    const { container } = render(
      <InfoAlert variant="error">
        Test Content
      </InfoAlert>
    );

    const div = container.firstChild as HTMLElement;
    expect(div).toHaveClass("bg-destructive/10");
    expect(div).toHaveClass("border-destructive/30");
    expect(div).toHaveClass("text-destructive");

    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("lucide-circle-x");
    expect(svg).toHaveClass("text-destructive");
  });

  it("applies custom className", () => {
    const { container } = render(
      <InfoAlert className="custom-class">
        Test Content
      </InfoAlert>
    );

    const div = container.firstChild as HTMLElement;
    expect(div).toHaveClass("custom-class");
  });
});
