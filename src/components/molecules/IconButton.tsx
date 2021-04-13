import React from "react";
import {Pressable, ViewStyle} from "react-native";
import {Icon} from "../atoms";

interface Props{
    style?: ViewStyle;
    name:string;
    fill:string;
    onPress:() => void;
}

export default function IconButton(props:Props){
    const {style,name,fill,onPress} = props;

    return(
        <Pressable onPress={onPress}>
            <Icon name={name} fill={fill} style={style}/>
        </Pressable>
    )
}
