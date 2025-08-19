import type React from "react";

import InsideLayout from "@/components/layout/InsideLayout";
import { UsersTable } from "@/components/Users/UsersTable";

const Users: React.FC = () => {
  return (
    <InsideLayout
      title="Users"
      subTitle="View and manage all your users with sortable columns."
    >
      <UsersTable />
    </InsideLayout>
  );
};

export default Users;
