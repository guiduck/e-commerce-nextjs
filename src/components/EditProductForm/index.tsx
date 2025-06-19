"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/services/files/uploadImage";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updateProduct } from "@/services/products/updateProduct";
import { CategorySelect } from "@/components/ui/category-select";

const formSchema = z.object({
  title: z.string().min(2),
  price: z.coerce.number().positive(),
  description: z.string().min(5),
  categoryId: z.coerce.number().int().positive(),
  image: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface EditProductFormProps {
  product: {
    id: number;
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];
  };
  onSuccess?: () => void;
}

export function EditProductForm({ product, onSuccess }: EditProductFormProps) {
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: product.title,
      price: product.price,
      description: product.description,
      categoryId: product.categoryId,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    let imageUrl = product.images[0];

    if (data.image instanceof FileList && data.image.length > 0) {
      const uploaded = await uploadImage(data.image[0]);
      if (!uploaded) {
        toast.error("Erro ao fazer upload da imagem.");
        return;
      }
      imageUrl = uploaded;
    }

    const result = await updateProduct({
      id: product.id,
      title: data.title,
      price: data.price,
      description: data.description,
      categoryId: data.categoryId,
      images: [imageUrl],
    });

    if (result.error) {
      toast.error("Erro ao atualizar produto.");
      return;
    }

    toast.success("Produto atualizado com sucesso!");
    reset();
    onSuccess?.();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 p-4 max-w-md mx-auto"
      >
        <div>
          <Input placeholder="Title" {...register("title")} />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div>
          <Input type="number" placeholder="Price" {...register("price")} />
          {errors.price && (
            <p className="text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>
        <div>
          <Input placeholder="Description" {...register("description")} />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div>
          <Label className="mb-2">Categoria</Label>
          <CategorySelect />
          {errors.categoryId && (
            <p className="text-sm text-red-500">{errors.categoryId.message}</p>
          )}
        </div>
        <div>
          <Label className="mb-2">Nova imagem (opcional)</Label>
          <Input type="file" accept="image/*" {...register("image")} />
        </div>
        <Button type="submit">Atualizar</Button>
      </form>
    </FormProvider>
  );
}
