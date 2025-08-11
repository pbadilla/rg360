import { AbandonedCartsTable } from "@/components/AbandonedCarts/AbandonedCartsTable";
import InsideLayout from "@/components/layout/InsideLayout";

const AbandonedCartsPage = () => {
  return (
    <InsideLayout title="CartTracker" subTitle="CartTracker">
      <AbandonedCartsTable />
    </InsideLayout>
  );
};

export default AbandonedCartsPage;
