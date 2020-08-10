import React from 'react'
import { View, Text, FlatList, Image, Alert, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { RemovePicture } from '../../store/modules/pictures/actions';

function FlatListForImage({items, RemovePicture}) {

  const AskToDelete = (id) => {
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
            RemovePicture(id)
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
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                      <TouchableOpacity onPress={() => AskToDelete(item.id)}>
                        <View style={styles.ViewEachImage}>
                          <Image 
                                  style={styles.ImageStyle}
                                  source={{ uri: item.uri }}
                            />
                        </View>
                      </TouchableOpacity>        
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    ViewEachImage: {
      margin: 5
    },
    ImageStyle: {
      height: 200, 
      width: 200,
      borderRadius: 5
    }
})

const mapDispatchToProps = (dispatch) => ({
  RemovePicture: (id) => dispatch(RemovePicture(id))
});

export default connect(undefined, mapDispatchToProps)(FlatListForImage)