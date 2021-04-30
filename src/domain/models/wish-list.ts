import * as Wish from './wish';

export interface Model {
    [id:string]:Wish.Model;
}

export function factory(newValues?:Wish.Values[]):Model {
    if (!newValues){
        return {};
    }

    return newValues.reduce<Model>((result,newValue) => {
        const newWish = Wish.factory(newValue);
        result[newWish.id] = newWish;
        return result;
    },{});
}

export function add(wishList:Model,newWish:Wish.Model):Model{
    return {
        ...wishList,
        [newWish.id]:newWish,
    }
}

export function update(wishList:Model,id:string,newValue:Wish.Values){
    return {
        ...wishList,
        [id]:Wish.update(wishList[id],newValue)
    }
}
