import { render, screen, fireEvent } from "@testing-library/react";
import { EditProductForm } from "./index";

jest.mock("@/services/products/updateProduct", () => ({
  __esModule: true,
  updateProduct: jest.fn(),
}));

jest.mock("@/services/files/uploadImage", () => ({
  __esModule: true,
  uploadImage: jest.fn(),
}));

jest.mock("@/components/ui/category-select", () => ({
  CategorySelect: () => (
    <select aria-label="Categoria" defaultValue="1">
      <option value="1">Mock Category</option>
      <option value="2">Another</option>
    </select>
  ),
}));

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 10.99,
  description: "Initial description",
  category: {
    id: 1,
    name: "Mock Category",
    slug: "",
    image: "mock.png",
  },
  images: ["mock.png"],
};

describe("EditProductForm (light UI test)", () => {
  it("allows typing into form fields and selecting a category", () => {
    render(<EditProductForm product={mockProduct} />);

    const title = screen.getByPlaceholderText(/título/i);
    const price = screen.getByPlaceholderText(/preço/i);
    const description = screen.getByPlaceholderText(/descrição/i);
    const category = screen.getByLabelText(/categoria/i);

    fireEvent.change(title, { target: { value: "Updated title" } });
    fireEvent.change(price, { target: { value: "25.50" } });
    fireEvent.change(description, { target: { value: "Updated desc" } });
    fireEvent.change(category, { target: { value: "2" } });

    expect(title).toHaveValue("Updated title");
    expect(price).toHaveValue(25.5);
    expect(description).toHaveValue("Updated desc");
    expect(category).toHaveValue("2");
  });
});
