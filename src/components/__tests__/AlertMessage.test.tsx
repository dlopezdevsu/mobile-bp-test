/**
 * @format
 */

import 'react-native';
import React from "react";
import AlertMessage from "src/components/AlertMessage";
import renderer from "react-test-renderer";
import { StoreProvider } from 'src/hooks/main_store'

import { it, expect } from '@jest/globals';

it(`render AlertMessage`, () => {
  const tree = renderer.create(<StoreProvider>
    <AlertMessage />
  </StoreProvider>);
  expect(tree).toMatchSnapshot();
});
