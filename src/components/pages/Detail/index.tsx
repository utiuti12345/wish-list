import React, {useCallback, useState} from "react";
import {Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {fetchImageUrl} from "../../../lib/amazon";
import TextField from "../../atoms/TextField";
import {Button, dismiss} from "../../atoms";
import useControlledComponent from "../../../lib/hooks/use-controlled-component";
import {Wish} from "../../../domain/models";
import {TouchableWithoutFeedback} from "@ui-kitten/components/devsupport";
import {COLOR} from "../../../constants/theme";
import * as ImagePicker from "expo-image-picker";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingVertical: 24,
        paddingHorizontal: 16,
        backgroundColor: COLOR.WHITE,
    },
    inputContainer:{

    },
    imageContainer:{
        alignSelf: "center",
        flexDirection:"row"
    },
    text:{
        borderRadius: 25,
    },
    icon: {
        width: 32,
        height: 32,
    },
    image:{
        width:100,
        height:100,
        borderRadius:10,
        borderWidth:2,
        borderColor:'#d35647',
        resizeMode:'contain',
        margin:8
    },
    memo:{
        borderRadius: 25,
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
    const image1 = useControlledComponent('');
    const image2 = useControlledComponent('');
    const image3 = useControlledComponent('');
    const memo = useControlledComponent('');

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
    },[title.value,price.value,url.value,imageUrl.value,goBack]);

    const pickImage1 = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            image1.onChangeText(result.uri);
        }
    };

    const pickImage2 = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            image2.onChangeText(result.uri);
        }
    };

    const pickImage3 = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            image3.onChangeText(result.uri);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={dismiss} style={styles.container}>
            <SafeAreaView>
                <View style={styles.inputContainer}>
                    <TextField value={title.value} placeholder="タイトル" onChangeText={title.onChangeText} secureTextEntry={false} style={styles.text}/>
                    <TextField value={price.value} placeholder="価格" onChangeText={price.onChangeText} secureTextEntry={false} keyboardType="numeric" style={styles.text}/>
                    <TextField value={url.value} placeholder="販売サイト" onChangeText={onChangeUrl} secureTextEntry={false} style={styles.text}/>
                    <View style={styles.imageContainer}>
                        <TouchableOpacity onPress={pickImage1}>
                            <Image source={ image1.value == "" ? require("../../../../assets/camera.png") : { uri: image1.value }} style={styles.image}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={pickImage2}>
                            <Image source={ image2.value == "" ? require("../../../../assets/camera.png") : { uri: image2.value }} style={styles.image}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={pickImage3}>
                            <Image source={ image3.value == "" ? require("../../../../assets/camera.png") : { uri: image3.value }} style={styles.image}/>
                        </TouchableOpacity>
                    </View>
                    <TextField value={memo.value} placeholder="メモ" textStyle={{minHeight: 150}} onChangeText={memo.onChangeText} secureTextEntry={false} multiline={true} style={styles.memo}/>
                    <Button label="更新" onPress={onSubmit}/>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
