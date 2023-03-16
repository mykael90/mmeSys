import { Button, InputNumber } from 'antd';
import React from 'react';

import { useAppSelector, useAppDispatch } from '../../../../store/hooks';
import {
  setAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from '../../../../store/slices/counter.slice';
import { selectAuth } from '../../../../store/slices/auth.slice';

const Counter = () => {
  const count = useAppSelector(selectCount);
  const session = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  console.log(count, session);

  return (
    <div>
      <InputNumber
        value={count}
        onChange={(value: number | null) => dispatch(setAmount(value || 0))}
      />
      <Button onClick={() => dispatch(incrementAsync(1))}>Add Async</Button>
      <Button onClick={() => dispatch(incrementIfOdd(1))}>Add If Odd</Button>
    </div>
  );
};

export default Counter;
