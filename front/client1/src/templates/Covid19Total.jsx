import React, { useState, useEffect, useCallback } from "react";
import {
  getDate,
  getPositive,
  getHospitalize,
  getSevere,
  getDeath,
} from "../reducks/cvdata/selectors";
import { useSelector } from "react-redux";
import { Auth } from "../reducks/users/operations";
import { TextInput, PrimaryButton } from "../components/Uikit";
import { useDispatch } from "react-redux";
import { getUserId, getUsername, getToken } from "../reducks/users/selectors";

import { Transition, test } from "../commonJs/ScreenTransition";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { red } from "@material-ui/core/colors";

import SomeImg from "../assets/img/src/covid19.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Covid19Total = () => {
  const dispatch = useDispatch();

  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const usernama = getUsername(selector);
  const token = getToken(selector);

  //const [date, setDate] = useState([{ name: 'date', value: '' }]);
  const [date, setDate] = useState("");
  const [positive, setPositive] = useState(0);
  const [hospitalize, setHospitalize] = useState(0);
  const [severe, setSevere] = useState(0);
  const [death, setDeath] = useState(0);

  const bufDate = getDate(selector);
  const bufPositive = getPositive(selector);
  const bufHospitalize = getHospitalize(selector);
  const bufSevere = getSevere(selector);
  const bufDeath = getDeath(selector);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    setDate(bufDate);
    setPositive(bufPositive);
    setHospitalize(bufHospitalize);
    setSevere(bufSevere);
    setDeath(bufDeath);
  }, []);

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const bull2 = <span className={classes.bullet}>{date}</span>;

  return (
    <div>
      <div className="c-section-container">
        {/*<h2>Covid19</h2>*/}
        <div className="module-spacer--medium"></div>

        <div style={{ width: "100%", height: "300px" }}>
          {/*
          <div className="center">
            <h2>Covid19サマリー</h2>
          </div>
          <div className="module-spacer--medium"></div>
          */}

          <Card className={classes.root}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="Covid19サマリー"
              subheader="September 14, 2016"
            />
            <CardMedia
              className={classes.media}
              image={SomeImg}
              title="Covid19"
            />
            <CardContent>
              <Typography variant="h5" component="h2">
                日付：{date}
              </Typography>
              <Typography variant="h5" component="h2">
                感染者数：{positive}
              </Typography>
              <Typography variant="h5" component="h2">
                入院者数：{hospitalize}
              </Typography>
              <Typography variant="h5" component="h2">
                重症者数：{severe}
              </Typography>
              <Typography variant="h5" component="h2">
                死亡者数：{death}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => dispatch(Transition(token, "/"))}
              >
                Back
              </Button>
            </CardActions>
          </Card>

          {/*}
          <div className="module-spacer--medium"></div>
          <div className="center">
            <PrimaryButton
              label={"Back"}
              onClick={() => dispatch(Transition(token, '/'))}
            />
          </div>
          */}
        </div>
      </div>
    </div>
  );
};

export default Covid19Total;
