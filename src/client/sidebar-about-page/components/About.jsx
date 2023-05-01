import React, { useState } from 'react';
import { serverFunctions } from '../../utils/serverFunctions';

const About = () => {
  const [count, setCount] = useState(0);

  const onSubmit = async () => {
    console.log('hello1');
    // var temp = serverFunctions.setActiveSheet("sales")
    // var cell = await serverFunctions.getActiveSheetCell("A1");
    // console.log(cell)
    serverFunctions.setActiveSheetCell();
    console.log('hello2');
  };
  const incCount = async () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>
        <b>☀️ React app inside a sidebar! ☀️</b>
      </p>
      <p>
        2st attempt
        {count}
      </p>
      <p>Please enter your sales hires</p>
      <button onClick={incCount}>+</button>
      <button onClick={onSubmit}>I'm done!</button>
    </div>
  );
};

export default About;
