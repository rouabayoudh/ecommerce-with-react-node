import * as React from "react";
import Box from "@mui/material/Box";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { EditableTreeViewStyle } from "./styles";

export default function EditableTreeView({ items, CustomTreeItem }) {
  return (
    <Box sx={{ EditableTreeViewStyle }}>
      <RichTreeView
        items={items}
        slots={{ item: CustomTreeItem }}
        experimentalFeatures={{ labelEditing: true }}
        isItemEditable
        defaultExpandedItems={["grid", "pickers"]}
        expansionTrigger="iconContainer"
        sx={{ height: "100%", width: "100%" }}
      />
    </Box>
  );
}
