import React, {useCallback, useState} from "react";
import {Image, SafeAreaView, StyleSheet, Text} from "react-native";
import {Button, dismiss, TextField} from "../../atoms";
import {fetchImageUrl} from "../../../lib/amazon";
import {useNavigation} from "@react-navigation/native";
import {Wish} from "../../../domain/models";
import useControlledComponent from "../../../lib/hooks/use-controlled-component";
import {TouchableWithoutFeedback} from "@ui-kitten/components/devsupport";
import {COLOR} from "../../../constants/theme";

const styles = StyleSheet.create({
    container:{
        backgroundColor:COLOR.WHITE,
    },
    text:{
        borderRadius: 25,
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

    return (
        <TouchableWithoutFeedback onPress={dismiss} style={styles.container}>
            <SafeAreaView>
                <TextField value={title.value} onChangeText={title.onChangeText} secureTextEntry={false} style={styles.text}/>
                <TextField value={price.value} onChangeText={price.onChangeText} secureTextEntry={false} keyboardType="numeric" style={styles.text}/>
                <TextField value={url.value} onChangeText={onChangeUrl} secureTextEntry={false} style={styles.text}/>
                <Image source={{ uri: imageUrl.value }}
                       style={styles.image}
                />
                <Button label="登録" onPress={onSubmit}/>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
