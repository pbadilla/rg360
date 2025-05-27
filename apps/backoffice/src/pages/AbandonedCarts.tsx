
import AbandonedCarts from "@/components/AbandonedCarts";
import InsideLayout from "@/components/layout/InsideLayout";

const AbandonedCartsPage = () => {
  return (
    <InsideLayout title="CartTracker" subTitle='CartTracker'>
      <AbandonedCarts />
    </InsideLayout>
  );
};

export default AbandonedCartsPage;
