import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProgressBar } from "../ProgressBar";

describe("ProgressBar", () => {
  it("renders with default props (0/100)", () => {
    render(<ProgressBar value={0} />);
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("calculates percentage correctly for positive values", () => {
    render(<ProgressBar value={25} max={100} />);
    expect(screen.getByText("25%")).toBeInTheDocument();
  });

  it("calculates percentage correctly with custom max", () => {
    render(<ProgressBar value={10} max={20} />);
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("handles max = 0 correctly by showing 0%", () => {
    render(<ProgressBar value={10} max={0} />);
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("clamps values greater than max to 100%", () => {
    render(<ProgressBar value={150} max={100} />);
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("clamps negative values to 0%", () => {
    render(<ProgressBar value={-50} max={100} />);
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("renders a custom label when provided", () => {
    const label = "Progress Label";
    render(<ProgressBar value={50} label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("hides the percentage label when showLabel is false", () => {
    render(<ProgressBar value={50} showLabel={false} />);
    expect(screen.queryByText("50%")).not.toBeInTheDocument();
  });

  it("still renders label even if showLabel is false", () => {
    const label = "Force Label";
    render(<ProgressBar value={50} showLabel={false} label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.queryByText("50%")).not.toBeInTheDocument();
  });

  it("applies custom className to the container", () => {
    const { container } = render(<ProgressBar value={50} className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
