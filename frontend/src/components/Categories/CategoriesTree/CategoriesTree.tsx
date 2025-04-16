import React from "react";
import EditableTreeView from "@/app-components/EditableTreeView/EditableTreeView";
import { TreeProvider } from "./TreeContext";
import categories from "./categories";
import CustomTreeItem2 from "../CustomTreeItem/CustomTreeItem2";
const CategoriesTree = ({ handleAddItem, handleDelete, handleSave }) => {
  return (
    <TreeProvider
      handleAddItem={handleAddItem}
      handleDelete={handleDelete}
      handleSave={handleSave}
    >
      <EditableTreeView items={categories} CustomTreeItem={CustomTreeItem2} />
    </TreeProvider>
  );
};

export default CategoriesTree;
