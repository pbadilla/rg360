import InsideLayout from "@/components/layout/InsideLayout";
import { CategoryTable } from "@/components/Products/CategoryTable";

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
