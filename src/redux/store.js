import Cartreducer from "./Cartreducer";
import { legacy_createStore as createStore } from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';

const store=createStore(Cartreducer,composeWithDevTools());
export default store;