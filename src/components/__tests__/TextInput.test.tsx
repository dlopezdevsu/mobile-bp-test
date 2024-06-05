/**
 * @format
 */

import 'react-native';
import React from "react";
import TextInput from "src/components/TextInput";
import renderer from "react-test-renderer";
import { StoreProvider } from 'src/hooks/main_store'

import { it, expect } from '@jest/globals';

it(`render TextInput`, () => {
  const tree = renderer.create(<StoreProvider>
    <TextInput />
  </StoreProvider>);
  expect(tree).toMatchSnapshot();
});
