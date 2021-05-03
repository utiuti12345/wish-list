import React from "react";
import {Image, StyleSheet,TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {DETAIL} from "../../constants/path";

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
    const {navigate} = useNavigation();

    const onPress = React.useCallback(() => {
        gotoDetail(wish);
    },[wish,gotoDetail]);

    return(
        <TouchableOpacity onPress={onPress}>
            <Image source={{ uri: wish.imageUrl }}
                   key={wish.id}
                   style={styles.image}
            />
        </TouchableOpacity>
    )
}
