import React from 'react';
import { shallow } from 'enzyme';
import Compose from './index'

test('renders without crashing', () => {
  shallow(<Compose />);
});