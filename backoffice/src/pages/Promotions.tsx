
import React from 'react';
import { PromotionTable } from '@/components/PromotionTable';
import InsideLayout from '@/components/layout/InsideLayout';

const Promotions = () => {
  return (
    <InsideLayout title="Promotion Management" subTitle='Create and manage your promotional campaigns with a simple and intuitive interface.'>
      <PromotionTable />
    </InsideLayout>
  );
};

export default Promotions;
