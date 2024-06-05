/**
 * @format
 */

import 'react-native';
import React from "react";
import BottomSheetModal from "src/components/BottomSheetModal";
import renderer from "react-test-renderer";
import { StoreProvider } from 'src/hooks/main_store'

import { it, expect } from '@jest/globals';

it(`render BottomSheetModal`, () => {
  const tree = renderer.create(<StoreProvider>
    <BottomSheetModal />
  </StoreProvider>);
  expect(tree).toMatchSnapshot();
});
