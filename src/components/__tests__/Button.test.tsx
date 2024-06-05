/**
 * @format
 */

import 'react-native';
import React from "react";
import Button from "src/components/Button";
import renderer from "react-test-renderer";
import { StoreProvider } from 'src/hooks/main_store'

import { it, expect } from '@jest/globals';

it(`render Button`, () => {
  const tree = renderer.create(<StoreProvider>
    <Button label='Test button' style={{}} />
  </StoreProvider>);
  expect(tree).toMatchSnapshot();
});
