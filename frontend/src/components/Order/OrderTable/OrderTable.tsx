import DataTable from "../../../app-components/DataTable/DataTable";
import columns from "./columns";
import mockOrder from "./mockOrder";

const userTableStyles = {
  height: "400px",
};

const OrderTable = () => {
  return (
    <DataTable
      rows={mockOrder}
      columns={columns}
      loading={!mockOrder.length}
      sx={userTableStyles}
    />
  );
};

export default OrderTable;
