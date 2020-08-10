const INITIAL_STATE = []

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'ADD_NEW_PICTURE': 
        return [
            action.payload,
            ...state
        ] 
      case 'REMOVE_PICTURE': 
        return state.filter(({ id }) => id !== action.payload.id)
      case 'REMOVE_CATEGORY': 
        return state.filter(({category}) => category !== action.payload.category)
      default:
        return state;
    }
}
  