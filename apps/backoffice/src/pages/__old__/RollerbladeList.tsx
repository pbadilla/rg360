import CSVImportExport from "@/components/csv/CSVImportExport";
import InsideLayout from "@/components/layout/InsideLayout";

const RollerbladeList = () => {
  return (
    <InsideLayout title="BulkActions" subTitle="BulkActions">
      <CSVImportExport title="Rollerblade" store="rollerblade" />
    </InsideLayout>
  );
};

export default RollerbladeList;
