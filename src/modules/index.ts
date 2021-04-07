import {combineReducers} from 'redux';

import * as WishList from './wish';

export function createInitialState(){
    return{
        wishList: WishList.createInitialState()
    }
}

export type AppState = Readonly<ReturnType<typeof createInitialState>>;

export default combineReducers<AppState>({
    wishList: WishList.default,
});
