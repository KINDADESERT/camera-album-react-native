export function AddCategory({ category, description }){
    return {
        type: 'ADD_NEW_CATEGORY',
        payload: {
            category,
            description
        }
    }
}

export function RemoveCategory(category){
    return {
        type: 'REMOVE_CATEGORY',
        payload: {
            category
        }
    }
}

export function RemoveAll(){
    return {
        type: 'REMOVE_ALL',
    }
}
