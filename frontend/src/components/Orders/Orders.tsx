"use client";
import React, { useState } from "react";
import BasicCard from "../../app-components/BasicCard/BasicCard";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchBar from "../../app-components/SearchBar/SearchBar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { cardHeaderStyles } from "./styles";
import OrdersTable from "./OrdersTable/OrdersTable";
const Header = () => {
  const handleSearch = (value) => {};

  return (
    <Box sx={cardHeaderStyles.wrapper}>
      <SearchBar
        placeholder="Search..."
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
const Orders = () => {
  return (
    <>
      <BasicCard header={<Header />}>
        <OrdersTable />
      </BasicCard>
    </>
  );
};
export default Orders;
