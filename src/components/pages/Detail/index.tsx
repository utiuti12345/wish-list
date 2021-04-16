import React, {useCallback, useState} from "react";
import {Image, SafeAreaView, StyleSheet, Text, TextInput} from "react-native";
import {RouteProp, useRoute} from "@react-navigation/native";
import {fetchImageUrl} from "../../../lib/amazon";
import TextField from "../../atoms/TextField";

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

export default function Detail() {
    const {params} = useRoute<RouteProp<Record<string, Params>, string>>();
    const {id,title,imageUrl,price,url} = params;

    const [titleValue,setTitle] = useState(title);
    const onChangeTitle = useCallback((newValue) => {
        setTitle(newValue);
    },[setTitle]);

    const [priceValue,setPrice] = useState(price);
    const onChangePrice = useCallback((newValue) => {
        setPrice(newValue);
    },[setPrice]);

    const [urlValue,setUrl] = useState(url);
    const [imageUrlValue,setImageUrl] = useState(imageUrl);
    const onChangeUrl = useCallback((newValue) => {
        setUrl(newValue);
        const imageUrl = fetchImageUrl(newValue);
        setImageUrl(imageUrl);
    },[setUrl]);

    return (
        <SafeAreaView>
            <TextField label="text" value={titleValue} onChangeText={onChangeTitle} secureTextEntry={false}/>
            <TextField label="price" value={priceValue} onChangeText={onChangePrice} secureTextEntry={false} keyboardType="numeric"/>
            <TextField label="url" value={urlValue} onChangeText={onChangeUrl} secureTextEntry={false}/>
            <Image source={{ uri: imageUrlValue }}
                   key={id}
                   style={styles.image}
            />
        </SafeAreaView>
    )
}
