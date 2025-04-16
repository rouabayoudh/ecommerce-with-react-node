import React, { createContext, useContext } from "react";

const TreeContext = createContext({
  handleAddItem: (data) => {},
  handleSave: (data) => {},
  handleDelete: () => {},
});

export const useTreeContext = () => useContext(TreeContext);

export const TreeProvider = ({
  children,
  handleAddItem,
  handleSave,
  handleDelete,
}) => {
  return (
    <TreeContext.Provider value={{ handleAddItem, handleSave, handleDelete }}>
      {children}
    </TreeContext.Provider>
  );
};
