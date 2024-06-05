/**
 * @format
 */

import 'react-native';
import React from "react";
import ItemProductList from "src/components/ItemProductList";
import renderer from "react-test-renderer";
import { StoreProvider } from 'src/hooks/main_store'

import { it, expect } from '@jest/globals';

const mockedDispatch = jest.fn();
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: mockedDispatch,
    }),
  };
});

it(`render ItemProductList`, () => {
  const tree = renderer.create(<StoreProvider>
    <ItemProductList id='123' name='Test name' />
  </StoreProvider>);
  expect(tree).toMatchSnapshot();
});
