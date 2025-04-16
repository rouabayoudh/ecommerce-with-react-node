import { GridColDef } from "@mui/x-data-grid";
import { IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Avatar from "@mui/material/Avatar";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "picture",
    headerName: "Picture",
    width: 80,
    renderCell: (params) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100%",
          width: "100%",
        }}
      >
        <Avatar
          src={params.row.picture}
          alt={params.row.title}
          variant="rounded"
        />
      </div>
    ),
  },
  { field: "title", headerName: "Title", width: 200 },

  { field: "category", headerName: "Category", width: 200 },
  { field: "unitPrice", headerName: "Unit Price", width: 150 },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 150,
    renderCell: (params) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          height: "100%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography sx={{ marginRight: "20px" }}>
          {params.row.quantity}
        </Typography>
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
          }}
          disabled={params.row.quantity <= 1}
        >
          <RemoveIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <AddIcon />
        </IconButton>
      </div>
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
