import { render, screen, fireEvent } from "@testing-library/react";
import FullScreenMenu from "@/components/FullScreenMenu";

jest.mock("next/navigation", () => ({
  usePathname: () => "/produtos",
}));

jest.mock("@/components/ui/theme-toggle", () => ({
  __esModule: true,
  default: () => <div data-testid="theme-toggle" />,
}));

describe("FullScreenMenu", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;
  });

  it("opens and shows menu items", () => {
    render(<FullScreenMenu />);
    fireEvent.click(screen.getByRole("button", { name: "Menu" }));

    expect(screen.getByText("Menu")).toBeInTheDocument();
    expect(screen.getByText("Warehouses")).toBeInTheDocument();
    expect(screen.getByText("Produtos")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("calls logout on click", async () => {
    render(<FullScreenMenu />);
    fireEvent.click(screen.getByRole("button", { name: "Menu" }));
    fireEvent.click(screen.getByText("Logout"));

    expect(global.fetch).toHaveBeenCalledWith("/api/auth/logout", {
      method: "POST",
    });
  });
});
