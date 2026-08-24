"use client";

import { useState } from "react";
import { Loader2, UserRound } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { updateUserStatus } from "../_actions/admin";
import { UserData } from "@/lib/types";

export default function AdminUserTable({
  users,
}: {
  users: UserData[];
}) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleStatusChange = async (
    userId: string,
    status: string,
  ) => {
    try {
      setLoadingId(userId);

      const res = await updateUserStatus(userId, status);

      if (!res?.success) {
        toast.error(
          res?.message || "Unable to update user status.",
        );
        return;
      }

      toast.success("User status updated successfully.");

      router.refresh();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoadingId(null);
    }
  };

  if (!users.length) {
    return (
      <div className="rounded-2xl border border-dashed p-12 text-center">
        <UserRound className="mx-auto size-8 text-muted-foreground" />

        <h2 className="mt-4 font-semibold">
          No users found
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          There are no users to display.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-190 text-sm">
          <thead className="border-b bg-muted/40">
            <tr>
              <th className="px-5 py-4 text-left font-medium">
                User
              </th>

              <th className="px-5 py-4 text-left font-medium">
                Role
              </th>

              <th className="px-5 py-4 text-left font-medium">
                Status
              </th>

              <th className="px-5 py-4 text-right font-medium">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-5 py-4">
                  <div>
                    <p className="font-medium">
                      {user.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <Badge variant="secondary">
                    {user.role}
                  </Badge>
                </td>

                <td className="px-5 py-4">
                  <Badge
                    variant={
                      user.accountStatus === "ACTIVE"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {user.accountStatus}
                  </Badge>
                </td>

                <td className="px-5 py-4 text-right">
                  <Button
                    size="sm"
                    variant={
                      user.accountStatus === "ACTIVE"
                        ? "destructive"
                        : "default"
                    }
                    disabled={loadingId === user.id}
                    onClick={() =>
                      handleStatusChange(
                        user.id,
                        user.accountStatus === "ACTIVE"
                          ? "BANNED"
                          : "ACTIVE",
                      )
                    }
                  >
                    {loadingId === user.id ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : user.accountStatus === "ACTIVE" ? (
                      "Banned"
                    ) : (
                      "Activate"
                    )}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}