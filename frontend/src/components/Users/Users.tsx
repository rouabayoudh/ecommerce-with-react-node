"use client";
import React, { useState } from "react";
import BasicCard from "../../app-components/BasicCard/BasicCard";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchBar from "../../app-components/SearchBar/SearchBar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { cardHeaderStyles } from "./styles";
import CommonButton from "../../app-components/CommonButton/CommonButton";
import InviteUserModal from "../Modals/InviteUserModal/InviteUserModal";
import UserTable from "./UserTable/UserTable";

const Header = ({ inviteNewUser }) => {
  const handleSearch = (value) => {};

  return (
    <Box sx={cardHeaderStyles.wrapper}>
      <SearchBar
        placeholder="Search by email address, user Name, or user UID"
        onChange={(event) => handleSearch(event.target.value)}
      />
      <Box>
        <CommonButton
          variant="contained"
          onClick={inviteNewUser}
          size="large"
          sx={cardHeaderStyles.addUserButton}
        >
          Add user
        </CommonButton>
        <IconButton>
          <RefreshIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

const Users = () => {
  const [open, setOpen] = useState(false);

  const inviteNewUser = (data) => {
    // Todos: Add API call to invite new user
    setOpen(true);
  };

  return (
    <>
      <BasicCard header={<Header inviteNewUser={inviteNewUser} />}>
        <UserTable />
      </BasicCard>
      <InviteUserModal
        open={open}
        onClose={() => setOpen(false)}
        inviteNewUser={inviteNewUser}
      />
    </>
  );
};
export default Users;
