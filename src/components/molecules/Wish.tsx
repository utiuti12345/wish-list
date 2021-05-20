import React from "react";
import {Image, StyleSheet,TouchableOpacity} from "react-native";
import {COLOR} from "../../constants/theme";
import WishImage from "../atoms/WishImage";

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
    removeWish:(id:string) => void;
}

export default function Wish(props:Props) {
    const {wish,gotoDetail,removeWish} = props;

    const onLongPress = React.useCallback(() => {
        removeWish(wish.id);
    },[removeWish]);

    const onPress = React.useCallback(() => {
        gotoDetail(wish);
    },[wish,gotoDetail]);

    return(
        <TouchableOpacity onLongPress={onLongPress} onPress={onPress}>
            <WishImage wish={wish}/>
            {/*<Image source={{ uri: wish.imageUrl }}*/}
            {/*       key={wish.id}*/}
            {/*       style={styles.image}*/}
            {/*/>*/}
        </TouchableOpacity>
    )
}
