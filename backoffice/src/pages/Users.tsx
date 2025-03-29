
import React from 'react';
import OrderTable from '@/components/OrderTable';
import { getMockUsers } from '@/services/usersService';
import InsideLayout from '@/components/layout/InsideLayout';

const Users: React.FC = () => {
  const users = getMockUsers();
  
  return (
    <InsideLayout title="Users" subTitle='View and manage all your users with sortable columns.'>
      <OrderTable orders={users} />
    </InsideLayout>
  );
};

export default Users;
