import * as React from "react";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { TreeItem2LabelInput } from "@mui/x-tree-view/TreeItem2LabelInput";
import { UseTreeItem2LabelInputSlotOwnProps } from "@mui/x-tree-view/useTreeItem2";
import { labelInputStyles } from "./styles";

interface CustomLabelInputProps extends UseTreeItem2LabelInputSlotOwnProps {
  handleCancelItemLabelEditing: (event: React.SyntheticEvent) => void;
  handleSaveItemLabel: (label: string) => void;
  value: string;
}

const CustomLabelInput: React.FC<CustomLabelInputProps> = ({
  handleCancelItemLabelEditing,
  handleSaveItemLabel,
  value,
  ...other
}) => (
  <>
    <TreeItem2LabelInput {...other} value={value} sx={labelInputStyles} />
    <IconButton
      color="success"
      size="small"
      onClick={(label) => handleSaveItemLabel(value)}
    >
      <CheckIcon fontSize="small" />
    </IconButton>
    <IconButton
      color="error"
      size="small"
      onClick={handleCancelItemLabelEditing}
    >
      <CloseRoundedIcon fontSize="small" />
    </IconButton>
  </>
);

export default CustomLabelInput;
