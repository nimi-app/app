import { configureStore } from '@reduxjs/toolkit';
import { transactionsReducer } from './transactions/reducer';
import { reducer as application } from './application/reducer';
import { save, load } from 'redux-localstorage-simple';
const PERSISTED_KEYS: string[] = ['application', 'transactions'];

const persistenceNamespace = 'nimi';
export const store = configureStore({
  reducer: {
    application,
    transactions: transactionsReducer,
  },
  middleware: [
    save({
      states: PERSISTED_KEYS,
      namespace: persistenceNamespace,
    }),
  ],
  preloadedState: load({ states: PERSISTED_KEYS, namespace: persistenceNamespace }),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
