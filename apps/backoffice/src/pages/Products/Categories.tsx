import React from "react";

import InsideLayout from "@/components/layout/InsideLayout";
import { CategoryTable } from "@/components/Products/CategoryTable";

const Categories = () => {
  return (
    <InsideLayout
      title="Categories"
      subTitle="Create and manage categories of products."
    >
      <CategoryTable />
    </InsideLayout>
  );
};

export default Categories;
