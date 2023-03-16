import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  AsyncThunkAction,
} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import counterReducer from './slices/counter.slice';
import userReducer from './slices/user.slice';
import authReducer from './slices/auth.slice';

const rootReducer = combineReducers({
  counter: counterReducer,
  users: userReducer,
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
