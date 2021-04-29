import React from "react";
import {SafeAreaView, StyleSheet, Text} from "react-native";
import {Button} from "../../atoms";
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
    const {setUserState} = React.useContext(UserContext);
    const {setApplicationState} = React.useContext(UiContext);

    const SignOut = React.useCallback(async () => {
        await signOut();
        setUserState(null);
        await LocalStore.UserInformation.clear();
        setApplicationState(Status.UN_AUTHORIZED);
        console.log("aaaaaa");
    },[]);

    return (
        <SafeAreaView style={styles.container}>
            <Text>UserInfo</Text>
            <Button onPress={SignOut} label="SignOut"/>
        </SafeAreaView>
        );
}
