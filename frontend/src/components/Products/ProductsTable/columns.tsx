import { GridColDef } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns: GridColDef[] = [
  {
    field: "pictureUrl",
    headerName: "Picture",
    width: 90,
    renderCell: (params) => (
      <Avatar src={params.row.pictureUrlUrl} alt={params.row.name} />
    ),
  },
  { field: "id", headerName: "ID", width: 50 },
  { field: "name", headerName: "Product Name", width: 150 },
  {
    field: "category",
    headerName: "Category",
    width: 150,
  },
  { field: "stock", headerName: "Stock", width: 80 },
  {
    field: "price",
    headerName: "Price($)",
    width: 100,
  },
  { field: "orders", headerName: "Orders", width: 100 },

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
