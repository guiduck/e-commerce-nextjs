"use client";

import { useEffect, useState } from "react";
import { getAllCategories } from "@/services/categories/getAllCategories";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Category {
  id: number;
  name: string;
}

export function CategorySelect() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { setValue, watch } = useFormContext();
  const selectedCategoryId = watch("categoryId");

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getAllCategories();
      setCategories(result);
    };

    fetchCategories();
  }, []);

  return (
    <div className="space-y-1">
      <Select
        onValueChange={(value) => setValue("categoryId", Number(value ?? 1))}
        value={selectedCategoryId?.toString()}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione uma categoria" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={String(category.id)}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
