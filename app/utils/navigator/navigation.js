import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import DashBoard from '../../components/Dashboard';


const MainNavigator = createSwitchNavigator({
    Home: {screen: DashBoard}    
  });
  
  const App = createAppContainer(MainNavigator);
  
  export default App;