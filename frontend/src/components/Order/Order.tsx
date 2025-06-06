"use client";
import React from "react";
import BasicCard from "../../app-components/BasicCard/BasicCard";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchBar from "../../app-components/SearchBar/SearchBar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { cardHeaderStyles } from "./styles";
import OrderTable from "./OrderTable/OrderTable";
const Header = () => {
  const handleSearch = (value) => {};

  return (
    <Box sx={cardHeaderStyles.wrapper}>
      <SearchBar
        placeholder="Search by product name"
        onChange={(event) => handleSearch(event.target.value)}
      />
      <Box>
        <IconButton>
          <RefreshIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
const Order = () => {
  return (
    <>
      <BasicCard header={<Header />}>
        <OrderTable />
      </BasicCard>
    </>
  );
};
export default Order;
