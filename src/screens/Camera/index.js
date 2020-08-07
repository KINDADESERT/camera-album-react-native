import React, { useState, useEffect, useRef } from 'react';
import { Text, View, SafeAreaView, Modal, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AddPicture } from '../../store/modules/pictures/actions';

function CameraComponent({ navigation }){
    const camRef = useRef(null)
    const [hasPermission, setHasPermission] = useState(null)
    const [hasPermissionToSave, setHasPermissionToSave] = useState(null)
    const [capturedPicture, setCapturedPicture] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [open, setOpen] = useState(false)

    const GettingThePermissionCamera =  async () => {
        
        const { status } = await Camera.requestPermissionsAsync()
        setHasPermission(status === 'granted')

        const Permission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        setHasPermissionToSave(Permission.status === 'granted')
    }

    const takePicture = async () => {
        if(camRef){
            const data = await camRef.current.takePictureAsync();
            setCapturedPicture(data.uri);
            setOpen(true);
        }
    }

    const SavePicture = async () => {   
        const asset = await MediaLibrary.createAssetAsync(capturedPicture)
        .then(() => {
            console.log('Worked')

            navigation.goBack()
        }).catch((error) => {
            console.log('Erro ao salvar')
        })
    }

    useEffect(() => {
        async function Permissions(){
           await GettingThePermissionCamera()
        }

        Permissions()
    }, [])


    if (hasPermission === null) {
        return <View />;
      }
      
    if (hasPermission === false) {
      return <Text>Sem acesso a camera</Text>;
    }

        return(
            <SafeAreaView style={{ flex: 1 }}>

                <Camera 
                    style={{ flex: 1 }} 
                    type={type}
                    ref={camRef}
                    >
                    <View
                        style={{
                          flex: 1,
                          backgroundColor: 'transparent',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                    }}>

                        <TouchableOpacity
                          style={{
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            marginTop: 5
                          }}

                          onPress={() => {
                            setType(
                              type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                            );
                          }}>

                            <FontAwesome name="rotate-right" size={25} />
                            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Trocar </Text>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={takePicture}>
                                <FontAwesome name="camera" size={50} color="blue" />
                        </TouchableOpacity>
                  </View>
                </Camera>
            

                {capturedPicture &&
                    <Modal 
                        animationType="slide"
                        transparent={false}
                        visible={open}
                    >
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }}>

                        <View style={{ margin: 10, flexDirection: 'row' }}>
                            <TouchableOpacity style={{ margin: 10}} onPress={() => setOpen(false)}>
                                <FontAwesome name="window-close" size={30} color="#121212"/>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={{ margin: 10}} onPress={SavePicture}>
                                <FontAwesome name="upload" size={30} color="#121212"/>
                            </TouchableOpacity>
                        </View>
                           
                            <Image 
                                style={{ width:'100%', flex: 1, borderRadius: 5 }}
                                source={{ uri: capturedPicture }}
                            />

                        </View>
                    </Modal>
                }

          </SafeAreaView>
    )
}

const mapDispatchToProps = (dispatch) => ({
    AddPicture: (picture) => dispatch(AddPicture(picture))
});
  

export default connect(undefined, mapDispatchToProps)(CameraComponent)