import { RouterProvider } from 'react-router-dom';

// project imports
import router from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';

import { Toaster } from 'react-hot-toast';

import { persistor, store } from './store';

import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import {
  Backdrop,
  CircularProgress
} from '@mui/material';

// ==============================|| APP CONTENT ||============================== //

function AppContent() {
  const { loading } = useSelector(
    (state) => state.loader
  );

  return (
    <ThemeCustomization>
      <Toaster />

      {/* GLOBAL LOADER */}
      <Backdrop
        open={loading}
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.modal + 1,
          backgroundColor: 'rgba(0,0,0,0.5)'
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <ScrollTop>
        <RouterProvider router={router} />
      </ScrollTop>
    </ThemeCustomization>
  );
}

// ==============================|| APP ||============================== //

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        <AppContent />
      </PersistGate>
    </Provider>
  );
}