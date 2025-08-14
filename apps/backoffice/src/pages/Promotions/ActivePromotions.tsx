import { CategoryTable } from "@/components/Products/CategoryTable";
import InsideLayout from "@/components/layout/InsideLayout";

const ActivePromotion = () => {
  return (
    <InsideLayout
      title="Active Promotions"
      subTitle="Create and manage promotions."
    >
      <CategoryTable />
    </InsideLayout>
  );
};

export default ActivePromotion;
