import { configureStore,combineReducers } from '@reduxjs/toolkit'
import userSlice from './user/userSlice.js'
import ThemeReducer from './theme/ThemeSlice.js'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// import  version  from 'react'



const rootReducer=combineReducers({
    user:userSlice,
    theme:ThemeReducer,
})

const persistconfig = {
    key:'root',
    storage,
    version:1,
}


const persistReducers = persistReducer(persistconfig,rootReducer)

export const store = configureStore({
  reducer: persistReducers,
    midllerware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck:false})
  },
)

export const persitor = persistStore(store)