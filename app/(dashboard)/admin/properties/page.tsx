import { getAdminProperties } from "../_actions/admin";
import AdminPropertyTable from "../_components/AdminPropertyTable";

export default async function AdminPropertiesPage() {
  const response = await getAdminProperties();

  const properties =
    response?.data?.result?.properties ?? [];

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-primary">
          Admin Dashboard
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          All Properties
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          View all properties listed on the platform.
        </p>
      </div>

      <AdminPropertyTable properties={properties} />
    </main>
  );
}