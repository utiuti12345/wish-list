import React, {useCallback, useState} from "react";
import {Image, SafeAreaView, StyleSheet, Text, TextInput} from "react-native";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {fetchImageUrl} from "../../../lib/amazon";
import TextField from "../../atoms/TextField";
import {Button} from "../../atoms";
import useControlledComponent from "../../../lib/hooks/use-controlled-component";
import {Wish} from "../../../domain/models";

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

interface Params{
    id:string;
    title:string;
    imageUrl?:string;
    price:string;
    url:string;
}

interface Props{
    actions: {
        updateWish: (id:string,newValues: Wish.Values) => void;
    };
}

export default function Detail(props:Props) {
    const {goBack} = useNavigation();
    const {params} = useRoute<RouteProp<Record<string, Params>, string>>();
    const {id,title:titleInitialValue,imageUrl:imageUrlInitialValue,price:priceInitialValue,url:urlInitialValue} = params;

    const title = useControlledComponent(titleInitialValue);
    const price = useControlledComponent(priceInitialValue);
    const url = useControlledComponent(urlInitialValue);
    const imageUrl = useControlledComponent(imageUrlInitialValue);

    const onChangeUrl = useCallback((newValue) => {
        url.onChangeText(newValue);
        const image = fetchImageUrl(newValue);
        imageUrl.onChangeText(image);
    },[url,imageUrl]);

    const onSubmit = useCallback( async () => {
        console.log(url.value);
        props.actions.updateWish(
            id,
            {
                title:title.value,
                price:price.value,
                url:url.value,
                imageUrl:imageUrl.value,
                detail:"",
        });

        goBack();
    },[title,price,url,imageUrl]);

    return (
        <SafeAreaView>
            <TextField label="text" value={title.value} onChangeText={title.onChangeText} secureTextEntry={false}/>
            <TextField label="price" value={price.value} onChangeText={price.onChangeText} secureTextEntry={false} keyboardType="numeric"/>
            <TextField label="url" value={url.value} onChangeText={onChangeUrl} secureTextEntry={false}/>
            <Image source={{ uri: imageUrl.value }}
                   key={id}
                   style={styles.image}
            />
            <Button label="更新" onPress={onSubmit}/>
        </SafeAreaView>
    )
}
