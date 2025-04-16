import { GridColDef } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import Box from "@mui/material/Box";

const columns: GridColDef[] = [
  {
    field: "avatar",
    headerName: "Avatar",
    width: 90,
    renderCell: (params) => (
      <Avatar src={params.row.avatarUrl} alt={params.row.username} />
    ),
  },
  { field: "id", headerName: "ID", width: 50 },
  { field: "email", headerName: "E-mail", width: 150 },
  {
    field: "roles",
    headerName: "Roles",
    width: 150,
    renderCell: (params) => (
      <Stack
        direction="row"
        spacing={1}
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        {params.value.map((role: string) => (
          <Chip key={role} label={role} size="small" />
        ))}
      </Stack>
    ),
  },
  { field: "username", headerName: "Username", width: 100 },
  {
    field: "isVerified",
    headerName: "Verified",
    width: 70,
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        {params.value ? (
          <CheckCircleRoundedIcon sx={{ color: "#66BB6A" }} />
        ) : (
          <CancelRoundedIcon sx={{ color: "#EF5350" }} />
        )}
      </Box>
    ),
  },
  { field: "createdAt", headerName: "Created At", width: 100 },
  { field: "updatedAt", headerName: "Updated At", width: 100 },
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
