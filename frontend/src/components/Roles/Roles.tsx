"use client";
import React, { useState } from "react";
import BasicCard from "../../app-components/BasicCard/BasicCard";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchBar from "../../app-components/SearchBar/SearchBar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { cardHeaderStyles } from "./styles";
import CommonButton from "../../app-components/CommonButton/CommonButton";
import AddRoleModal from "../Modals/AddRoleModal/AddRoleModal";
import RolesTable from "./RolesTable/RolesTable";
const Header = ({ addNewRole }) => {
  const handleSearch = (value) => {};

  return (
    <Box sx={cardHeaderStyles.wrapper}>
      <SearchBar
        placeholder="Search by name or ID"
        onChange={(event) => handleSearch(event.target.value)}
      />
      <Box>
        <CommonButton
          variant="contained"
          onClick={addNewRole}
          size="large"
          sx={cardHeaderStyles.addRoleButton}
        >
          Add Role
        </CommonButton>
        <IconButton>
          <RefreshIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
const Roles = () => {
  const [open, setOpen] = useState(false);

  const addNewRole = (data) => {
    // Todos: Add API call to add new role
    setOpen(true);
  };

  return (
    <>
      <BasicCard header={<Header addNewRole={addNewRole} />}>
        <RolesTable />
      </BasicCard>
      <AddRoleModal
        open={open}
        onClose={() => setOpen(false)}
        addNewRole={addNewRole}
      />
    </>
  );
};
export default Roles;
