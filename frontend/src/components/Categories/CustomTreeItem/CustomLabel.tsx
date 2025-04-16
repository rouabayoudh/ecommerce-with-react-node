import * as React from "react";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { TreeItem2Label } from "@mui/x-tree-view/TreeItem2";
import { UseTreeItem2LabelSlotOwnProps } from "@mui/x-tree-view/useTreeItem2";
import DeleteIcon from "@mui/icons-material/Delete";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Box from "@mui/material/Box";

interface CustomLabelProps extends UseTreeItem2LabelSlotOwnProps {
  editable: boolean;
  editing: boolean;
  toggleItemEditing: () => void;
  onAddItem: (data) => void;
  onDeleteItem: () => void;
  isMaxLevel: boolean;
}

const CustomLabel: React.FC<CustomLabelProps> = ({
  editing,
  editable,
  children,
  toggleItemEditing,
  onAddItem,
  onDeleteItem,
  isMaxLevel,
  ...other
}) => (
  <TreeItem2Label
    {...other}
    editable={editable}
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 2,
      justifyContent: "space-between",
    }}
  >
    {children}
    {editable && (
      <Box sx={{ display: "flex", gap: 2 }}>
        {!isMaxLevel && (
          <IconButton
            size="small"
            onClick={onAddItem}
            sx={{ color: "text.secondary" }}
          >
            <AddOutlinedIcon fontSize="small" />
          </IconButton>
        )}
        <IconButton
          size="small"
          onClick={toggleItemEditing}
          sx={{ color: "text.secondary" }}
        >
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={onDeleteItem}
          sx={{ color: "text.secondary" }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    )}
  </TreeItem2Label>
);

export default CustomLabel;
