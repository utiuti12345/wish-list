import React, {useCallback, useContext, useState} from "react";
import {Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {Avatar, Button, dismiss, TextField} from "../../atoms";
import {fetchImageUrl} from "../../../lib/amazon";
import {useNavigation} from "@react-navigation/native";
import {Wish} from "../../../domain/models";
import useControlledComponent from "../../../lib/hooks/use-controlled-component";
import {TouchableWithoutFeedback} from "@ui-kitten/components/devsupport";
import {COLOR} from "../../../constants/theme";
import {IconButton} from "../../molecules";
import {UserContext} from "../../../contexts";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 24,
        paddingHorizontal: 16,
        backgroundColor: COLOR.WHITE,
    },
    headerContainer:{
        alignSelf: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        padding: 5,
        paddingRight: 10
    },
    inputContainer:{

    },
    text:{
        borderRadius: 25,
    },
    icon: {
        width: 32,
        height: 32,
    },
    image:{
        width:300,
        height:300,
        borderRadius:10,
        borderWidth:2,
        borderColor:'#d35647',
        resizeMode:'contain',
        margin:8
    }
});

interface Props {
    actions: {
        addWish: (newValues: Wish.Values) => void;
    };
}

export default function Input(props:Props) {
    const {userState} = useContext(UserContext);
    const {goBack} = useNavigation();

    const title = useControlledComponent('');
    const price = useControlledComponent('');
    const url = useControlledComponent('');
    const imageUrl = useControlledComponent('');

    const onChangeUrl = React.useCallback((newValue) => {
        url.onChangeText(newValue);

        const image = fetchImageUrl(newValue);
        imageUrl.onChangeText(image);
    },[]);

    const onSubmit = React.useCallback(async () => {
        props.actions.addWish({
            title:title.value,
            price:price.value,
            url:url.value,
            imageUrl:imageUrl.value,
            detail:"",
        });

        goBack();
        title.onChangeText("");
        price.onChangeText("");
    },[goBack,title,price,url,imageUrl]);

    if(!userState){
        return null;
    }

    const source = userState.photoUrl == null ? require("../../../../assets/person.png") : userState.photoUrl;

    return (
        <TouchableWithoutFeedback onPress={dismiss} style={styles.container}>
            <SafeAreaView>
                <View style={styles.headerContainer}>
                    <IconButton name="close-outline" fill="#8F9BB3" style={styles.icon} onPress={() => goBack()}/>
                    <View style={{ flex: 1 }} />
                    <Avatar size={40} source={source}/>
                </View>
                <View style={styles.inputContainer}>
                    <TextField value={title.value} onChangeText={title.onChangeText} secureTextEntry={false} style={styles.text}/>
                    <TextField value={price.value} onChangeText={price.onChangeText} secureTextEntry={false} keyboardType="numeric" style={styles.text}/>
                    <TextField value={url.value} onChangeText={onChangeUrl} secureTextEntry={false} style={styles.text}/>
                    <Image source={{ uri: imageUrl.value }}
                           style={styles.image}
                    />
                    <Button label="登録" onPress={onSubmit}/>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
