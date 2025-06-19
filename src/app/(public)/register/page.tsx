"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { registerAndLogin } from "@/actions/auth";

const schema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid e-mail"),
  password: z.string().min(6, "Min 6 chars"),
  avatar: z.string().url("Must be a URL"),
  role: z.enum(["admin", "customer"]),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: "customer" },
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const res = await registerAndLogin(data);

    if (res?.error) {
      toast.error(res.error ?? "Could not sign-in");
      return;
    }

    toast.success("Welcome!");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-sm space-y-4 mb-4"
      >
        <h1 className="text-2xl font-bold text-center mb-2">Register</h1>

        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...register("email")} />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="avatar">Avatar URL</Label>
          <Input id="avatar" {...register("avatar")} />
          {errors.avatar && (
            <p className="text-sm text-red-500">{errors.avatar.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label>Role</Label>
          <RadioGroup
            defaultValue="customer"
            className="flex gap-4"
            {...register("role")}
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="customer" id="customer" />
              <Label htmlFor="customer">Customer</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="admin" id="admin" disabled />
              <Label htmlFor="admin">Admin</Label>
            </div>
          </RadioGroup>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Register"}
        </Button>
      </form>
      <p className="text-sm text-muted-foreground text-center">
        Already have an account?{" "}
        <a href="/login" className="underline">
          Login
        </a>
      </p>
    </div>
  );
}
