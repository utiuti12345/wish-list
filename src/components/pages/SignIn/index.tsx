import React from "react";
import {StyleSheet, View} from "react-native";
import signInWithPasswordToFirebase from "../../../lib/firebase/sign-in-with-password";
import {UiContext, UserContext} from "../../../contexts";
import * as WishRepository from "../../../domain/repositories/wish";
import * as LocalStore from "../../../lib/local-store/index";
import useControlledComponent from "../../../lib/hooks/use-controlled-component";
import {WishList} from "../../../domain/models";
import {TouchableWithoutFeedback} from "@ui-kitten/components/devsupport";
import {Button, TextField, dismiss} from "../../atoms";
import {Status} from "../../../contexts/ui";
import {COLOR} from "../../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 24,
        paddingHorizontal: 16,
        backgroundColor: COLOR.WHITE,
    },
    formContainer: {
        flex: 1,
        marginTop: 200,
    },
    text: {
        borderRadius: 25,
    },
    buttonContainer:{
        flex:1,
    }
});

interface Props {
    actions: {
        setWishList: (wishList: WishList.Model) => void;
    }
}

export default function SignIn(props: Props) {
    const {setUserState} = React.useContext(UserContext);
    const {setApplicationState} = React.useContext(UiContext);
    const {setWishList} = props.actions;

    const mailAddress = useControlledComponent('');
    const password = useControlledComponent('');

    const signInWithPassword = async () => {
        const userInformation = await signInWithPasswordToFirebase(mailAddress.value, password.value);
        setUserState(userInformation);
        await LocalStore.UserInformation.save(userInformation);

        const wishList = await WishRepository.getAll(userInformation.id);
        setWishList(wishList);
        setApplicationState(Status.AUTHORIZED);
    };

    return (
        <TouchableWithoutFeedback onPress={dismiss} style={styles.container}>
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <TextField
                        value={mailAddress.value}
                        placeholder="email"
                        onChangeText={mailAddress.onChangeText}
                        autoCompleteType="email"
                        style={styles.text}
                    />
                    <TextField
                        value={password.value}
                        placeholder="password"
                        onChangeText={password.onChangeText}
                        autoCompleteType="password"
                        secureTextEntry={true}
                        style={styles.text}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={signInWithPassword}
                        label="SignIn"
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
