import { Header } from "@/components/Header";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="max-w-[1064px] mx-auto">{children}</div>
    </>
  );
}
