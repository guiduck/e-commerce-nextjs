import { render, screen, fireEvent } from "@testing-library/react";
import { AddProductForm } from "./index";

jest.mock("@/services/products/addProduct", () => ({
  __esModule: true,
  addProduct: jest.fn(),
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

describe("AddProductForm (light UI test)", () => {
  it("allows typing into form fields and selecting a category", () => {
    render(<AddProductForm />);

    const title = screen.getByPlaceholderText(/título/i);
    const price = screen.getByPlaceholderText(/preço/i);
    const description = screen.getByPlaceholderText(/descrição/i);
    const category = screen.getByLabelText(/categoria/i);

    fireEvent.change(title, { target: { value: "Pizza" } });
    fireEvent.change(price, { target: { value: "12.50" } });
    fireEvent.change(description, { target: { value: "Delicious" } });
    fireEvent.change(category, { target: { value: "2" } });

    expect(title).toHaveValue("Pizza");
    expect(price).toHaveValue(12.5);
    expect(description).toHaveValue("Delicious");
    expect(category).toHaveValue("2");
  });
});
