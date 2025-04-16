import DataTable from "../../../app-components/DataTable/DataTable";
import columns from "./columns";
import mockUsers from "./mockOrders";

const userTableStyles = {
  height: "400px",
};

const OrdersTable = () => {
  return (
    <DataTable
      rows={mockUsers}
      columns={columns}
      loading={!mockUsers.length}
      sx={userTableStyles}
    />
  );
};

export default OrdersTable;
