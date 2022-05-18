import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Pokemon from "./screens/Pokemon";
import error from './reducers/error';

import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';

const store = createStore(combineReducers({error}));

export default function App() {
  return (
     <Provider store={store}>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path="/:id" element={<Pokemon />} />
        </Routes>
      </BrowserRouter>
     </Provider>
  );
}
