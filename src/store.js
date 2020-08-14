import { createStore, combineReducers } from 'redux';
import { rootState } from "./reducers";
import { persistStore, persistReducer, createMigrate } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


export const initialState = {
    rootState: {
    }
};

const reducers = combineReducers({rootState});

const migrations = {}

const persistConfig = {
    key: 'root-store',
    storage,
    // version: `7`,
    // migrate: createMigrate(migrations, {debug: false})
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer, initialState);
export const persistor = persistStore(store);