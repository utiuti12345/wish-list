import React, {useContext} from "react";

import {createStackNavigator} from "@react-navigation/stack";
import {DETAIL, HOME} from "../../constants/path";

import {Home,Detail} from "../../containers"
import {UserContext} from "../../contexts";

const Stack = createStackNavigator();

export default function HomeNavigator(){
    const {userState} = useContext(UserContext);
    if(!userState){
        return null;
    }

    return(
        <Stack.Navigator initialRouteName={HOME} headerMode="none">
            <Stack.Screen name={userState.mailAddress ? userState.mailAddress : HOME} component={Home}/>
            <Stack.Screen name={DETAIL} component={Detail}/>
        </Stack.Navigator>
    )
}
