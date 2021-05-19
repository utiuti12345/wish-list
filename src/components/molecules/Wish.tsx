import React from "react";
import {Image, StyleSheet,TouchableOpacity} from "react-native";
import {COLOR} from "../../constants/theme";

const styles = StyleSheet.create({
    image:{
        width:180,
        height:180,
        borderRadius:10,
        borderWidth:2,
        borderColor: COLOR.WHITE,
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

export interface GotoDetail{
    (state:State):void;
}

interface Props {
    wish:State;
    gotoDetail:GotoDetail;
}

export default function Wish(props:Props) {
    const {wish,gotoDetail} = props;

    const onLongPress = React.useCallback(() => {
        console.log("onLongPress");
    },[]);

    const onPress = React.useCallback(() => {
        gotoDetail(wish);
    },[wish,gotoDetail]);

    return(
        <TouchableOpacity onLongPress={onLongPress} onPress={onPress}>
            <Image source={{ uri: wish.imageUrl }}
                   key={wish.id}
                   style={styles.image}
            />
        </TouchableOpacity>
    )
}
