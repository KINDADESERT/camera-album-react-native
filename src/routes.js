import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import Dashboard from './screens/Dashboard';
import Category from './screens/Category';
import AlbumList from './screens/Albumlist';
import Camera from './screens/Camera';

const mainNavigation = createStackNavigator({
        Dashboard: Dashboard,
        Category: Category,
        AlbumList: AlbumList,
        Camera: Camera  
    }, {
        initialRouteName: 'Dashboard'
    },
);

export default createAppContainer(mainNavigation)