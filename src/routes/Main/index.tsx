import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {HOME, USER_INFO} from "../../constants/path";
import Home from "../../components/pages/Home";
import UserInfo from "../../components/pages/UserInfo";

const Tab = createBottomTabNavigator();

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
