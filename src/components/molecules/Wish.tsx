import React from "react";
import {Image, StyleSheet,TouchableOpacity} from "react-native";

const styles = StyleSheet.create({
    image:{
        width:150,
        height:150,
        borderRadius:10,
        borderWidth:2,
        borderColor:'#d35647',
        resizeMode:'contain',
        margin:8
    }
});

interface Props {
    index:number;
    uri:string;
}

export default function Wish(props:Props) {
    const {index,uri} = props;
    return(
        <TouchableOpacity onPress={() => console.log("aaaaa")}>
            <Image source={{ uri: uri }}
                   key={index}
                   style={styles.image}
            />
        </TouchableOpacity>
    )
}
