import React from "react";
import {SafeAreaView, Text} from "react-native";
import {RouteProp, useRoute} from "@react-navigation/native";

interface Params{
    id:string;
    title:string;
    imageUrl?:string;
}

export default function Detail() {
    const {params} = useRoute<RouteProp<Record<string, Params>, string>>();
    const {title} = params;

    return (
        <SafeAreaView>
            <Text>{title}</Text>
        </SafeAreaView>
    )
}
