import React, { Component } from 'react';
import { TouchableOpacity, Text, View , StyleSheet, FlatList, Alert } from 'react-native';
import { connect } from 'react-redux';
import {Container} from './styles';
import PlusButton from '../../components/PlusButton'
import { RemoveCategory } from '../../store/modules/categories/actions';
import { RemovePicture } from '../../store/modules/pictures/actions';
import { FontAwesome } from '@expo/vector-icons';


class Dashboard extends Component {
     state = {
        loading: false,
        Images: [],
    }

    static navigationOptions =  ({navigation}) => {
        return {
            title: 'Início',
            headerStyle:{
                backgroundColor: '#998f7f'
            },
            headerTitleStyle: {
                alignSelf: 'center',
                justifyContent: 'center'
            }, 
            headerRight: () => {
                return (
                    <TouchableOpacity onPress={navigation.getParam('onPressCreateCategory')}>
                        <FontAwesome name="plus" size={30} style={{marginRight: 10}} />
                    </TouchableOpacity>
                )
            }
        } 
    }

    NavigationLogicCategory = () => {
        if(this.props.categories.length === 0){
            Alert.alert(
                'Você atingiu o limite',
                'Máximo de albums por usuário é 5.'
            )
        }else{
            this.props.navigation.navigate('Category')
        }
    }

    onClickToRemove = (category) => {
        this.props.RemoveCategory(category)
    }
    
    onClickToNavigate = (category) => {
        this.props.navigation.navigate('AlbumList', {
            category: category 
        })
    }

    componentDidMount(){
        this.props.navigation.setParams({
            onPressCreateCategory: this.NavigationLogicCategory
        })
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
            {
                this.props.categories.length === 0 ? (
                    <View>
                        <PlusButton 
                            size={70}
                            text="Adicionar categoria"
                            styles={{alignItems: 'center'}}
                            onPress={() => this.props.navigation.navigate('Category')}
                        />
                    </View>
                ) : (
                    <View style={{height: 270}}>
                        <FlatList
                            data={this.props.categories}
                            keyExtractor={(item, index) => {
                                return item.category
                              }}
                            renderItem={this.renderItem}
                        />
                    </View>         
                )
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
        backgroundColor: '#b2a795',
        padding: 7,
        margin: 5,
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
  
