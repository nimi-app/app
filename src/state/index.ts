import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { reducer as application } from './application/reducer';

export const store = configureStore({
  reducer: {
    application,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
