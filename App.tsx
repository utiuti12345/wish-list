import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as UiContext from './src/contexts/ui';
import Routes from "./src/routes";

export default function App() {
  const [applicationState,setApplicationState] = React.useState(UiContext.createApplicationState());
  return (
      <UiContext.Context.Provider value={{applicationState,setApplicationState}}>
          <Routes/>
      </UiContext.Context.Provider>
  );
}

