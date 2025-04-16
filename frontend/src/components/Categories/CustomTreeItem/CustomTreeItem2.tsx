import React from "react";
import { useTreeItem2Utils } from "@mui/x-tree-view/hooks";
import { TreeItem2, TreeItem2Props } from "@mui/x-tree-view/TreeItem2";
import CustomLabel from "./CustomLabel";
import CustomLabelInput from "./CustomLabelInput";
import {
  unstable_useTreeItem2 as useTreeItem2,
  UseTreeItem2LabelInputSlotOwnProps,
  UseTreeItem2LabelSlotOwnProps,
} from "@mui/x-tree-view/useTreeItem2";
import { useTreeContext } from "../CategoriesTree/TreeContext";
import { MAX_LEVEL } from "../constants/Constants";

interface CustomLabelProps extends UseTreeItem2LabelSlotOwnProps {
  editable: boolean;
  editing: boolean;
  toggleItemEditing: () => void;
  isMaxLevel: boolean;
  onAddItem: () => void;
  onDeleteItem: () => void;
}

interface CustomLabelInputProps extends UseTreeItem2LabelInputSlotOwnProps {
  handleCancelItemLabelEditing: (event: React.SyntheticEvent) => void;
  handleSaveItemLabel: (label: string) => void;
  value: string;
}

const CustomTreeItem2 = React.forwardRef(function CustomTreeItem2(
  props: TreeItem2Props,
  ref: React.Ref<HTMLLIElement>,
) {
  const { id, itemId, label, disabled, children } = props;
  const { interactions, status } = useTreeItem2Utils({
    itemId: props.itemId,
    children: props.children,
  });
  const { publicAPI } = useTreeItem2({
    id,
    itemId,
    children,
    label,
    disabled,
    rootRef: ref,
  });
  const item = publicAPI.getItem(itemId);
  const isMaxLevel = item.level >= MAX_LEVEL;
  const { handleAddItem, handleDelete, handleSave } = useTreeContext();

  const handleContentDoubleClick: UseTreeItem2LabelSlotOwnProps["onDoubleClick"] =
    (event) => {
      event.defaultMuiPrevented = true;
    };

  const handleInputBlur: UseTreeItem2LabelInputSlotOwnProps["onBlur"] = (
    event,
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleInputKeyDown: UseTreeItem2LabelInputSlotOwnProps["onKeyDown"] = (
    event,
  ) => {
    event.defaultMuiPrevented = true;
  };

  return (
    <TreeItem2
      {...props}
      ref={ref}
      slots={{ label: CustomLabel, labelInput: CustomLabelInput }}
      slotProps={{
        label: {
          onDoubleClick: handleContentDoubleClick,
          editable: status.editable,
          editing: status.editing,
          toggleItemEditing: interactions.toggleItemEditing,
          onAddItem: () => handleAddItem(itemId),
          onDeleteItem: handleDelete,
          isMaxLevel,
        } as CustomLabelProps,
        labelInput: {
          onBlur: handleInputBlur,
          onKeyDown: handleInputKeyDown,
          handleCancelItemLabelEditing:
            interactions.handleCancelItemLabelEditing,
          handleSaveItemLabel: handleSave,
        } as CustomLabelInputProps,
      }}
    />
  );
});
export default CustomTreeItem2;
