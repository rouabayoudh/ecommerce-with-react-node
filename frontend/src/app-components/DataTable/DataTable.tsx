import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const DataTable = ({ rows, columns, loading, sx }) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      loading={loading}
      sx={sx}
      checkboxSelection
      pageSizeOptions={[2, 5, 10]}
      autoPageSize={true}
    />
  );
};

export default DataTable;
