import React from "react";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types/products";
import "@testing-library/jest-dom";

const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  price: 99.99,
  description: "This is a test product.",
  category: { id: 1, name: "Category 1", image: "", slug: "" },
  images: ["https://placehold.co/300x300"],
};

jest.mock("@/services/products/deleteProduct", () => ({
  deleteProduct: jest.fn(),
}));

describe("ProductCard", () => {
  it("renders product info correctly", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByText("This is a test product.")).toBeInTheDocument();
  });

  it("renders category label", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Category 1")).toBeInTheDocument();
  });

  it("shows edit/delete buttons if allowEdit is true", () => {
    render(
      <ProductCard
        product={mockProduct}
        allowDelete
        allowEdit
        onEdit={jest.fn()}
      />
    );
    expect(screen.getByText("Editar")).toBeInTheDocument();
    expect(screen.getByText("Deletar")).toBeInTheDocument();
  });
});
