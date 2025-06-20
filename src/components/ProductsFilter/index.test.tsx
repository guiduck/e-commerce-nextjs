import { render, screen, fireEvent } from "@testing-library/react";
import { ProductsFilter } from "./index";

jest.mock("@/stores/useProductsStore", () => ({
  useProductsStore: () => ({
    setAllProducts: jest.fn(),
    setTotalPages: jest.fn(),
    setFilteredProducts: jest.fn(),
    currentPage: 1,
    setCurrentPage: jest.fn(),
  }),
}));

const mockProducts = [
  {
    id: 1,
    title: "Apple",
    price: 10,
    description: "",
    images: [],
    category: { id: 1, name: "Fruits", slug: "", image: "" },
  },
  {
    id: 2,
    title: "Banana",
    price: 5,
    description: "",
    images: [],
    category: { id: 1, name: "Fruits", slug: "", image: "" },
  },
  {
    id: 3,
    title: "Carrot",
    price: 3,
    description: "",
    images: [],
    category: { id: 2, name: "Vegetables", slug: "", image: "" },
  },
];

describe("ProductsFilter (light UI test)", () => {
  it("renders filter inputs and selects", () => {
    render(<ProductsFilter products={mockProducts} />);

    expect(screen.getByPlaceholderText(/buscar por nome/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/preço mínimo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/preço máximo/i)).toBeInTheDocument();
    expect(screen.getByText(/todas categorias/i)).toBeInTheDocument();
  });

  it("filters by name input", () => {
    render(<ProductsFilter products={mockProducts} />);

    const searchInput = screen.getByPlaceholderText(/buscar por nome/i);
    fireEvent.change(searchInput, { target: { value: "apple" } });

    expect(searchInput).toHaveValue("apple");
  });

  it("filters by price range", () => {
    render(<ProductsFilter products={mockProducts} />);

    const minPrice = screen.getByPlaceholderText(/preço mínimo/i);
    const maxPrice = screen.getByPlaceholderText(/preço máximo/i);

    fireEvent.change(minPrice, { target: { value: "4" } });
    fireEvent.change(maxPrice, { target: { value: "10" } });

    expect(minPrice).toHaveValue(4);
    expect(maxPrice).toHaveValue(10);
  });
});
