import {Wish,WishList} from "../domain/models";

export function createInitialState():WishList.Model{
    return WishList.factory();
}

export type State = ReturnType<typeof createInitialState>;

export const SET = 'wish/set' as const;
export const ADD = 'wish/add' as const;
export const UPDATE = 'wish/update' as const;

export function set(wishList:WishList.Model) {
    return{
        type:SET,
        payload:{
            wishList,
        }
    }
}

export function add(wish:Wish.Model) {
    return{
        type:ADD,
        payload:{
            wish,
        }
    }
}

export function update(id:string,updateValues:Wish.Values) {
    return{
        type:UPDATE,
        payload:{
            id,
            updateValues
        }
    }
}

export type Action = | Readonly<ReturnType<typeof set>>
                    | Readonly<ReturnType<typeof add>>
                    | Readonly<ReturnType<typeof update>>

export default function reducer(state= createInitialState(),action:Action){
    switch (action.type) {
        case SET:
            return action.payload.wishList;
        case ADD:
            return WishList.add(state,action.payload.wish);
        case UPDATE:
            return WishList.update(state,action.payload.id,action.payload.updateValues);
        default:
            return state;
    }
}
