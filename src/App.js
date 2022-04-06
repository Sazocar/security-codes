import React from 'react';
import './App.css';
import { ClassState } from './ClassState.js';
import { UseState } from './UseState.js';

const App = () => {
  return (
    <div className="App">
      <UseState name="UseState" />
      <ClassState name="ClassState" />
    </div>
  );
}

export { App };
