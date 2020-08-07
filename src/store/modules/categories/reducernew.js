const INITIAL_STATE = [{
  category: 'TESTE',
  description: 'XXXXXXXXXX'
}]

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'ADD_NEW_CATEGORY': 
        return [
            action.payload,
          ...state
        ]   
      case 'REMOVE_CATEGORY': 
        return state.filter(({category}) => category !== action.category)
      case 'REMOVE_ALL': {
        return [] 
      }
      default:  
        return state;
    }
}

