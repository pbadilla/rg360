import CSVImportExport from "@/components/csv/CSVImportExport";
import InsideLayout from "@/components/layout/InsideLayout";

const MicroList = () => {
  return (
    <InsideLayout title="BulkActions" subTitle="BulkActions">
      <CSVImportExport title="Micro" store="micro" />
    </InsideLayout>
  );
};

export default MicroList;
