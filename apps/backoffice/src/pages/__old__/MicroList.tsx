import InsideLayout from "@/components/layout/InsideLayout";
import CSVImportExport from "@/components/csv/CSVImportExport";

const MicroList = () => {
  return (
    <InsideLayout title="BulkActions" subTitle="BulkActions">
      <CSVImportExport title="Micro" store="micro" />
    </InsideLayout>
  );
};

export default MicroList;
