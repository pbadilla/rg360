import React from "react";
import { CategoryTable } from "@/components/CategoryTable";
import InsideLayout from "@/components/layout/InsideLayout";

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
