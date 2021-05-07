import React from "react";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity,Image} from "react-native";
import {Avatar, Button} from "../../atoms";
import {UiContext, UserContext} from "../../../contexts";
import {Status} from "../../../contexts/ui";
import * as LocalStore from "../../../lib/local-store";
import signOut from "../../../lib/firebase/sign-out";
import * as ImagePicker from 'expo-image-picker';

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

    const SignOut = async () => {
        await signOut();
        setUserState(null);
        await LocalStore.UserInformation.clear();
        setApplicationState(Status.UN_AUTHORIZED);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    if (!userState){
        return null;
    }

    const {name,mailAddress,photoUrl} = userState;
    const [image, setImage] = React.useState(photoUrl ? '' : photoUrl);

    const source = image == '' ? require("../../../../assets/person.png") : image;

    return (
        <SafeAreaView style={styles.container}>
            <Text>{name}</Text>
            <Text>{mailAddress}</Text>
            <TouchableOpacity onPress={pickImage}>
                <Avatar source={{uri:source}}/>
            </TouchableOpacity>
            <Button onPress={SignOut} label="SignOut"/>
        </SafeAreaView>
        );
}
