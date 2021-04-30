import React, {useContext} from "react";
import {UserContext} from "../contexts";
import * as WishList from "../usecases/wish";
import {Wish} from "../domain/models";
import {Detail} from "../components/pages";
import {useDispatch} from "react-redux";

export default function ConnectedDetail(){
    const {userState} = useContext(UserContext);
    const dispatch = useDispatch();

    const actions = React.useMemo(() => {
        if (userState){
            return {
                updateWish(id:string,newValues:Wish.Values){
                    dispatch(WishList.updateAndSync(userState.id,id,newValues));
                }
            }
        }
    },[userState,dispatch]);

    if (!actions){
        return null;
    }

    return <Detail actions={actions}/>
}
