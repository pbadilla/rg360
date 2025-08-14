import InsideLayout from "@/components/layout/InsideLayout";
import ShippingManager from "@/components/ShippingMethods/ShippingManager";

const ShippingMethodsDashboard = () => {
  return (
    <InsideLayout
      title="Shipping manager"
      subTitle="Manage your shipping methods and track shipments"
    >
      <ShippingManager />
    </InsideLayout>
  );
};

export default ShippingMethodsDashboard;
