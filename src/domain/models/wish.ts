import {v4 as generatedUuid} from "react-native-uuid";
import {assertIsDefined} from "../../lib/assert";

export interface Model {
    readonly id:string;
    readonly title: string;
    readonly url?:string;
    readonly imageUrl?:string;
    readonly detail?: string;
    readonly price?: string;
    readonly createdAt:string;
    readonly updateAt:string;
}

export interface Values {
    readonly title:string;
    readonly url?:string;
    readonly imageUrl?:string;
    readonly detail?: string;
    readonly price?: string;
}

export function factory(wish:Values):Model {
    console.log(wish);
    assertIsDefined(wish.title);

    const now = new Date().toISOString();

    return{
        id:generatedUuid(),
        title:wish.title,
        url:wish.url,
        imageUrl:wish.imageUrl,
        detail:wish.detail,
        price:wish.price,
        createdAt:now,
        updateAt:now,
    }
}

export function change(wish:Model,newValue:Values):Model {
    assertIsDefined(newValue.title);

    const now = new Date().toISOString();
    return {
        ...wish,
        ...newValue,
        updateAt:now,
    }
}
