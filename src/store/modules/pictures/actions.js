import { v4 as uuid } from 'uuid';

export function AddPicture({ uri, category }){
    return {
        type: 'ADD_NEW_PICTURE',
        payload: {
            id: uuid(),
            uri,
            category
        }
    }
}

export function RemovePicture({ id }){
    return {
        type: 'REMOVE_PICTURE',
        payload: {
            id
        }
    }
}
