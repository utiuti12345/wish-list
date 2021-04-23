import React from "react";
import {Text} from "react-native";
import {WishList} from "../../../domain/models";
import {UiContext, UserContext} from "../../../contexts";
import firebase from "firebase";
import * as WishRepository from "../../../domain/repositories/wish";
import * as LocalStore from "../../../lib/local-store/index";
import {Status} from "../../../contexts/ui";

interface SetWishList{
    (wishList:WishList.Model):void;
}

interface Props{
    actions:{
        setWishList:SetWishList;
    }
}

function useUserInformation(setWishList:SetWishList){
    const {setUserState} = React.useContext(UserContext);
    const {setApplicationState} = React.useContext(UiContext);

    function initialFirebaseAuthentication(){
        return new Promise(((resolve, reject) =>{
            firebase.auth().onAuthStateChanged(user => {
                if (!user) {
                    return;
                }
                WishRepository.getAll(user.uid)
                    .then(wishList => {
                        console.log(wishList);
                        setWishList(wishList);
                        return;
                    })
                    .catch(e => {
                        console.log(e);
                        return;
                    });
            });
        }));
    }

    async function retrieveUserInformation(){
        try {
            const userInformation = await LocalStore.UserInformation.retrieve();

            if(!userInformation){
                setApplicationState(Status.UN_AUTHORIZED);
                return;
            }

            setUserState(userInformation);
            await initialFirebaseAuthentication();
        }catch (e) {
            console.log(e);
            return;
        }
    }

    return retrieveUserInformation;
}

export default function Loading(props:Props) {
    const {setWishList} = props.actions;
    const retrieveUserInformation = useUserInformation(setWishList);

    React.useEffect(() => {
        retrieveUserInformation();
    },[retrieveUserInformation]);

    return <Text>Loading</Text>
}
