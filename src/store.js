//Redux
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middleware = [thunk];

let store;

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    } catch (err) {
        console.log(err)
    }
}
function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState === null) return undefined
        return JSON.parse(serializedState)
    } catch (err) {
        console.log(err)
        return undefined
    }
}
const persistedState = loadFromLocalStorage()

if (window.navigator.userAgent.includes("Chrome") && localStorage.getItem("jwtToken")) {
    store = createStore(
        rootReducer,
        persistedState,
        compose(
            applyMiddleware(...middleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()))
} else {
    store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware))
    );
}
store.subscribe(() => saveToLocalStorage(store.getState()))

export default store;