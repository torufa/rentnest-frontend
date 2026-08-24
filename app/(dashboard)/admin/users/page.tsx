import { getAdminUsers } from "../_actions/admin";
import AdminUserTable from "../_components/AdminUserTable";

export default async function AdminUsersPage() {
  const response = await getAdminUsers();

  const users =
    response?.data?.result?.users ??
    response?.data?.result ??
    [];

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-primary">
          Admin Dashboard
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Users
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Manage registered users and their account status.
        </p>
      </div>

      <AdminUserTable users={users} />
    </main>
  );
}