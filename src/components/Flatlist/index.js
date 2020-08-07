import React from 'react'
import { View, Text, FlatList, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function FlatListForImage({items, onDelete}) {

  const AskToDelete = ({id}) => {
    Alert.alert(
      "Apagar",
      "Deseja excluir a foto?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Apagar", onPress: () => {
            onDelete(id)
        }}
      ],
      
      { cancelable: false }
    );
  }

    return (
        <View>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                   <View>
                      <TouchableOpacity onPress={AskToDelete}>
                         <Image 
                                style={{ height: 200, width: 200}}
                                source={{ uri: item.uri }}
                            />
                      </TouchableOpacity>         
                   </View>
                )}
            />
        </View>
    )
}

