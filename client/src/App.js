import React from 'react';
import { BrowserRouter } from "react-router-dom"
import {useRoutse} from "./routse"
import 'materialize-css';

function App() {
  const routes = useRoutse();
  return (
    <BrowserRouter>
      <div>
          {routes}
      </div>
    </BrowserRouter>
  );
}

export default App;
