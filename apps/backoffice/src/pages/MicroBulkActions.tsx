import InsideLayout from "@/components/layout/InsideLayout";
import CSVImportExport from '@/components/CSVImportExport';
import { ProductProvider } from "@/context/ProductContext";

const MicroBulkActions = () => {
  return (
    <ProductProvider>
      <InsideLayout title="BulkActions" subTitle='BulkActions'>
        <CSVImportExport title="Micro" store="micro" />
      </InsideLayout>
    </ProductProvider>
  );
};

export default MicroBulkActions;
