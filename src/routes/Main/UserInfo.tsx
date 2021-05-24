import React, {useContext} from "react";

import {createStackNavigator} from "@react-navigation/stack";
import {USER_INFO,USER_INPUT} from "../../constants/path";

import {Home,Detail} from "../../containers"
import {UserContext} from "../../contexts";
import {UserInfo, UserInput} from "../../components/pages";

const Stack = createStackNavigator();

export default function UserInfoNavigator(){
    const {userState} = useContext(UserContext);
    if(!userState){
        return null;
    }

    return(
        <Stack.Navigator initialRouteName={USER_INFO} headerMode="none">
            <Stack.Screen name={userState.mailAddress ? userState.mailAddress : USER_INFO} component={UserInfo}/>
            <Stack.Screen name={USER_INPUT} component={UserInput}/>
        </Stack.Navigator>
    )
}
