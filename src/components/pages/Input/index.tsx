import React, {useCallback, useState} from "react";
import {Image, SafeAreaView, StyleSheet, Text} from "react-native";
import {Button,TextField} from "../../atoms";
import {fetchImageUrl} from "../../../lib/amazon";
import {useNavigation} from "@react-navigation/native";
import registerUser from "../../../lib/firebase/register-user";
import {addAndSync} from "../../../usecases/wish";

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

export default function Input() {
    const {goBack} = useNavigation();

    const [titleValue,setTitle] = useState("");
    const onChangeTitle = useCallback((newValue) => {
        setTitle(newValue);
    },[setTitle]);

    const [priceValue,setPrice] = useState("");
    const onChangePrice = useCallback((newValue) => {
        setPrice(newValue);
    },[setPrice]);

    const [urlValue,setUrl] = useState("");
    const [imageUrlValue,setImageUrl] = useState("");
    const onChangeUrl = useCallback((newValue) => {
        setUrl(newValue);
        const imageUrl = fetchImageUrl(newValue);
        setImageUrl(imageUrl);
    },[setUrl]);

    const onSubmit = React.useCallback(async () => {
        console.log("aaa");
        // addAndSync("4DG0xhyz3ihmbFEAyklcyEvE9vJ3",{
        //     title:"トレーニングウエアソックス12344",
        //     imageUrl:"https://images-na.ssl-images-amazon.com/images/P/B01BM6FQQS.09.MZZZZZZZ",
        //     detail:"aaaa",
        //     price:"1200",
        // });
        goBack();
    },[goBack]);

    return (
        <SafeAreaView>
            <TextField label="text" value={titleValue} onChangeText={onChangeTitle} secureTextEntry={false}/>
            <TextField label="price" value={priceValue} onChangeText={onChangePrice} secureTextEntry={false} keyboardType="numeric"/>
            <TextField label="url" value={urlValue} onChangeText={onChangeUrl} secureTextEntry={false}/>
            <Image source={{ uri: imageUrlValue }}
                   style={styles.image}
            />
            <Button label="sample" onPress={onSubmit}/>
        </SafeAreaView>
    )
}
