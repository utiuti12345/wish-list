import React from "react";
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {Button, TextField} from "../../atoms";
import {UiContext, UserContext} from "../../../contexts";
import useControlledComponent from "../../../lib/hooks/use-controlled-component";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 24,
        paddingHorizontal: 16,
    },
    formContainer:{
        flex: 1,
        marginTop: 48,
    },
});

export default function SignUp() {
    const {setUserState} = React.useContext(UserContext);
    const {setApplicationState} = React.useContext(UiContext);

    const mailAddress = useControlledComponent('');
    const password = useControlledComponent('');

    const signUpWithPassword = React.useCallback(() => {
       console.log("sample");
    },[]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>
                <TextField
                    label="email"
                    value={mailAddress.value}
                    onChangeText={mailAddress.onChangeText}
                    autoCompleteType="email"
                />
                <TextField
                    label="password"
                    value={password.value}
                    onChangeText={password.onChangeText}
                    autoCompleteType="password"
                    secureTextEntry={true}
                />
                <Button
                    onPress={signUpWithPassword}
                    label="SignUp"
                />
            </View>
        </SafeAreaView>
    );
}
