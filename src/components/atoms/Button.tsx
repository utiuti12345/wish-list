import React from "react";
import { Button as UiKittenButton } from '@ui-kitten/components';
import {StyleSheet, ViewStyle} from "react-native";

const styles = StyleSheet.create({
    button: {
        margin: 2,
    },
});

interface Props{
    onPress:() => void;
    label:string;
    style?:ViewStyle;
}

export default function Button(props:Props){
    const {onPress,style,label} = props;

    return(
        <UiKittenButton
            style={style}
        >
            {label}
        </UiKittenButton>
    )
}
