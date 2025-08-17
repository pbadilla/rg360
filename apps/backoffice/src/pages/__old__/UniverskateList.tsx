import InsideLayout from "@/components/layout/InsideLayout";
import CSVImportExport from "@/components/csv/CSVImportExport";

const UniverskateList = () => {
  return (
    <InsideLayout title="BulkActions" subTitle="BulkActions">
      <CSVImportExport title="Universkate" store="universkate" />
    </InsideLayout>
  );
};

export default UniverskateList;
