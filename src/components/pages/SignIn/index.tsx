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
    container:{
        flex:1,
        padding:16,
        justifyContent:'center',
    },
    text:{
        marginVertical:20,
    },
    button:{
        marginTop:50,
    },
    textContainer:{
        flex:1,
        justifyContent: 'center',
    },
    buttonContainer:{
        flex:1,
        justifyContent:'flex-start',
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
        <TouchableWithoutFeedback onPress={dismiss}>
            <SafeAreaView style={styles.container}>
                <View style={styles.textContainer}>
                    <TextField
                        label="email"
                        value={mailAddress.value}
                        onChangeText={mailAddress.onChangeText}
                        style={styles.text}
                        autoCompleteType="email"
                    />
                    <TextField
                        label="password"
                        value={password.value}
                        onChangeText={password.onChangeText}
                        style={styles.text}
                        autoCompleteType="password"
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={signInWithPassword}
                        style={styles.button}
                        label="SignIn"
                    />
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}
