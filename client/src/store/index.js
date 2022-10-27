import { applyMiddleware, legacy_createStore as createStore } from "redux";
import reducer from "../reducer/index";
import thunk from "redux-thunk";

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
