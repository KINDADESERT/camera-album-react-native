import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import Dashboard from './screens/Dashboard';
import Category from './screens/Category';
import AlbumList from './screens/Albumlist';
import Camera from './screens/Camera';

const mainNavigation = createStackNavigator({
        Dashboard: Dashboard,
        Category: Category,
        AlbumList: AlbumList,
        Camera: {
            screen: Camera,
            navigationOptions: {
                title: 'Câmera',
                headerBackTitle: 'Voltar'
            }
        }  
    }, {
        initialRouteName: 'Dashboard',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#998f7f',
                height: 75
            },
            headerTitleStyle: {
                alignSelf: 'center',
                justifyContent: 'center',
                fontSize: 20
            },
            headerTintColor: 'white'
        }
    },
);

export default createAppContainer(mainNavigation)