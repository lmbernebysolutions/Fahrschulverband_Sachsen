import { AdminLayout } from "@/components/templates/AdminLayout";

export default function LoslebenAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
