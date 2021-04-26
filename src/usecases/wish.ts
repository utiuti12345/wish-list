import {Dispatch} from 'redux';

import {Wish} from '../domain/models';
import * as WishRepository from '../domain/repositories/wish';

import {add} from '../modules/wish';

export function addAndSync(userId:string,newValues:Wish.Values){
    console.log(userId);
    console.log(newValues);
    return async function(dispatch:Dispatch){
        const newWish = Wish.factory(newValues);
        dispatch(add(newWish));
        WishRepository.add(userId,newWish);
    };
}
