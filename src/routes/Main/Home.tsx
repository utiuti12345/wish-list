import React from "react";

import {createStackNavigator} from "@react-navigation/stack";
import {DETAIL, HOME} from "../../constants/path";

import {Detail} from "../../components/pages";
import {Home} from "../../containers"

const Stack = createStackNavigator();

export default function HomeNavigator(){
    return(
        <Stack.Navigator initialRouteName={HOME}>
            <Stack.Screen name={HOME} component={Home}/>
            <Stack.Screen name={DETAIL} component={Detail}/>
        </Stack.Navigator>
    )
}
