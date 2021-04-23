import React from "react";
import {useDispatch} from "react-redux";
import {WishList} from "../domain/models";
import {set} from "../modules/wish";
import {SignIn} from "../components/pages";

export default function ConnectedSignIn(){
    const dispatch = useDispatch();
    const actions = React.useMemo(() => ({
        setWishList(newValues:WishList.Model){
            dispatch(set(newValues));
        },
    }),[dispatch]);

    return <SignIn actions={actions}/>
}
