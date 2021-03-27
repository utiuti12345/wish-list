import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator,StackCardInterpolationProps} from "@react-navigation/stack";
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {HOME, LOADING, USER_INFO} from "../../constants/path";
import {Home,Loading,UserInfo} from "../../components/pages";
import * as UiContext from "../../contexts/ui";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const forFade = ({current}:StackCardInterpolationProps) => ({
    cardStyle:{
        opacity:current.progress
    }
});

function TabRoutes() {
    return(
        <Tab.Navigator initialRouteName={HOME}
                       tabBarOptions={{
                           inactiveTintColor: '#FFF',
                           activeTintColor: '#00d8ff',
                           style: {
                               backgroundColor: '#333333',
                           },
                       }}
                       // screenOptions={(props: any) => {
                       //     const routeName = getFocusedRouteNameFromRoute(props.route);
                       //     return {
                       //         tabBarVisible: routeName !== USER_INFO
                       //     }
                       // }}
        >
            <Tab.Screen name={HOME} component={Home}/>
            <Tab.Screen name={USER_INFO} component={UserInfo}/>
        </Tab.Navigator>
    )
}

function switchingAuthStatus(status:UiContext.Status) {
    switch (status) {
        case UiContext.Status.AUTHORIZED:
            return <Stack.Screen name={HOME} component={TabRoutes}/>;
        case UiContext.Status.FIRST_OPEN:
            return <Stack.Screen name={HOME} component={Home}/>;
        case UiContext.Status.LOADING:
            return <Stack.Screen name={HOME} component={Home}/>;
        case UiContext.Status.UN_AUTHORIZED:
            return <Stack.Screen name={HOME} component={Home}/>;
    }
}

function AuthWihRoutes() {
    const uiContext = React.useContext(UiContext.Context);
    return (
        <Stack.Navigator initialRouteName={LOADING} headerMode="none" screenOptions={{cardStyleInterpolator:forFade}}>
            {uiContext.applicationState !== UiContext.Status.LOADING
                ? (switchingAuthStatus(uiContext.applicationState))
                : (<Stack.Screen name={LOADING} component={Loading} /> )
            }
        </Stack.Navigator>
    )
}

export default AuthWihRoutes;
