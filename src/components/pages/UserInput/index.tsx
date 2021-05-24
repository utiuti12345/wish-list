import React from "react";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, Image, View, ImageBackground, Animated} from "react-native";
import {Avatar, Button, TextField} from "../../atoms";
import {UiContext, UserContext} from "../../../contexts";
import {Status} from "../../../contexts/ui";
import * as LocalStore from "../../../lib/local-store";
import signOut from "../../../lib/firebase/sign-out";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import useControlledComponent from "../../../lib/hooks/use-controlled-component";

const animatedValue = new Animated.Value(0);

const coverMov = animatedValue.interpolate({
    inputRange: [0, 94, 95],
    outputRange: [0, -94, -94]
});

const avatarMov = animatedValue.interpolate({
    inputRange: [0, 150, 151],
    outputRange: [0, -150, -150]
});

const avatarOp = animatedValue.interpolate({
    inputRange: [0, 94, 95],
    outputRange: [1, 0, 0]
});

const headerOp = animatedValue.interpolate({
    inputRange: [95, 180, 181],
    outputRange: [0, 0.75, 0.75]
});

const headerContentOp = animatedValue.interpolate({
    inputRange: [0, 180, 210],
    outputRange: [0, 0, 1]
});

const styles = StyleSheet.create({
    animatedImage:{
        marginTop: Constants.statusBarHeight,
        width: "100%",
        height: 150,
        zIndex: 2,
        position: "absolute",
    },
    animatedViewHeader:{
        width: "100%",
        position: "absolute",
        backgroundColor: "#121212",
        height: 56 + Constants.statusBarHeight,
        zIndex: 13,
        paddingTop: Constants.statusBarHeight,
        alignItems: "center"
    },
    animatedViewHeaderContent:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    animatedViewAvatar:{
        zIndex: 4,
        position: "absolute",
        top: 135,
    },
    avatarContainer:{
        marginLeft:20,
        marginTop:20
    },
    header: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: "column",
        backgroundColor: "white"
    },
    headerButton: {
        paddingLeft: 7,
        paddingRight: 7,
        paddingBottom: 3,
        paddingTop: 3,
        marginRight: 8
    },
    text:{
        borderRadius: 25,
    },
})

export default function UserInfo() {
    const {userState, setUserState} = React.useContext(UserContext);
    const {setApplicationState} = React.useContext(UiContext);

    const SignOut = async () => {
        await signOut();
        setUserState(null);
        await LocalStore.UserInformation.clear();
        setApplicationState(Status.UN_AUTHORIZED);
    };

    if (!userState) {
        return null;
    }

    const name = useControlledComponent(userState.name == null ? '' : userState.name);
    const photoImage = useControlledComponent(userState?.photoImage);
    const backgroundImage = useControlledComponent(userState?.backgroundImage);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            photoImage.onChangeText(result.uri);
        }
    };

    const source = photoImage.value == '' ? require("../../../../assets/person.png") : photoImage.value;
    const backgroundSource = backgroundImage.value == '' ? {uri: "https://reactjs.org/logo-og.png"} : backgroundImage.value;

    return (
        <View style={{flex: 1}}>
            <TouchableOpacity onPress={() => console.log("aaaaa")}>
                <Animated.Image
                    source={backgroundSource}
                    style={[styles.animatedImage,{transform:[{translateY:coverMov}]}]}
                />
            </TouchableOpacity>
            <Animated.View style={[styles.animatedViewHeader,{opacity:headerOp}]}>
                <Animated.View style={[styles.animatedViewHeaderContent,{opacity: headerContentOp,}]}>
                </Animated.View>
            </Animated.View>
            <Animated.View style={[styles.animatedViewAvatar,{opacity: avatarOp, transform: [{translateY: avatarMov}]}]}>
                <View style={styles.avatarContainer}>
                    <TouchableOpacity onPress={pickImage}>
                        <Avatar size={100} source={source}/>
                    </TouchableOpacity>
                </View>
            </Animated.View>

            <Animated.ScrollView
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {contentOffset: {y: animatedValue}}
                        }
                    ],
                    {
                        useNativeDriver: true
                    }
                )}
            >
                <View
                    style={StyleSheet.flatten([
                        styles.header,
                        {marginTop: 150 + Constants.statusBarHeight}
                    ])}
                >
                    <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
                        <Button onPress={SignOut} label="SignOut"/>
                    </View>
                </View>

                <View style={styles.header}>
                    <TextField value={name.value} placeholder="タイトル" onChangeText={name.onChangeText} secureTextEntry={false} style={styles.text}/>
                    <Button label="登録" onPress={() => console.log("aaaaaa")}/>
                </View>
            </Animated.ScrollView>
        </View>
    );
}
