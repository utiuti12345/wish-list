import React from "react";
import {Wish} from "../molecules";
import {FlatList} from "react-native";

import {State} from '../molecules/Wish';

interface Props {
    wishList:Array<State>
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
