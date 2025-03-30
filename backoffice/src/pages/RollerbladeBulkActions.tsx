import InsideLayout from "@/components/layout/InsideLayout";
import CSVImportExport from '@/components/CSVImportExport';
import { ProductProvider } from "@/context/ProductContext";

const RollerbladeBulkActions = () => {
  return (
    <ProductProvider>
      <InsideLayout title="BulkActions" subTitle='BulkActions'>
        <CSVImportExport title="Rollerblade" store="rollerblade" />
      </InsideLayout>
    </ProductProvider>
  );
};

export default RollerbladeBulkActions;
