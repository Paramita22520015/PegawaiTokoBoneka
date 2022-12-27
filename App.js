// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/router';

function App() {
  return (
    <NavigationContainer>
      <Router/>
    </NavigationContainer>
  );
}

export default App;