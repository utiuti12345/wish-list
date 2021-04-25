import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as UiContext from './src/contexts/ui';
import * as UserContext from "./src/contexts/user";
import Routes from "./src/routes";
import * as eva from '@eva-design/eva';
import {
    ApplicationProvider,
    IconRegistry,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider} from "react-redux";
import store from "./src/store";

export default function App() {
  const [applicationState,setApplicationState] = React.useState(UiContext.createApplicationState());
  const [userState,setUserState] = React.useState(UserContext.createInitialState());
  return (
      <Provider store={store}>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={eva.light}>
              <SafeAreaProvider>
                  <UiContext.Context.Provider value={{applicationState,setApplicationState}}>
                      <UserContext.Context.Provider value={{userState,setUserState}} >
                          <Routes/>
                      </UserContext.Context.Provider>
                  </UiContext.Context.Provider>
              </SafeAreaProvider>
          </ApplicationProvider>
      </Provider>
  );
}

