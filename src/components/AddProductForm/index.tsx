"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addProduct } from "@/services/products/addProduct";
import { uploadImage } from "@/services/files/uploadImage";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CategorySelect } from "../ui/category-select";

const formSchema = z.object({
  title: z.string().min(2),
  price: z.coerce.number().positive(),
  description: z.string().min(5),
  categoryId: z.coerce.number().int().positive(),
  image: z.any().refine((file) => file instanceof FileList && file.length > 0, {
    message: "Imagem obrigatória",
  }),
});

type FormData = z.infer<typeof formSchema>;

export function AddProductForm({ onSuccess }: { onSuccess?: () => void }) {
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const file = data.image[0];
    const uploadedUrl = await uploadImage(file);

    if (!uploadedUrl) {
      toast.error("Falha no upload da imagem. Verifique o arquivo.");
      return;
    }

    const result = await addProduct({
      title: data.title,
      price: data.price,
      description: data.description,
      categoryId: data.categoryId,
      images: [uploadedUrl],
    });

    if (result.error) {
      toast.error("Erro ao criar produto.");
      return;
    }

    toast.success("Produto criado com sucesso!");
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
          <Input placeholder="Título" {...register("title")} />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div>
          <Input type="number" placeholder="Preço" {...register("price")} />
          {errors.price && (
            <p className="text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>
        <div>
          <Input placeholder="Descrição" {...register("description")} />
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
          <Label className="mb-2">Imagem do produto</Label>
          <Input type="file" accept="image/*" {...register("image")} />
          {typeof errors.title?.message === "string" && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>
        <Button type="submit">Salvar</Button>
      </form>
    </FormProvider>
  );
}
