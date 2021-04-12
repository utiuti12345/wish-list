import React from "react";
import { Input } from '@ui-kitten/components';

interface Props{
    label:string;
    value:string;
    onChangeText?:(str:string) => void;
    secureTextEntry?: boolean;
}

export default function TextField(props:Props){
    const {label,value,onChangeText = () => {},secureTextEntry} = props;

    return(
        <Input
            label={label}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
        />
    )
}
