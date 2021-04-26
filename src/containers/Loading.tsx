import React from "react";
import {useDispatch} from "react-redux";
import {WishList} from "../domain/models";
import {set} from "../modules/wish";
import {Loading} from "../components/pages";

export default function ConnectedLoading(){
    const dispatch = useDispatch();
    const actions = React.useMemo(() => ({
        setWishList(newValue:WishList.Model){
            dispatch(set(newValue));
        }
    }),[dispatch]);

    return <Loading actions={actions}/>
}
