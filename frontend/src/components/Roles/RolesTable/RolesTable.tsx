import DataTable from "../../../app-components/DataTable/DataTable";
import columns from "./columns";
import mockRoles from "./mockRoles";

const RolesTableStyles = {
  height: "400px",
};

const UserTable = () => {
  return (
    <DataTable
      rows={mockRoles}
      columns={columns}
      loading={!mockRoles.length}
      sx={RolesTableStyles}
    />
  );
};

export default UserTable;
