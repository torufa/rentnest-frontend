import {
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

type RentalRequestStatusProps = {
  status: string;
};

export default function RentalRequestStatus({
  status,
}: RentalRequestStatusProps) {
  const config = {
    PENDING: {
      label: "Pending",
      icon: Clock3,
      className:
        "border-yellow-500/20 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    },

    APPROVED: {
      label: "Approved",
      icon: CheckCircle2,
      className:
        "border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400",
    },

    REJECTED: {
      label: "Rejected",
      icon: XCircle,
      className:
        "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
    },

    PAID: {
      label: "Paid",
      icon: CheckCircle2,
      className:
        "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
  };

  const current =
    config[status as keyof typeof config];

  if (!current) {
    return (
      <span className="inline-flex w-fit rounded-full border px-3 py-1 text-xs font-medium">
        {status}
      </span>
    );
  }

  const Icon = current.icon;

  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${current.className}`}
    >
      <Icon className="size-3.5" />
      {current.label}
    </span>
  );
}