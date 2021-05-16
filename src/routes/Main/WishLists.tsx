import React, {useContext} from "react";

import {createStackNavigator} from "@react-navigation/stack";
import {DETAIL, WISH_LIST} from "../../constants/path";

import {WishLists,Detail} from "../../containers"
import {UserContext} from "../../contexts";

const Stack = createStackNavigator();

export default function WishListsNavigator(){
    const {userState} = useContext(UserContext);
    if(!userState){
        return null;
    }

    return(
        <Stack.Navigator initialRouteName={WISH_LIST} headerMode="none">
            <Stack.Screen name={userState.mailAddress ? userState.mailAddress : WISH_LIST} component={WishLists}/>
            <Stack.Screen name={DETAIL} component={Detail}/>
        </Stack.Navigator>
    )
}
