import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {WishList as Wishlist} from '../components/pages';
import {getWishList} from "../selectors/wish";
import {UserContext} from "../contexts";
import * as WishList from "../usecases/wish";

export default function ConnectedWishList(){
    const {userState} = React.useContext(UserContext);
    const wishList = useSelector(getWishList);

    const dispatch = useDispatch();
    const actions = React.useMemo(() => {
        if(userState){
            return{
                removeWish(id:string){
                    dispatch(WishList.removeAndSync(userState.id,id));
                }
            }
        }
    },[userState,dispatch]);

    if(!actions){
        return null;
    }

    return <Wishlist wishList={wishList} actions={actions}/>
}
