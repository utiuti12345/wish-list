import React from "react";
import {ViewStyle} from 'react-native';
import { Icon as UiKittenIcon } from '@ui-kitten/components';

interface Props{
    style?: ViewStyle;
    name:string;
    fill:string;
}

export default function Icon(props:Props){
    const {style,name,fill} = props;
    return <UiKittenIcon style={style} fill={fill} name={name}/>
}
