import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { Container, Form, FormInput, SubmitButton } from './styles';
import { AddCategory } from '../../store/modules/categories/actions';

class Category extends Component {
    state = {
        category: '',
        description: ''
    }

    static navigationOptions = {
        headerTitleStyle: { alignSelf: 'center', marginLeft: 50},
        title: 'Categoria'
    }

    handleSubmit = () => {
        if(this.state.category.length < 5 || this.state.description.length > 15){     
            Alert.alert(
                'Preencha corretamente',
                'Lembre-se o nome do album precisa ser menor que 5 e a descrição precisa ter pelo menos 15 caracteres.'
            )
            
        }else{
            const album = {
                category: this.state.category,
                description: this.state.description 
            }

            this.props.AddCategory(album)

            this.props.navigation.navigate('Dashboard')
        }   
    }

    render() {
        return (
            <Container>
                <Form>
                    <FormInput
                        autoCorrect={false}
                        value={this.state.category}
                        onChangeText={(category) => this.setState({category: category})}
                        placeholder="Digite o nome do album"
                    />
                    <FormInput
                        autoCorrect={false}
                        value={this.state.description}
                        onChangeText={(description) => this.setState({description: description})}
                        placeholder="Descrição"
                    />
                    <SubmitButton onPress={this.handleSubmit}>Criar Album</SubmitButton>
                </Form>
            </Container>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    AddCategory: (album) => dispatch(AddCategory(album))
});
  
  
export default connect(undefined, mapDispatchToProps)(Category)