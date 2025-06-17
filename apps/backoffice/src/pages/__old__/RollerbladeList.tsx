import InsideLayout from "@/components/layout/InsideLayout";
import CSVImportExport from "@/components/CSVImportExport";

const RollerbladeList = () => {
  return (
    <InsideLayout title="BulkActions" subTitle="BulkActions">
      <CSVImportExport title="Rollerblade" store="rollerblade" />
    </InsideLayout>
  );
};

export default RollerbladeList;
