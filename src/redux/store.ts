import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
     REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import todoSlice from './todoSlice';

const persistConfig = {
  key: 'todo',
  storage,
  whitelist: ['issues', 'boards', 'repoInfo'],
};

 const persistedReducer = persistReducer(persistConfig, todoSlice.reducer);

export const store = configureStore({
    reducer: {
        todo: persistedReducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;;