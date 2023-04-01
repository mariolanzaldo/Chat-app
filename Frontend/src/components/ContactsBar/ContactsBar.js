import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TabHeader from "./TabHeader";
import TabContent from "./TabContent";
import { useTranslation } from "react-i18next";
import { useSubscription } from "@apollo/client";
import FRIEND_REQUEST_ACCEPTED from "../../graphql/subscriptions/friendRequestAccepted";

const ContactsBar = () => {

  const { t } = useTranslation();

  const { username, contactList } = useSelector((state) => {
    return state.user.value
  });

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(contactList);
  const [users, setUsers] = useState(null);

  const dispatch = useDispatch();

  useSubscription(FRIEND_REQUEST_ACCEPTED, {
    onData: ({ data }) => {
      if (data?.data.friendRequestAccepted.username === username) {
        dispatch({
          type: "requestAccepted",
          payload: data?.data.friendRequestAccepted
        });
      }
    },
  });


  const filterData = (value) => {
    const lowerdCaseValue = value.toLowerCase().trim();

    if (lowerdCaseValue === "") setUsers(search);
    else {

      const filteredData = search.filter((item) => {
        const { username } = item;

        const isFiltered = username.toLowerCase().trim().includes(lowerdCaseValue);

        return isFiltered;
      });

      setUsers(filteredData);
    }
  };

  if (contactList.length > 0 && contactList && username) {

    return (

      <Grid
        container
        flexDirection='column'
      >
        <TabHeader open={open} setOpen={setOpen} filterData={filterData} />

        <TabContent users={users} />
      </Grid>
    );

  } else if (contactList.length === 0) {
    return (
      <Grid
        container
        flexDirection='column'
      >
        <TabHeader open={open} setOpen={setOpen} />

        <Typography>{t("noContacts")}</Typography>
      </Grid>
    );
  }
};

export default ContactsBar;
