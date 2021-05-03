import React from "react";
import {Wish} from "../molecules";
import {FlatList} from "react-native";
import {GotoDetail, State} from '../molecules/Wish';

export type ArrayState = Array<State>;

interface Props {
    wishList:ArrayState;
    gotoDetail:GotoDetail;
}

export default function WishList(props:Props) {
    const {wishList,gotoDetail} = props;
    return(
        <FlatList
            data={wishList}
            numColumns={2}
            renderItem={ ({ item, index }) => (<Wish wish={item} gotoDetail={gotoDetail}/>
            )}
        />
    )
}
