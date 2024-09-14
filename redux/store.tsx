import { configureStore } from "@reduxjs/toolkit";

import tasksReducer from './to-do-slice'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: 'root', // key for persist
    storage: AsyncStorage, // specify AsyncStorage for React Native
  }
  const persistedTasksReducer = persistReducer(persistConfig, tasksReducer);



const store = configureStore({
    reducer:{
        tasks:persistedTasksReducer
    }
})
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;


