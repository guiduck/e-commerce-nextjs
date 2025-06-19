"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginAndSetSession } from "@/actions/login";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "At least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const res = await loginAndSetSession(data.email, data.password);
    if (res?.errorUserMessage) {
      toast.error(res.errorUserMessage ?? "Login failed");
      return;
    }

    toast.success("Logged in!");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-sm space-y-4 mb-4"
      >
        <h1 className="text-2xl font-bold text-center mb-2">Login</h1>

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

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Logging in…" : "Login"}
        </Button>
      </form>
      <p className="text-sm text-muted-foreground text-center">
        Don&apos;t have an account?{" "}
        <a href="/register" className="underline">
          Register
        </a>
      </p>
    </div>
  );
}
