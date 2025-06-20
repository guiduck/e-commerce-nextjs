"use client";

import { useCallback, useEffect, useState } from "react";
import { useProductsStore } from "@/stores/useProductsStore";
import { Product } from "@/types/products";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Props = {
  products: Product[];
};

const ITEMS_PER_PAGE = 9;

export function ProductsFilter({ products }: Props) {
  const {
    setAllProducts,
    setTotalPages,
    setFilteredProducts,
    currentPage,
    setCurrentPage,
  } = useProductsStore();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    setAllProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilters();
  }, [search, category, minPrice, maxPrice, products, currentPage]);

  const getTotalPages = useCallback((filteredLength: number) => {
    const totalPages = Math.max(1, Math.ceil(filteredLength / ITEMS_PER_PAGE));
    setTotalPages(totalPages);
  }, []);

  const getDisplayedProducts = useCallback(
    (filtered: Product[]) => {
      const start = (currentPage - 1) * ITEMS_PER_PAGE;
      const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);
      setFilteredProducts(paginated);
    },
    [currentPage]
  );

  const applyFilters = () => {
    let filtered = [...products];

    if (search.trim()) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((p) => p.category.name === category);
    }

    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    if (!isNaN(min)) filtered = filtered.filter((p) => p.price >= min);
    if (!isNaN(max)) filtered = filtered.filter((p) => p.price <= max);

    getTotalPages(filtered.length);
    getDisplayedProducts(filtered);
  };

  const categories = Array.from(new Set(products.map((p) => p.category.name)));

  return (
    <div className="grid gap-4 md:grid-cols-4 p-4 ">
      <Input
        placeholder="Buscar por nome"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      <Select
        value={category}
        onValueChange={(value) => {
          if (value === "null") {
            setCategory("");
            return;
          }
          setCategory(value);
          setCurrentPage(1);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Todas categorias" />
        </SelectTrigger>
        <SelectContent className="w-full">
          <SelectItem value="null">Todas categorias</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="number"
        placeholder="Preço mínimo"
        value={minPrice}
        onChange={(e) => {
          setMinPrice(e.target.value);
          setCurrentPage(1);
        }}
        min={0}
      />
      <Input
        type="number"
        placeholder="Preço máximo"
        value={maxPrice}
        onChange={(e) => {
          setMaxPrice(e.target.value);
          setCurrentPage(1);
        }}
        min={0}
      />
    </div>
  );
}
