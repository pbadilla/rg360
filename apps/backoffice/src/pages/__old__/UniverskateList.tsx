import CSVImportExport from "@/components/csv/CSVImportExport";
import InsideLayout from "@/components/layout/InsideLayout";

const UniverskateList = () => {
  return (
    <InsideLayout title="BulkActions" subTitle="BulkActions">
      <CSVImportExport title="Universkate" store="universkate" />
    </InsideLayout>
  );
};

export default UniverskateList;
