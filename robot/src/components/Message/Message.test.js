import React from 'react';
import { shallow } from 'enzyme';
import Message from './index'

test('renders without crashing', () => {
  const data = {
    timeStamp: new Date().getTime()
  }
  shallow(<Message data= {data}/>);
});