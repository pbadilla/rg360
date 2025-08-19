import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "abandoned" | "reminder-sent" | "recovered";
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const statusConfig = {
    abandoned: {
      className: "bg-red-50 text-red-700 border-red-200",
      label: "Abandoned",
    },
    "reminder-sent": {
      className: "bg-amber-50 text-amber-700 border-amber-200",
      label: "Reminder Sent",
    },
    recovered: {
      className: "bg-green-50 text-green-700 border-green-200",
      label: "Recovered",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
