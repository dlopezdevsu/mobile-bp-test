import * as React from 'react';
import Routes from 'src/Routes'
import { Store, StoreProvider } from 'src/hooks/main_store'
import Model from 'src/hooks/Model';
import BottomSheetModal from 'src/components/BottomSheetModal';
import AlertMessage from 'src/components/AlertMessage';

const InitiHook = () => {
  const { dispatch } = React.useContext(Store)

  React.useEffect(() => {
    Model.set_dispatch(dispatch)
  })

  return <></>
}

const App = () => {
  return (
    <StoreProvider>
      <>
        <InitiHook />
        <Routes />
        <BottomSheetModal />
        <AlertMessage />
      </>
    </StoreProvider>
  );
};

export default App;