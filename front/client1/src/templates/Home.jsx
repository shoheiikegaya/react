import React, { useState, useEffect, useCallback } from "react";
import { getInfectionData, getDeathData } from "../reducks/cvdata/selectors";
import { useSelector } from "react-redux";
import { Auth } from "../reducks/users/operations";
import { TextInput, PrimaryButton } from "../components/Uikit";
import { useDispatch } from "react-redux";
import { covid19Area, covid19Total } from "../reducks/cvdata/operations";
import { getUserId, getUsername, getToken } from "../reducks/users/selectors";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import { Transition } from "../commonJs/ScreenTransition";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Home = () => {
  const dispatch = useDispatch();

  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const usernama = getUsername(selector);
  const token = getToken(selector);

  const [data01, setdata01] = useState([{ name: "nodata", value: 0 }]);
  const [data02, setdata02] = useState([{ name: "nodata", value: 0 }]);

  const [date, setDate] = useState([{ name: "date", value: "" }]);
  const [positive, setPositive] = useState([{ name: "positive", value: 0 }]);
  const [hospitalize, setHospitalize] = useState([
    { name: "hospitalize", value: 0 },
  ]);
  const [severe, setSevere] = useState([{ name: "severe", value: 0 }]);
  const [death, setDeath] = useState([{ name: "death", value: 0 }]);

  const bufinfectionData = getInfectionData(selector);
  const bufDeathData = getDeathData(selector);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    dispatch(covid19Area()).then((result) => {
      setdata01(result.infectionData);
      setdata02(result.deathData);
    });

    dispatch(covid19Total()).then((result) => {
      console.log("result=" + JSON.stringify(result));
      const obj = JSON.stringify(result);
      //console.log(JSON.stringify(result));

      setDate(result.date);
      setPositive(result.positive);
      setHospitalize(result.hospitalize);
      setSevere(result.severe);
      setDeath(result.death);
    });
  }, []);

  const classes = useStyles();

  return (
    <div>
      <div className="c-section-container">
        <h2>Covid19</h2>
        <div className="module-spacer--medium"></div>
        {/*<p>ユーザID：{uid}</p>*/}
        {/*<p>ユーザ名：{usernama}</p>*/}
        {/*<p>トークン：{token}</p>*/}
      </div>

      <List
        component="nav"
        className={classes.root}
        aria-label="mailbox folders"
      >
        <ListItem
          button
          onClick={() => dispatch(Transition(token, "/Covid19Infection"))}
        >
          <ListItemText primary="Covid19都道府県別感染者数" />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => dispatch(Transition(token, "/Covid19Death"))}
        >
          <ListItemText primary="Covid19都道府県別死亡者数" />
        </ListItem>
        <ListItem
          button
          onClick={() => dispatch(Transition(token, "/Covid19Total"))}
        >
          <ListItemText primary="Covid19サマリー" />
        </ListItem>
        <Divider light />
      </List>
    </div>
  );
};

export default Home;
