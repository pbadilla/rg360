import InsideLayout from "@/components/layout/InsideLayout";
import CSVImportExport from '@/components/CSVImportExport';
import { ProductProvider } from "@/context/ProductContext";

const UniverskateBulkActions = () => {
  return (
    <ProductProvider>
      <InsideLayout title="BulkActions" subTitle='BulkActions'>
        <CSVImportExport title="Universkate" store="universkate" />
      </InsideLayout>
    </ProductProvider>
  );
};

export default UniverskateBulkActions;
