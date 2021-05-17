import React, {useContext} from "react";

import {createStackNavigator} from "@react-navigation/stack";
import {DETAIL, WISH_LIST} from "../../constants/path";

import {WishList,Detail} from "../../containers"
import {UserContext} from "../../contexts";

const Stack = createStackNavigator();

export default function WishListNavigator(){
    const {userState} = useContext(UserContext);
    if(!userState){
        return null;
    }

    return(
        <Stack.Navigator initialRouteName={WISH_LIST} headerMode="none">
            <Stack.Screen name={userState.mailAddress ? userState.mailAddress : WISH_LIST} component={WishList}/>
            <Stack.Screen name={DETAIL} component={Detail}/>
        </Stack.Navigator>
    )
}
