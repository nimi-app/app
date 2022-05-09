import { configureStore } from '@reduxjs/toolkit';

import { reducer as application } from './application/reducer';

export const store = configureStore({
  reducer: {
    application,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
