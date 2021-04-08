import {AppState} from '../modules';
import {createSelector} from 'reselect';

import * as Domain from '../domain/models';

function selectWishList(state:AppState) {
    return state.wishList;
}

export const getArray = createSelector([selectWishList],wishList =>
    Object.values(wishList).map(wish =>({
        id:wish.id,
        title:wish.title,
        imageUrl:wish.imageUrl,
        detail:wish.detail,
        price:wish.price,
        createdAt:new Date(wish.createdAt).getTime(),
        updateAt:new Date(wish.updateAt).getTime(),
    })),
);

export const getWishList = createSelector([getArray],wishList =>
    wishList.sort((a,b) => b.createdAt - a.createdAt));
