import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as Wish from '../modules/wish';

import {WishList} from '../components/pages';
import {getWishList} from "../selectors/wish";

export default function ConnectedWishList(){
    const wishList = useSelector(getWishList);

    return <WishList wishList={wishList}/>
}
