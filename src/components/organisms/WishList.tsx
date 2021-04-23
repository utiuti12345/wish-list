import React from "react";
import {Wish} from "../molecules";
import {FlatList} from "react-native";

import {State} from '../molecules/Wish';

export type ArrayState = Array<State>;

interface Props {
    wishList:ArrayState;
}

export default function WishList(props:Props) {
    const {wishList} = props;
    return(
        <FlatList
            data={wishList}
            numColumns={2}
            renderItem={ ({ item, index }) => (<Wish wish={item}/>
            )}
        />
    )
}
