import DataTable from "../../../app-components/DataTable/DataTable";
import columns from "./columns";
import mockCustomers from "./mockCustomers";

const customerTableStyles = {
  height: "400px",
};

const CustomerTable = () => {
  return (
    <DataTable
      rows={mockCustomers}
      columns={columns}
      loading={!mockCustomers.length}
      sx={customerTableStyles}
    />
  );
};

export default CustomerTable;
