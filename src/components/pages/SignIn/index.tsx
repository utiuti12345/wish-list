import React from "react";
import {Text} from "react-native";
import {UserContext} from "../../../contexts";

export default function SignIn() {
    const {setUserState} = React.useContext(UserContext);

    return <Text>SignIn</Text>
}
