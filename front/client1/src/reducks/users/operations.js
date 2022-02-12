import { signInAction, signOutAction } from "./actions";
import { push } from "connected-react-router";

//Redux-thunkとは
//Redux-thunkを使用すると、Action creator はオブジェクトの代わりに 関数を返すことができるようになります。
//関数を返す Action creator は Thunk となります。
//Thunkが返す関数は、Redux-thunkのミドルウェアによって実行されます。
//この関数は、Reducerのように純粋な関数でなくても良く、つまりAPI呼び出しなどの非同期を伴ったりしても問題ありません。
//またこの関数は dispatch を第1引数に持たせることができるため、関数内で Action を Dispatch することができます。
//（第2引数には getState を持たせることができます。これにより、関数内で Store の state を見ることができます）

export const signIn = (pUsername, pPassword) => {
  return async (dispatch, getState) => {
    //validation
    if (pUsername === "" || pPassword === "") {
      alert("必須項目が未入力です");
      return false;
    }

    const state = getState();
    const isSignedIn = state.users.isSignedIn;

    //ローカル
    //const url = "http://localhost:3001/login";
    //docker
    const url = "http://0.0.0.0:3001/login";
    //const data = {name:'ikegaya',password:'password1'};
    //const data = {"name":"ikegaya","password":"password1"};
    const data = { name: pUsername, password: pPassword };
    // FetchAPIのオプション準備
    const param = {
      method: "POST",
      mode: "cors",
      headers: {
        //  "Content-Type": "application/json; charset=utf-8"
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // リクエストボディ
      body: JSON.stringify(data),
      //body: {name: 'ikegaya',password: 'password1'}
    };

    // paramを付ける以外はGETと同じ
    const response = await fetch(url, param).then((res) => {
      //alert(JSON.stringify(res));
      return res.json();
    });

    if (response.success === false) {
      alert("入力情報が間違っています");
      return;
    }

    dispatch(
      signInAction({
        isSignedIn: true,
        uid: "99999",
        username: pUsername,
        token: response.token,
      })
    );

    dispatch(push("/"));
  };
};

//テスト用？
export const Auth = (pToken) => {
  return async (dispatch, getState) => {
    //validation
    if (pToken === "") {
      alert("ログインしてください");
      return false;
    }

    const state = getState();
    const isSignedIn = state.users.isSignedIn;
    if (!isSignedIn) {
      alert("ログインしてください");
      return false;
    } else {
      //const url = "http://localhost:3001/auth";
      const url = "http://0.0.0.0:3001/auth";
      const param = {
        method: "GET",
        mode: "cors",
        headers: { Authorization: "Bearer " + pToken },
      };
      // paramを付ける以外はGETと同じ
      const response = await fetch(url, param).then((res) => {
        //alert(JSON.stringify(res));
        return res.json();
      });

      dispatch(push("/"));
    }
  };
};

export const listenAuthState = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const isSignedIn = state.users.isSignedIn;
    const token = state.users.token;
    //tokenが空か比較する
    //ローカルストレージにから取得
    if (isSignedIn) {
      //コンフィグに変更
      //const url = "http://localhost:3001/auth";
      const url = "http://0.0.0.0:3001/auth";
      const param = {
        method: "GET",
        mode: "cors",
        headers: { Authorization: "Bearer " + token },
      };
      // paramを付ける以外はGETと同じ
      const response = await fetch(url, param).then((res) => {
        //alert(JSON.stringify(res));
        return res.json();
      });

      if (response.success === false) {
        dispatch(signOutAction());

        //dispatch(push('/signin'));
      }
    }
  };
};

export const moveSignIn = () => {
  return async (dispatch) => {
    dispatch(push("/signin"));
  };
};
