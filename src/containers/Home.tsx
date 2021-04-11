import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as Wish from '../modules/wish';

import {Home} from '../components/pages';
import {getWishList} from "../selectors/wish";

export default function ConnectedHome(){
    const wishList = useSelector(getWishList);

    return <Home wishList={wishList}/>
}
