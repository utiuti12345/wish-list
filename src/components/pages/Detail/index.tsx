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
}

export default function Detail() {
    const {params} = useRoute<RouteProp<Record<string, Params>, string>>();
    const {id,title,imageUrl} = params;

    const [value,setValue] = useState(title);
    const onChange = useCallback((newValue) => {
        setValue(newValue);
    },[setValue]);

    return (
        <SafeAreaView>
            <TextField label="text" value={value} onChangeText={onChange} secureTextEntry={false}></TextField>
            <Image source={{ uri: imageUrl }}
                   key={id}
                   style={styles.image}
            />
        </SafeAreaView>
    )
}
