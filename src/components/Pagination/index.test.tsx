import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "@/components/Pagination";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams("page=2"),
}));

jest.mock("@/stores/useProductsStore", () => ({
  useProductsStore: () => ({
    totalPages: 5,
    setCurrentPage: jest.fn(),
  }),
}));

describe("Pagination", () => {
  it("renders current, previous, and next page buttons", () => {
    render(<Pagination />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "←" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "→" })).toBeInTheDocument();
  });

  it("handles page button click", () => {
    render(<Pagination />);
    const pageButton = screen.getByText("3");
    fireEvent.click(pageButton);
  });
});
