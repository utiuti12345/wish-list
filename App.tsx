import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as UiContext from './src/contexts/ui';
import * as UserContext from "./src/contexts/user";
import Routes from "./src/routes";

export default function App() {
  const [applicationState,setApplicationState] = React.useState(UiContext.createApplicationState());
  const [userState,setUserState] = React.useState(UserContext.createInitialState());
  return (
      <UiContext.Context.Provider value={{applicationState,setApplicationState}}>
          <UserContext.Context.Provider value={{userState,setUserState}} >
              <Routes/>
          </UserContext.Context.Provider>
      </UiContext.Context.Provider>
  );
}

