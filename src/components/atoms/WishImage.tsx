import React from "react";
import {Image, StyleSheet, View} from "react-native";
import {COLOR} from "../../constants/theme";
import {Text} from "@ui-kitten/components";

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        width:'95%',
        height:'100%',
        margin:5,
        borderWidth:1,
        borderRadius:20,
        borderColor:COLOR.BLACK,
    },
    text:{
        flex:1,
        borderRadius:10,
        borderColor: COLOR.BLACK,
    },
    image:{
        width:140,
        height:140,
        resizeMode:'contain',
        margin:8
    }
});

export interface State {
    id:string;
    title:string;
    imageUrl?:string;
    price?:string;
}

interface Props {
    wish:State;
}

export default function WishImage(props:Props){
    const {wish} = props;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{wish.title}</Text>
            <Image source={{ uri: wish.imageUrl }}
                   key={wish.id}
                   style={styles.image}
            />
        </View>
    )
}
