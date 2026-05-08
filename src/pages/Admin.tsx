import { Navigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAuthStore } from "@/stores/authStore";

export default function Admin() {
  const user = useAuthStore((s) => s.user);
  if (!user || user.role !== "admin") {
    return <Navigate to="/?login=admin" replace />;
  }
  return <AdminLayout />;
}
