import React, { Component } from 'react';
import { connect } from 'react-redux';
import CameraRoll from "@react-native-community/cameraroll";
import {Container} from './styles';
import PlusButton from '../../components/PlusButton';
import FlatListItem from '../../components/FlatListCategory';
import { RemoveCategory } from '../../store/modules/categories/actions';
import { RemovePicture } from '../../store/modules/pictures/actions';
import { TouchableOpacity, Text, View , StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

class Dashboard extends Component {
     state = {
        loading: false,
        Images: [],
    }

            
    static navigationOptions =  ({navigation}) => {

        return {
            headerTitleStyle: { alignSelf: 'center'},
            title: 'Home',
            headerRight: () => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate('Category')}>
                        <FontAwesome name={"plus"} size={30} style={{marginRight: 10}} />
                    </TouchableOpacity>
                )
            }
        } 
    }

    onClickToRemove = (category) => {
        console.log('onClickToRemove PRESSED')
        this.props.RemoveCategory(category)
    }
    
    onClickToNavigate = (category) => {
        console.log('onClickToNavigate PRESSED')

        this.props.navigation.navigate('AlbumList', {
            category: category 
        })
    }

    getImages = async () => {

        const results = await CameraRoll.getPhotos({
            assetType: "Photos",
            first: 300
        })

        const { edges } = results

        const loadedImages = edges.map(item => item.node.image)
        
        this.setState({Images: loadedImages})

    }

    logicCondition = () => {
        const GrabbingUriFromTheSistem = this.state.Images.map(x => x.uri)

        const ObjectsThatNeedToBeDeleted = this.props.pictures.filter((picture) => {
            return GrabbingUriFromTheSistem.indexOf(picture.uri) === -1 
        })

        ObjectsThatNeedToBeDeleted.map((picture) => {
            this.props.RemovePicture(picture.id)
        })
    }

    async componentDidMount(){  
        if(this.props.categories.length !== 0 && this.props.pictures !== 0){
           await this.getImages()
           this.logicCondition()
        }

    }

    render() {
        const { TextNavigate, ViewCategory , TextRemove} = styles
        const { categories } = this.props

        return (
            <Container>

                  {
                      categories.map((item)=> {
                          return (
                              <View key={item.category} style={ViewCategory}>
                                 <Text onPress={() => this.onClickToNavigate(item.category)} style={TextNavigate}>{item.category}</Text>
                                 <Text onPress={() => this.onClickToRemove(item.category)} style={TextRemove}>Apagar</Text>
                              </View>
                          )
                      })
                  }

            </Container>
        )
    }
}


const styles =  StyleSheet.create({
    ViewCategory: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#303030',
        padding: 7
    },
    TextNavigate: {
        color: '#FFFFFF',
        fontSize: 25
    },
    TextRemove:{
        color: '#FFFFFF',
        fontSize: 15
    }
})

const mapStateToProps = (state) => {
    return {
      categories: state.categories,
      pictures: state.pictures
    };
  };

  
const mapDispatchToProps = (dispatch) => ({
    RemoveCategory: (text) => dispatch(RemoveCategory(text)),
    RemovePicture: (id) => dispatch(RemovePicture(id))
});
  
  

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
  
