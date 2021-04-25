import {Dispatch} from 'redux';

import {Wish} from '../domain/models';
import * as WishRepository from '../domain/repositories/wish';

import {add} from '../modules/wish';
import {AppState} from '../modules';

export function addAndSync(userId:string,newValues:Wish.Values){
    return async function(dispatch:Dispatch){
        const newWish = Wish.factory(newValues);
        dispatch(add(newWish));
        WishRepository.add(userId,newWish);
    };
}
