import React from "react";
import {SafeAreaView, StyleSheet, View} from "react-native";
import signInWithPasswordToFirebase from "../../../lib/firebase/sign-in-with-password";
import {UiContext, UserContext} from "../../../contexts";
import * as WishRepository from "../../../domain/repositories/wish";
import * as LocalStore from "../../../lib/local-store/index";
import useControlledComponent from "../../../lib/hooks/use-controlled-component";
import {WishList} from "../../../domain/models";
import {TouchableWithoutFeedback} from "@ui-kitten/components/devsupport";
import {Button, TextField,dismiss} from "../../atoms";
import {Status} from "../../../contexts/ui";

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

interface Props{
    actions:{
        setWishList:(wishList:WishList.Model) => void;
    }
}

export default function SignIn(props:Props) {
    const {setUserState} = React.useContext(UserContext);
    const {setApplicationState} = React.useContext(UiContext);
    const {setWishList} = props.actions;

    const mailAddress = useControlledComponent('');
    const password = useControlledComponent('');

    const signInWithPassword = React.useCallback(async () => {
        console.log(mailAddress.value);
        const userInformation = await signInWithPasswordToFirebase(mailAddress.value,password.value);
        console.log(userInformation);
        setUserState(userInformation);
        await LocalStore.UserInformation.save(userInformation);

        const wishList = await WishRepository.getAll(userInformation.id);
        setWishList(wishList);
        setApplicationState(Status.AUTHORIZED);
    },[mailAddress.value,password.value,setUserState,setWishList]);

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
                    onPress={signInWithPassword}
                    label="SignIn"
                />
            </View>
        </SafeAreaView>
    );
}
