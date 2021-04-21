import React, {useContext} from "react";
import {UserContext} from "../contexts";
import {useDispatch} from "react-redux";
import * as WishList from "../usecases/wish";
import {Wish} from "../domain/models";
import {Input} from "../components/pages";

export default function ConnectedInput(){
    const {userState} = useContext(UserContext);

    const dispatch = useDispatch();
    const actions = React.useMemo(() =>{
        if (userState){
            return {
                addWish(newValues:Wish.Values){
                    WishList.addAndSync(userState.id,newValues);
                }
            }
        }
    },[userState,dispatch]);

    if(!actions){
        return null;
    }

    return <Input actions={actions} />
}
