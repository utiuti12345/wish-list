import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator,StackCardInterpolationProps} from "@react-navigation/stack";
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {HOME, INPUT, LOADING, SIGN_IN, USER_INFO} from "../../constants/path";
import {UserInfo} from "../../components/pages";
import {Input,SignIn,Loading} from "../../containers";
import * as UiContext from "../../contexts/ui";
import Home from "./Home";
import Icon from "../../components/atoms/Icon";
import {StyleSheet} from "react-native";
import {COLOR} from "../../constants/theme";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const ModalStack = createStackNavigator();
const forFade = ({current}:StackCardInterpolationProps) => ({
    cardStyle:{
        opacity:current.progress
    }
});

const styles = StyleSheet.create({
    icon: {
        width: 32,
        height: 32,
    },
});

const cardStyle = {
    backgroundColor: COLOR.WHITE,
    headerShown: true,
};

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
        >
            <Tab.Screen name={HOME} component={Home} options={{
                tabBarLabel: 'Home',
                tabBarIcon: () => (
                    <Icon name="gift-outline" fill="#8F9BB3" style={styles.icon}/>
                ),
            }}/>
            <Tab.Screen name={USER_INFO} component={UserInfo} options={{
                tabBarLabel: 'UserInfo',
                tabBarIcon: () => (
                    <Icon name="person" fill="#8F9BB3" style={styles.icon}/>
                ),
            }}/>
        </Tab.Navigator>
    )
}

function TabWithModalRoutes() {
    return (
        <ModalStack.Navigator mode="modal" headerMode="none" screenOptions={{cardStyle}}>
            <Tab.Screen name={HOME} component={TabRoutes}/>
            <Tab.Screen name={INPUT} component={Input}/>
        </ModalStack.Navigator>
    )
}

function switchingAuthStatus(status:UiContext.Status) {
    switch (status) {
        case UiContext.Status.AUTHORIZED:
            return <Stack.Screen name={HOME} component={TabWithModalRoutes}/>;
        case UiContext.Status.FIRST_OPEN:
            return <Stack.Screen name={HOME} component={Loading}/>;
        case UiContext.Status.LOADING:
            return <Stack.Screen name={LOADING} component={Loading}/>;
        case UiContext.Status.UN_AUTHORIZED:
            return <Stack.Screen name={SIGN_IN} component={SignIn}/>;
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
