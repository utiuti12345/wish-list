import React from "react";
import {Wish} from "../molecules";
import {FlatList, View} from "react-native";
import {GotoDetail, State} from '../molecules/Wish';

export type ArrayState = Array<State>;

interface Props {
    wishList: ArrayState;
    gotoDetail: GotoDetail;
    removeWish: (id: string) => void;
}

export default function WishList(props: Props) {
    const {wishList, gotoDetail, removeWish} = props;
    return (
        <FlatList
            style={{flex: 1}}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            data={wishList}
            numColumns={2}
            renderItem={({item, index}) => (
                <Wish wish={item} gotoDetail={gotoDetail} removeWish={removeWish}/>
            )}
        />
    )
}
