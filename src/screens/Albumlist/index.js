import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { Container } from './styles';
import PlusButton from '../../components/PlusButton';
import ImageSelector from '../../store/selectors/PicturesByCategory';
import { RemovePicture } from '../../store/modules/pictures/actions';
import FlatListForImage from '../../components/Flatlist';
import { FontAwesome } from '@expo/vector-icons';

class AlbumList extends Component {
    state = {
        Images: [],
        EndCursor: null
    }

    static navigationOptions =  ({navigation}) => {

        return {
            title: navigation.state.params.category,
            headerRight: () => {    
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Camera', {
                            category: navigation.state.params.category
                        })}>
                            <FontAwesome name={"plus"} size={30} style={{marginRight: 10 }} />
                        </TouchableOpacity>
                    )
            }
        }
    }

    render() {
        return (
            <Container>
                  <FlatListForImage 
                        items={this.props.pictures}
                    />
            </Container>
        )
    }
}


const mapStateToProps = (state, props) => {
    return {
      pictures: ImageSelector(state.pictures, props.navigation.state.params.category)
    };
  };

  
const mapDispatchToProps = (dispatch) => ({
    RemovePicture: (id) => dispatch(RemovePicture(id))
});
  

export default connect(mapStateToProps, mapDispatchToProps)(AlbumList)