import React from 'react'
import { View, Text, FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function FlatListForItem({items, onClick, ToNavigate}) {
    console.log(items)
    const onHandlingClick = ({category}) => {
        onClick(category)
    }

    const navigateTo = ({category}) => {
        ToNavigate(category)
    }
    
    return (
        <View style={{flex: 1, borderColor: 'red', borderWidth: 3, width: '100%' }}>
            <FlatList
                data={items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                   <View>
                        <TouchableOpacity onPress={navigateTo(item)}>
                            <Text>{item.category}</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={onHandlingClick(item)}>
                            <Text>Apagar</Text>
                        </TouchableOpacity>
                   </View>
                )}
            />
        </View>
    )
}

