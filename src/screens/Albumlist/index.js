import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, Alert, View} from 'react-native';
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
        const { category, PicturesLength } = navigation.state.params
        return {
            title: category,
            headerRight: () => {    
                    return (
                        <TouchableOpacity onPress={() => {
                            if(PicturesLength > 9){
                                Alert.alert(
                                    'Você atingiu o limite',
                                    'Máximo 10 fotos por album.'
                                ) 
                             }else{
                                 navigation.navigate('Camera', {
                                 category: category
                             })}   
                         }}>
                            <FontAwesome name={"plus"} size={30} style={{marginRight: 10 }} />
                        </TouchableOpacity>
                    )
            }
        }
    }

    
    componentDidMount() {
        const {navigation} = this.props;
          
        navigation.setParams({
              PicturesLength: this.props.pictures.length
        })
    }

    render() {
        return (
            <Container>{
                this.props.pictures.length === 0 ? (
                    <View>
                        <PlusButton 
                            size={70}
                            text="Adicionar foto"
                            styles={{alignItems: 'center'}}
                            onPress={() => {
                                this.props.navigation.navigate('Camera', {
                                    category: this.props.navigation.state.params.category })
                            }}
                        />
                    </View>
                ) : (
                    <FlatListForImage 
                        items={this.props.pictures}
                    />
                )
            }
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