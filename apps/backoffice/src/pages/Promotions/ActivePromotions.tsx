import InsideLayout from "@/components/layout/InsideLayout";
import { PromotionTable } from "@/components/Promotions/PromotionTable";

const ActivePromotion = () => {
  return (
    <InsideLayout
      title="Active Promotions"
      subTitle="Create and manage promotions."
    >
      <PromotionTable />
    </InsideLayout>
  );
};

export default ActivePromotion;
