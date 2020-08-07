import produce from 'immer';

const INITIAL_STATE = []

export default function pictures(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case 'ADD_NEW_PICTURES': {
        draft.pictures.unshift(action.payload)
        break;
      }
      case 'REMOVE_PICTURE': { 
        draft.pictures = draft.pictures.filter(
            picture => picture.id !== action.payload.id
        )
        break;
      }
      case 'REMOVE_CATEGORY': {
          draft.pictures = draft.pictures.filter(
              picture => picture.category !== action.payload.category
          )
        break; 
      }
      default:
        return state;
    }
  });
}