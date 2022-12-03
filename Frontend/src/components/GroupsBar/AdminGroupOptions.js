import { Box, MenuItem, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { contactStyles } from "../ContactsBar/styles";
import AddMember from "./GroupSettings/AddMember";
import DeleteMember from "./GroupSettings/DeleteMember";
import ManageMembers from "./GroupSettings/ManageMembers";

const AdminGroupOptions = ({ currentChat }) => {

    return (
        <>
            <ManageMembers currentChat={currentChat} />
        </>

    );
};

export default AdminGroupOptions;