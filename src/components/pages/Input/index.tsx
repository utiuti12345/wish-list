import React, {useContext} from "react";
import {Image, SafeAreaView, StyleSheet, TouchableOpacity, View} from "react-native";
import {Avatar, Button, dismiss, TextField} from "../../atoms";
import {fetchImageUrl} from "../../../lib/amazon";
import {useNavigation} from "@react-navigation/native";
import {Wish} from "../../../domain/models";
import useControlledComponent from "../../../lib/hooks/use-controlled-component";
import {TouchableWithoutFeedback} from "@ui-kitten/components/devsupport";
import {COLOR} from "../../../constants/theme";
import {IconButton} from "../../molecules";
import {UserContext} from "../../../contexts";
import * as ImagePicker from "expo-image-picker";

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
        borderColor:COLOR.WHITE,
        resizeMode:'contain',
        margin:8
    },
    memo:{
        borderRadius: 25,
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
    const image1 = useControlledComponent('');
    const image2 = useControlledComponent('');
    const image3 = useControlledComponent('');
    const memo = useControlledComponent('');

    const onChangeUrl = React.useCallback((newValue) => {
        url.onChangeText(newValue);

        const image = fetchImageUrl(newValue);
        image1.onChangeText(image);
    },[]);

    const onSubmit = React.useCallback(async () => {
        props.actions.addWish({
            title:title.value,
            price:price.value,
            url:url.value,
            imageUrl:image1.value,
            detail:"",
        });

        goBack();
        title.onChangeText("");
        price.onChangeText("");
    },[goBack,title,price,url,image1]);

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

    if(!userState){
        return null;
    }

    const source = userState.photoImage == null ? require("../../../../assets/person.png") : userState.photoImage;

    return (
        <TouchableWithoutFeedback onPress={dismiss} style={styles.container}>
            <SafeAreaView>
                <View style={styles.headerContainer}>
                    <IconButton name="close-outline" fill="#8F9BB3" style={styles.icon} onPress={() => goBack()}/>
                    <View style={{ flex: 1 }} />
                    <Avatar size={40} source={source}/>
                </View>
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
                    <Button label="登録" onPress={onSubmit}/>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}
