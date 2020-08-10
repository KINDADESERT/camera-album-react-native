import GetRandomNumber from '../../../utils/GeneratingRandomNumbers';

export function AddPicture({ uri, category }){
    return {
        type: 'ADD_NEW_PICTURE',
        payload: {
            id: GetRandomNumber(),
            uri,
            category
        }
    }
}

export function RemovePicture(id){
    return {
        type: 'REMOVE_PICTURE',
        payload: {
            id
        }
    }
}
