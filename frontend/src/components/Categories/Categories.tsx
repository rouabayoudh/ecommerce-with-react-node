"use client";
import React, { useState } from "react";
import BasicCard from "@/app-components/BasicCard/BasicCard";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchBar from "../../app-components/SearchBar/SearchBar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { cardHeaderStyles } from "./styles";
import CategoriesTree from "./CategoriesTree/CategoriesTree";
import AddCategoryModal from "../Modals/AddCategoryModel/AddCategoryModel";
import CommonButton from "@/app-components/CommonButton/CommonButton";

const Header = ({ handleOpenModal }) => {
  const handleSearch = (value) => {};

  return (
    <Box sx={cardHeaderStyles.wrapper}>
      <SearchBar
        placeholder="Search cathegorie"
        onChange={(event) => handleSearch(event.target.value)}
      />
      <Box>
        <CommonButton
          variant="contained"
          onClick={() => handleOpenModal(null)}
          size="large"
          sx={cardHeaderStyles.addUserButton}
        >
          Add
        </CommonButton>
        <IconButton>
          <RefreshIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

const Categories = () => {
  const [open, setOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const AddNewCategory = (data, itemId) => {
    // Todos: Add API call to add new Category
  };

  const handleOpenModal = (itemId) => {
    setSelectedItemId(itemId);
    setOpen(true);
  };
  const handleDelete = () => {
    // Todos: Add API call to delete category
  };
  const handleSave = (data: string) => {
    // Todos: Add API call to save category
  };

  return (
    <>
      <BasicCard header={<Header handleOpenModal={handleOpenModal} />}>
        <CategoriesTree
          handleAddItem={handleOpenModal}
          handleDelete={handleDelete}
          handleSave={handleSave}
        />
      </BasicCard>
      <AddCategoryModal
        open={open}
        onClose={() => setOpen(false)}
        AddNewCategory={(data) => AddNewCategory(data, selectedItemId)}
      />
    </>
  );
};
export default Categories;
