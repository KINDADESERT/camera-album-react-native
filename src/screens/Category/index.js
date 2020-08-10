import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, TextInput } from 'react-native';
import { Container, Form, FormInput, SubmitButton } from './styles';
import { AddCategory } from '../../store/modules/categories/actions';

class Category extends Component {
    state = {
        category: '',
        description: '',
    }

    DescriptionInput = React.createRef()

    static navigationOptions = {
        title: 'Categoria'
    }

    focusNextInput = () => {
        this.DescriptionInput.current.focus()
    }

    capitalizeTxt = (txt) => {
        return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
    }

    handleSubmit = () => {
        if(this.state.category.length < 5){     
            Alert.alert(
                'Preencha corretamente',
                'Nome do album precisa de no minímo 5 caracteres.'
            )
        }
        else if(this.props.categories.length > 4){
            Alert.alert(
                'Você atingiu o limite',
                'Máximo de album por usuário é 5.'
            )

            this.props.navigation.navigate('Dashboard')
        }else{
            const album = {
                category: this.capitalizeTxt(this.state.category),
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
                        maxLength={20}
                        value={this.state.category}
                        onChangeText={(category) => this.setState({category: category})}
                        placeholder="Digite o nome do album"
                        returnKeyType="next"
                        onSubmitEditing={this.focusNextInput}
                    />

                    <TextInput 
                        multiline={true}
                        numberOfLines={4}
                        autoCorrect={false}
                        value={this.state.description}
                        onChangeText={(description) => this.setState({description: description})}
                        placeholder="Descrição(opcional)"
                        maxLength={100}
                        ref={this.DescriptionInput}
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        style={{
                            fontSize: 20,
                            height: 100,
                            textAlign: "center",
                            padding: 5,
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                            borderRadius: 4
                        }}
                        returnKeyType="send"
                        onSubmitEditing={this.handleSubmit}
                    />

                    <SubmitButton onPress={this.handleSubmit}>Criar Album</SubmitButton>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      categories: state.categories
    };
  };


const mapDispatchToProps = (dispatch) => ({
    AddCategory: (album) => dispatch(AddCategory(album))
});
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Category)