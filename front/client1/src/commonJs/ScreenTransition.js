import { push } from "connected-react-router";

export const Transition = (pToken, pPath) => {
  return async (dispatch, getState) => {
    //validation
    if (pToken === "") {
      //alert("ログインしてください");
      dispatch(push("/signin"));
      return false;
    }

    const state = getState();
    const isSignedIn = state.users.isSignedIn;
    if (!isSignedIn) {
      //alert("ログインしてください");
      dispatch(push("/signin"));
      return false;
    } else {
      //const url = 'http://localhost:3001/auth';
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

      //dispatch(push('/Covid19Infection'));
      dispatch(push(pPath));
    }
  };
};
