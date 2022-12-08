import { createSelector } from 'reselect';

import { AppState } from '..';

export const applicationSelector = (state: AppState) => state.application;

export const accountSelector = createSelector(applicationSelector, (app) => {
  return app.account;
});
