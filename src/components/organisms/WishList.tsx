import React from "react";
import {Wish} from "../molecules";
import {FlatList} from "react-native";

interface Props {
    list:number[]
}

export default function WishList(props:Props) {
    const {list} = props;
    return(
        <FlatList
            data={list}
            numColumns={2}
            renderItem={ ({ item, index }) => (<Wish index={index} uri="https://source.unsplash.com/random'" />
            )}
        />
    )
}
