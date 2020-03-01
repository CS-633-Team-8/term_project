import React from 'react';
import Auth from './index.js';

test('Class has property', () => {
  cont auth = new Auth();
  expect(auth).toHaveProperty('login');
});

