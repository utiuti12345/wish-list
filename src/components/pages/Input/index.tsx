import React, {useCallback, useState} from "react";
import {Image, SafeAreaView, StyleSheet, Text} from "react-native";
import {Button,TextField} from "../../atoms";
import {fetchImageUrl} from "../../../lib/amazon";
import {useNavigation} from "@react-navigation/native";
import {Wish} from "../../../domain/models";
import useControlledComponent from "../../../lib/hooks/use-controlled-component";

const styles = StyleSheet.create({
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
        <SafeAreaView>
            <TextField label="text" value={title.value} onChangeText={title.onChangeText} secureTextEntry={false}/>
            <TextField label="price" value={price.value} onChangeText={price.onChangeText} secureTextEntry={false} keyboardType="numeric"/>
            <TextField label="url" value={url.value} onChangeText={onChangeUrl} secureTextEntry={false}/>
            <Image source={{ uri: imageUrl.value }}
                   style={styles.image}
            />
            <Button label="登録" onPress={onSubmit}/>
        </SafeAreaView>
    )
}
