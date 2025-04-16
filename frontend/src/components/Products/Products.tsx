"use client";
import React, { useState } from "react";
import BasicCard from "../../app-components/BasicCard/BasicCard";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchBar from "../../app-components/SearchBar/SearchBar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { cardHeaderStyles } from "./styles";
import CommonButton from "../../app-components/CommonButton/CommonButton";
import AddProductModal from "../Modals/AddProductModal/AddProductModal";
import ProductsTable from "./ProductsTable/ProductsTable";

const Header = ({ addNewProduct }) => {
  const handleSearch = (value) => {
    // Update logic for product search here
  };

  return (
    <Box sx={cardHeaderStyles.wrapper}>
      <SearchBar
        placeholder="Search by product name, category, or SKU"
        onChange={(event) => handleSearch(event.target.value)}
      />
      <Box>
        <CommonButton
          variant="contained"
          onClick={addNewProduct}
          size="large"
          sx={cardHeaderStyles.addProductButton}
        >
          Add Product
        </CommonButton>
        <IconButton>
          <RefreshIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

const Products = () => {
  const [open, setOpen] = useState(false);

  const addNewProduct = (data) => {
    // Todo: Add API call to add a new product
    setOpen(true);
  };

  return (
    <>
      <BasicCard header={<Header addNewProduct={addNewProduct} />}>
        <ProductsTable />
      </BasicCard>
      <AddProductModal
        open={open}
        onClose={() => setOpen(false)}
        addNewProduct={addNewProduct}
      />
    </>
  );
};
export default Products;
