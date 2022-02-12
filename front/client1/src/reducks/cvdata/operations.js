import { cvDataAction, cvDataActionTotal } from "./actions";
import { push } from "connected-react-router";
import { addLeadingSlash } from "history/PathUtils";

//Redux-thunkとは
//Redux-thunkを使用すると、Action creator はオブジェクトの代わりに 関数を返すことができるようになります。
//関数を返す Action creator は Thunk となります。
//Thunkが返す関数は、Redux-thunkのミドルウェアによって実行されます。
//この関数は、Reducerのように純粋な関数でなくても良く、つまりAPI呼び出しなどの非同期を伴ったりしても問題ありません。
//またこの関数は dispatch を第1引数に持たせることができるため、関数内で Action を Dispatch することができます。
//（第2引数には getState を持たせることができます。これにより、関数内で Store の state を見ることができます）

//reducksにcovid19を追加
export const covid19Area = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const isSignedIn = state.users.isSignedIn;
    const token = state.users.token;
    if (!isSignedIn) {
      alert("ログインしてください");
      dispatch(push("/"));
      return false;
    } else {
      //const url = 'http://localhost:3001/covid19Area';
      const url = "http://0.0.0.0:3001/covid19Area";
      const param = {
        method: "GET",
        mode: "cors",
        headers: { Authorization: "Bearer " + token },
      };
      // paramを付ける以外はGETと同じ
      const response = await fetch(url, param).then((res) => {
        return res.json();
      });

      //dispatch(push('/'));

      let jsonInfectionData = [];
      let json = response.data;
      for (var item in json) {
        let buf = json[item];

        let jasonData = {};
        jasonData["name"] = buf["name_ja"];
        jasonData["value"] = buf["cases"];

        jsonInfectionData.push(jasonData);
      }

      let jsonDeathData = [];
      for (var item in json) {
        let buf = json[item];
        let jasonData = {};
        jasonData["name"] = buf["name_ja"];
        jasonData["value"] = buf["deaths"];
        jsonDeathData.push(jasonData);
      }

      dispatch(
        cvDataAction({
          infectionData: jsonInfectionData,
          deathData: jsonDeathData,
        })
      );

      return { infectionData: jsonInfectionData, deathData: jsonDeathData };
    }
  };
};

//reducksにcovid19トータルデータを追加
export const covid19Total = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const isSignedIn = state.users.isSignedIn;
    const token = state.users.token;
    if (!isSignedIn) {
      alert("ログインしてください");
      dispatch(push("/"));
      return false;
    } else {
      //const url = 'http://localhost:3001/covid19Total';
      const url = "http://0.0.0.0:3001/covid19Total";
      const param = {
        method: "GET",
        mode: "cors",
        headers: { Authorization: "Bearer " + token },
      };
      // paramを付ける以外はGETと同じ
      const response = await fetch(url, param).then((res) => {
        return res.json();
      });

      let json = response.data;

      dispatch(
        cvDataActionTotal({
          date: response.data.date,
          positive: response.data.positive,
          hospitalize: response.data.hospitalize,
          severe: response.data.severe,
          death: response.data.death,
        })
      );

      return json;
    }
  };
};

//reducksにcovid19陽性者データを追加
export const covid19Positives = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const isSignedIn = state.users.isSignedIn;
    const token = state.users.token;
    if (!isSignedIn) {
      alert("ログインしてください");
      dispatch(push("/"));
      return false;
    } else {
      //const url = 'http://localhost:3001/covid19Positives';
      const url = "http://0.0.0.0:3001/covid19Positives";
      const param = {
        method: "GET",
        mode: "cors",
        headers: { Authorization: "Bearer " + token },
      };
      // paramを付ける以外はGETと同じ
      const response = await fetch(url, param).then((res) => {
        return res.json();
      });

      let json = response.data;

      return { Positives: json };
    }
  };
};
