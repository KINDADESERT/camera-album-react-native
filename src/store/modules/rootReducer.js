import { combineReducers } from 'redux';
import categoriesReducer from './categories/reducernew';
import picturesReducer from './pictures/reducernew';

export default combineReducers({
        categories: categoriesReducer,
        pictures: picturesReducer
})