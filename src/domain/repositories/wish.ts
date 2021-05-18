import firestore from '../../lib/firebase/firestore';
import {Wish,WishList} from '../models';

export function getAll(userId:string){
    return firestore(userId)
        .get()
        .then(querySnapshot => {
            const wishList = querySnapshot.docs.reduce((result:WishList.Model,doc) =>{
                result[doc.id] = doc.data() as Wish.Model;
                return result
            },{});
            return wishList;
        })
}

export function add(userId:string,newWish:Wish.Model) {
    firestore(userId)
        .doc(newWish.id)
        .set(newWish)
        .catch(e =>{
            throw e;
        });
}

export function update(userId:string,id:string, newWish:Wish.Values){
    firestore(userId)
        .doc(id)
        .update(newWish)
        .catch(e => {
           throw e;
        });
}

export function remove(userId:string,id:string){
    firestore(userId)
        .doc(id)
        .delete()
        .catch(e => {
            throw e;
        })
}
