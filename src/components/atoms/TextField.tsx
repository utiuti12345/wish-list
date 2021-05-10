import React from "react";
import { Input } from '@ui-kitten/components';
import {ViewStyle} from "react-native";

interface Props{
    label?:string;
    value:string;
    placeholder?:string;
    onChangeText?:(str:string) => void;
    style?:ViewStyle;
    secureTextEntry?: boolean;
    autoCompleteType?:
        | 'off'
        | 'username'
        | 'password'
        | 'email'
        | 'name'
        | 'tel'
        | 'street-address'
        | 'postal-code'
        | 'cc-number'
        | 'cc-exp'
        | 'cc-exp-month'
        | 'cc-exp-year';
    keyboardType?:
        | 'default'
        | 'email-address'
        | 'numeric'
        | 'phone-pad'
        | 'number-pad'
        | 'decimal-pad';
}

export default function TextField(props:Props){
    const {label,value,placeholder,onChangeText = () => {},style,secureTextEntry,autoCompleteType,keyboardType} = props;

    return(
        <Input
            style={style}
            label={label}
            value={value}
            placeholder={placeholder}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            autoCompleteType={autoCompleteType}
            keyboardType={keyboardType}
        />
    )
}
