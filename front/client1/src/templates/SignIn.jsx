import React, {useState, useCallback} from 'react';
import { useDispatch } from 'react-redux';
import {TextInput, PrimaryButton} from '../components/Uikit';
import {signIn} from '../reducks/users/operations';

const SignIn = () => {
const dispatch = useDispatch();

  const [username, setUsername] = useState(""),
        [password, setPassword] = useState("");

  const inputUsername = useCallback((event) => {
    setUsername(event.target.value);
  }, [setUsername]);

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value);
  }, [setPassword]);

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">サインイン</h2>
      <div className="module-spacer--medium" />
      <TextInput
        fullWidth={true}
        label={"ユーザ名"}
        multiline={false}
        required={true}
        rows={1}
        value={username}
        type={"text"}
        onChange={inputUsername}
      />

      <TextInput
        fullWidth={true}
        label={"パスワード"}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={"password"}
        onChange={inputPassword}
      />

      <div className="module-spacer--medium"></div>
      <div className="center">
        <PrimaryButton
          label={"Sign in"}
          onClick={() => dispatch(signIn(username, password))}
        />
      </div>
    </div>
  );
};

export default SignIn;
