import { RouterProvider } from 'react-router-dom';

// project imports
import router from 'routes';
import ThemeCustomization from 'themes';

import ScrollTop from 'components/ScrollTop';
import { Toaster } from 'react-hot-toast';
import { persistor, store } from './store';


import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

    <ThemeCustomization>
      <Toaster />

      <ScrollTop>
        <RouterProvider router={router} />
      </ScrollTop>
    </ThemeCustomization>
        </PersistGate>
  </Provider>
  );
}
