import './Counter.css';
import { useState } from 'react';

const Counter = () => {
   const [theme, setTheme] = useState('light');

   const setDarkThemeHandler = () => {
      setTheme('dark');
   };

   const setLightThemeHandler = () => {
      setTheme('light');
   };

   return (
      <div className={`contentn ${theme}`}>
         <h1>UseState Component</h1>
         <button onClick={setDarkThemeHandler}>Dark</button>
         <button onClick={setLightThemeHandler}>Light</button>
      </div>
   )
}

export default Counter;