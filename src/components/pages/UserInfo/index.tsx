import React from "react";
import {SafeAreaView, StyleSheet, Text} from "react-native";
import {Avatar, Button} from "../../atoms";
import {UiContext, UserContext} from "../../../contexts";
import {Status} from "../../../contexts/ui";
import * as LocalStore from "../../../lib/local-store";
import signOut from "../../../lib/firebase/sign-out";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default function UserInfo() {
    const {userState,setUserState} = React.useContext(UserContext);
    const {setApplicationState} = React.useContext(UiContext);

    const SignOut = React.useCallback(async () => {
        await signOut();
        setUserState(null);
        await LocalStore.UserInformation.clear();
        setApplicationState(Status.UN_AUTHORIZED);
    },[]);

    if (!userState){
        return null;
    }

    const {name,mailAddress,photoUrl} = userState;

    const source = photoUrl == null ? require("../../../../assets/person.png") : photoUrl

    return (
        <SafeAreaView style={styles.container}>
            <Text>{name}</Text>
            <Text>{mailAddress}</Text>
            <Avatar source={source}/>
            <Button onPress={SignOut} label="SignOut"/>
        </SafeAreaView>
        );
}
