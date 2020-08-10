import React, { Component } from 'react';
import { connect } from 'react-redux';
import CameraRoll from "@react-native-community/cameraroll";
import {Container} from './styles';
import { RemoveCategory } from '../../store/modules/categories/actions';
import { RemovePicture } from '../../store/modules/pictures/actions';
import { TouchableOpacity, Text, View , StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import GetRandomNumber from '../../utils/GeneratingRandomNumbers';


class Dashboard extends Component {
     state = {
        loading: false,
        Images: [],
    }

    static navigationOptions =  ({navigation}) => {

        return {
            title: 'Início',
            headerRight: () => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate('Category')}>
                        <FontAwesome name="plus" size={30} style={{marginRight: 10}} />
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
        console.log(this.props)
        // if(this.props.categories.length !== 0 && this.props.pictures !== 0){
        //    await this.getImages()
        //    this.logicCondition()
        // }
    }

    renderItem = ({ item }) => {
        return(
            <TouchableOpacity onPress={() => this.onClickToNavigate(item.category)} >  
                <View style={styles.ViewCategory}>              
                       <Text style={styles.TextNavigate}>{item.category}</Text>

                       <TouchableOpacity onPress={() => this.onClickToRemove(item.category)}>
                           <FontAwesome name="times" size={30} style={{color: 'red'}} />
                       </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }


    render() {
        return (
            <Container>
                <View style={{
                        height: 270,
                     }}
                >
                    <FlatList
                            data={this.props.categories}
                            keyExtractor={(item, index) => {
                                return item.category
                              }}
                            renderItem={this.renderItem}
                    />
                </View>         
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
        padding: 7,
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: 2
    },
    TextNavigate: {
        color: '#FFFFFF',
        fontSize: 25,
        marginLeft: 15
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
  
