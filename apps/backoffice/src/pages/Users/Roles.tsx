import InsideLayout from "@/components/layout/InsideLayout";
import { RolesTable } from "@/components/Users/RolesTable";

const UserRoles = () => {
  return (
    <InsideLayout title="Roles" subTitle="Create and manage user roles.">
      <RolesTable />
    </InsideLayout>
  );
};

export default UserRoles;
