export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

export interface ProductPayload {
  id: number;
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}
