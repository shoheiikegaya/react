import React, {useState, useEffect, useCallback} from 'react';
import {getDeathData} from '../reducks/cvdata/selectors';
import {useSelector} from 'react-redux';
import {TextInput, PrimaryButton} from '../components/Uikit';
import { useDispatch } from 'react-redux';
import {getUserId, getUsername, getToken} from '../reducks/users/selectors';

import {Transition, test} from '../commonJs/ScreenTransition';


import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Text} from 'recharts';



const Covid19Death = () => {
  const dispatch = useDispatch();

  const selector = useSelector(state => state);
  const uid = getUserId(selector);
  const usernama = getUsername(selector);
  const token = getToken(selector);

  const [data02, setdata02] = useState([{ name: 'nodata', value: 0 }]);

  const bufDeathData = getDeathData(selector);



  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
      setdata02(bufDeathData);
  }, []);


  return (
    <div>
      <div className="c-section-container">
        {/*<h2>Covid19</h2>*/}
        <div className="module-spacer--medium"></div>

        <div style={{ width: '100%', height: '300px' }}>
          <div className="center">
            <h2>Covid19都道府県別死亡者数</h2>
          </div>
          <div className="module-spacer--medium"></div>
          <ResponsiveContainer>
            <PieChart width={300} height={300}>
                <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#82ca9d" />
                <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="module-spacer--medium"></div>
          <div className="center">
            <PrimaryButton
              label={"Back"}
              onClick={() => dispatch(Transition(token, '/'))}
            />
          </div>
        </div>

      </div>
    </div>
  )
};

export default Covid19Death;