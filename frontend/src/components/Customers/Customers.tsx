"use client";
import React from "react";
import BasicCard from "../../app-components/BasicCard/BasicCard";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchBar from "../../app-components/SearchBar/SearchBar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { cardHeaderStyles } from "./styles";
import CustomersTable from "./CustomerTable/CustomersTable";

const Header = () => {
  const handleSearch = (value) => {};

  return (
    <Box sx={cardHeaderStyles.wrapper}>
      <SearchBar
        placeholder="Search by email address, customer Name, or customer UID"
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
const Customers = () => {
  return (
    <>
      <BasicCard header={<Header />}>
        <CustomersTable />
      </BasicCard>
    </>
  );
};
export default Customers;
