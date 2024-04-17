import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import ItemStore from './store/ItemStore';

export const Context = createContext(null)
console.log('Hello world')
console.log(process.env.REACT_APP_API_URL)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{
      user: new UserStore(),
      itemsData: new ItemStore(),
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);

export default Context;
