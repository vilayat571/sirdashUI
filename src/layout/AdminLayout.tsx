import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminSidebarMobile from "../components/AdminSidebarMobile";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen min-w-0 flex-col overflow-x-hidden bg-[#F9FAFB] text-gray-900 md:flex-row">
      <AdminSidebarMobile />
      <AdminSidebar />
      <main className="min-w-0 max-w-full flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8 md:ml-64">
        <Outlet />
      </main>
    </div>
  );
}
