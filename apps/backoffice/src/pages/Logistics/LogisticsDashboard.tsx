import InsideLayout from "@/components/layout/InsideLayout";
import ShippingManager from "@/components/Logistics/ShippingManager";

const LogisticsDashboard = () => {
  return (
    <InsideLayout
      title="Shipping manager"
      subTitle="Manage your shipping methods and track shipments"
    >
      <ShippingManager />
    </InsideLayout>
  );
};

export default LogisticsDashboard;
