import React, {useCallback, useState} from "react";
import {Image, SafeAreaView, StyleSheet, Text, TextInput} from "react-native";
import {RouteProp, useRoute} from "@react-navigation/native";
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
}

export default function Detail() {
    const {params} = useRoute<RouteProp<Record<string, Params>, string>>();
    const {id,title,imageUrl,price} = params;

    const [titleValue,setTitle] = useState(title);
    const onChangeTitle = useCallback((newValue) => {
        setTitle(newValue);
    },[setTitle]);

    const [priceValue,setPrice] = useState(price);
    const onChangePrice = useCallback((newValue) => {
        setPrice(newValue);
    },[setPrice]);

    return (
        <SafeAreaView>
            <TextField label="text" value={titleValue} onChangeText={onChangeTitle} secureTextEntry={false}/>
            <TextField label="price" value={priceValue} onChangeText={onChangePrice} secureTextEntry={false} keyboardType="numeric"/>
            <Image source={{ uri: imageUrl }}
                   key={id}
                   style={styles.image}
            />
        </SafeAreaView>
    )
}
