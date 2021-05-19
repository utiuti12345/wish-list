import {Dispatch} from 'redux';

import {Wish,WishList} from '../domain/models';
import * as WishRepository from '../domain/repositories/wish';


import {add, remove, update} from '../modules/wish';

export function addAndSync(userId:string,newValues:Wish.Values){
    return async function(dispatch:Dispatch){
        const newWish = Wish.factory(newValues);
        dispatch(add(newWish));
        WishRepository.add(userId,newWish);
    };
}

export function updateAndSync(userId:string,id:string,newValues:Wish.Values){
    return async function(dispatch:Dispatch){
        dispatch(update(id,newValues));
        WishRepository.update(userId,id,newValues);
    }
}

export function removeAndSync(userId:string,id:string){
    return async function(dispatch:Dispatch){
        dispatch(remove(id));
        WishRepository.remove(userId,id);
    }
}
