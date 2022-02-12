import { useEffect } from "react";
import React, { useDispatch, useSelector } from "react-redux";
import { listenAuthState, moveSignIn } from "../reducks/users/operations";
import { getIsSignedIn, getToken } from "../reducks/users/selectors";
import { push } from "connected-react-router";
import { TextInput, PrimaryButton } from "../components/Uikit";

const Auth = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // 初期状態では、レンダリングごとに呼ばれる
    // （初回とその後の毎回）
    //console.log('render!');
    //alert('render!');

    // componentWillUnmountを実装したければ
    // ここから関数を返すと
    // Reactはアンマウントの直前にそれを呼び出す
    //return () => console.log('unmounting...');

    //dispatch(listenAuthState());

    const f = async () => {
      await dispatch(listenAuthState());
    };
    f();
  });

  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);
  const token = getToken(selector);

  if (isSignedIn) {
    return children;
  } else {
    //return <></>
    return (
      <div>
        <div>タイムアウトが発生しました。</div>
        <PrimaryButton
          label={"Sign in"}
          onClick={() => dispatch(moveSignIn())}
        />
      </div>
    );
  }

  //return children;
};

export default Auth;
