import DataTable from "../../../app-components/DataTable/DataTable";
import columns from "./columns";
import mockProducts from "./mockProducts";

const userTableStyles = {
  height: "400px",
};

const UserTable = () => {
  return (
    <DataTable
      rows={mockProducts}
      columns={columns}
      loading={!mockProducts.length}
      sx={userTableStyles}
    />
  );
};

export default UserTable;
