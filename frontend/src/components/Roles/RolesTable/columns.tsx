import { GridColDef } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "name", headerName: "name", width: 150 },
  {
    field: "edit",
    headerName: "",
    width: 50,
    renderCell: (params) => (
      <IconButton onClick={() => {}}>
        <EditIcon />
      </IconButton>
    ),
  },
  {
    field: "delete",
    headerName: "",
    width: 50,
    renderCell: (params) => (
      <IconButton onClick={() => {}}>
        <DeleteIcon />
      </IconButton>
    ),
  },
];
export default columns;
