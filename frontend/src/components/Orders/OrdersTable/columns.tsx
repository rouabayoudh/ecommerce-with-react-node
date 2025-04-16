import { GridColDef } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";

const getStatusStyles = (status: string) => {
  switch (status) {
    case "Delivered":
      return { backgroundColor: "#C8E6C9", color: "#388E3C" };
    case "Pending":
      return { backgroundColor: "#FFE0B2", color: "#FB8C00" };
    case "Shipped":
      return { backgroundColor: "#BBDEFB", color: "#1976D2" };
    case "Cancelled":
      return { backgroundColor: "#FFCDD2", color: "#E53935" };
    case "Processing":
      return { backgroundColor: "#E0E0E0", color: "#757575" };
    default:
      return { backgroundColor: "#E0E0E0", color: "#757575" };
  }
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "user", headerName: "User", width: 200 },
  { field: "orderDate", headerName: "Order Date", width: 200 },
  { field: "deliveryDate", headerName: "Delivery Date", width: 180 },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params) => (
      <Chip sx={getStatusStyles(params.row.status)} label={params.row.status} />
    ),
  },
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
