import { CategoryTable } from "@/components/CategoryTable";
import InsideLayout from "@/components/layout/InsideLayout";

const UserRoles = () => {
  return (
    <InsideLayout title="Roles" subTitle="Create and manage user roles.">
      <CategoryTable />
    </InsideLayout>
  );
};

export default UserRoles;
