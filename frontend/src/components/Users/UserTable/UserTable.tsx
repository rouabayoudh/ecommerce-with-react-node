import DataTable from "../../../app-components/DataTable/DataTable";
import columns from "./columns";
import mockUsers from "./mockUsers";

const userTableStyles = {
  height: "400px",
};

const UserTable = () => {
  return (
    <DataTable
      rows={mockUsers}
      columns={columns}
      loading={!mockUsers.length}
      sx={userTableStyles}
    />
  );
};

export default UserTable;
