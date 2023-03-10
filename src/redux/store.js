import { configureStore } from "@reduxjs/toolkit";
import userReducer , {companyReducer} from "./user_action"
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig  = {
    key: "root",
    version: 1,
    storage
}


const reducer = combineReducers({
  user: userReducer,
  company: companyReducer
});

const persistedReducer = persistReducer(persistConfig , reducer)

export default configureStore({
    reducer: persistedReducer
})