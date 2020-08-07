import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { Container } from './styles';
import PlusButton from '../../components/PlusButton';
import ImageSelector from '../../store/selectors/PicturesByCategory';
import {RemovePicture} from '../../store/modules/pictures/actions';
import FlatListForImage from '../../components/Flatlist';
import { FontAwesome } from '@expo/vector-icons';

class AlbumList extends Component {
    state = {
        Images: [],
        EndCursor: null
    }

    static navigationOptions =  ({navigation}) => {

        return {
            headerTitleStyle: { alignSelf: 'center', marginLeft: 50},
            title: navigation.state.params.category,
            headerRight: () => {    
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
                            <FontAwesome name={"plus"} size={30} style={{marginRight: 10 }} />
                        </TouchableOpacity>
                    )
            }
        }
    }


    onDelete(id){
        this.props.RemovePicture(id)
    }
    
    render() {
        return (
            <Container>

                {this.props.pictures.length === 0 ? (
                    <PlusButton 
                        size={50} 
                        name="plus" 
                        styles={{alignItems: 'center'}}
                        text="Adicionar Imagem"
                        onPress={() => this.props.navigation.navigate('Camera')}
                    />
                ) : (
                    <FlatListForImage 
                        items={this.props.pictures}
                        onDelete={this.onDelete}
                    />
                )}  

            </Container>
        )
    }
}


const mapStateToProps = (state, props) => {
    return {
      pictures: ImageSelector(state.pictures, props.category)
    };
  };

  
const mapDispatchToProps = (dispatch) => ({
    RemovePicture: (id) => dispatch(RemovePicture(id))
});
  

export default connect(mapStateToProps, mapDispatchToProps)(AlbumList)