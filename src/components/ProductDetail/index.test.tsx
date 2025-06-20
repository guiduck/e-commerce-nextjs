import { render, screen } from "@testing-library/react";
import { ProductDetail } from "./index";

jest.mock("@/components/ui/smart-img", () => ({
  SmartImage: ({ originalUrl, alt }: any) => (
    <img src={originalUrl} alt={alt} data-testid="mock-smart-image" />
  ),
}));

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 99.99,
  description: "A test product",
  category: {
    id: 1,
    name: "Test Category",
    slug: "test-category",
    image: "",
  },
  images: ["https://fake.img/test.png"],
};

describe("ProductDetail", () => {
  it("renders product details correctly", () => {
    render(<ProductDetail product={mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("A test product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByTestId("mock-smart-image")).toBeInTheDocument();
  });

  it("renders fallback message if product is null", () => {
    render(<ProductDetail product={null} />);

    expect(screen.getByText(/produto não encontrado/i)).toBeInTheDocument();
  });
});
