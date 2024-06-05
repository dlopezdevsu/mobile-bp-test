import React, { ReactElement } from "react";

import { ItemProductListProps } from 'src/components/ItemProductList'

export const Store = React.createContext<any>(null);

export interface InitialStateProps {
  loading: boolean;
  alert: string;
  products: ItemProductListProps[];
  selected: ItemProductListProps | null;
  editMode: boolean;
  openBottomSheet: boolean;
  callbackBottomSheet: () => void;
}

interface ActionProps {
  label: string;
  type: string;
  payload: any;
}

const initialState = {
  loading: true,
  alert: '',
  products: [],
  selected: null,
  editMode: false,
  openBottomSheet: false,
  callbackBottomSheet: () => null,
};

function reducer(state: InitialStateProps, action: ActionProps) {
  switch (action.type) {
    case "SET_STORE":
      return { ...state, [action.label]: action.payload };
    case "RESET_DATA":
      return { ...initialState };
    default:
      return state;
  }
}

export function StoreProvider({ children }: { children: ReactElement }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{children}</Store.Provider>;
}
