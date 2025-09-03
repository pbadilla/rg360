import { Badge } from "@/components/ui/badge";

export type ImportStatus = "imported" | "pending" | "error";

export const getStatusBadge = (status: ImportStatus) => {
  switch (status) {
    case "imported":
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          Imported
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
          Pending
        </Badge>
      );
    case "error":
      return (
        <Badge className="bg-red-100 text-red-800 border-red-200">
          Error
        </Badge>
      );
    default:
      return <Badge>Unknown</Badge>;
  }
};


