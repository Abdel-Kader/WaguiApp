import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet }  from 'react-native';
import colors from '@modules/colors'
import InputFieldBordered from '@components/forms/InputFieldBordered';
import RoundedButton from '@components/buttons/RoundedButton';
import axios from 'axios'
import { agri_api } from '../../../services/apiUrl'
import Loader from '@components/Loader'
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';

export default class AddQuestion extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            question: '',
            id_agri: '',
            loadingVisible: false,
        }
        
        this._addQuestionClick = this._addQuestionClick.bind(this);
        this.toggleLogInButtonState = this.toggleLogInButtonState.bind(this);
      
    }
    static navigationOptions = ({ navigation }) =>({
        title:"J'ai une question",
        headerStyle: 
        {
            backgroundColor: colors.green1,
        },
        headerTintColor: '#fff'
    });

    componentDidMount= async()=> {
        try {
            
            const id = await AsyncStorage.getItem('Id');
            if (id !== null) {
                this.setState({id_agri: id})
              }
          } catch (error) {
            console.log("....."+error)
          }
    }
    _addQuestionClick(question)
    { 
        NetInfo.fetch().then(state => {
        //alert("Connection type", state.type);
        if(state.isConnected)
        {
            this.setState({ loadingVisible: true});
            const navigation = this.props.navigation;
            axios.post(agri_api+ "newQuestion",{id_agri :this.state.id_agri,question: question})
            .then(json =>{
                if(json.data.message == 'Yess')
                {
                    this.setState({ loadingVisible: false, question: ''});
                    alert("Votre question a été ajouté avec succès");
                }
                else
                {
                    this.setState({ loadingVisible: false});
                    alert(json.data.message);
                }
            })
            .catch(error =>{console.error(error.message)})
        }
        else
        {
            alert("Vous êtes actuellement hors connexion veuillez vérifier votre connection puis reessayer !")
        }
       
        });

    }

    toggleLogInButtonState() {
        const { question } = this.state;
        if(question) {
            return false
        }
        return true
    }


    render()
    {
        const { loadingVisible, question } = this.state;
        return (
                <ImageBackground
                    style={style.imgBack}
                    source={require("@assets/images/question_ag.jpg")}>
                        <View style={style.container}>
                            <Text style={{textAlign: 'center', fontSize: 25, fontWeight: '700', color: colors.green1, marginBottom:50 }}>Un conseil, une question, nous sommes à votre écoute ... </Text>
                            <View style={{flex:1, margin: 15}}>
                                <InputFieldBordered
                                    labelText="Demandez-nous ce que vous voulez *"
                                    labelTextSize={17}
                                    labelColor={colors.green1}
                                    textColor={colors.black}
                                    borderColor={colors.transparent}
                                    inputType="text"
                                    customStyle={{marginBottom: 40}}
                                    onChangeText={(text) => this.setState({question: text})}
                                    textValue={this.state.question}
                                    autoFocus={true}
                                />
                            </View>
                            <View style={{flex:1,justifyContent: 'flex-end'}}>
                                
                                <RoundedButton
                                    handleNextButton={()=>this._addQuestionClick(question)}
                                    disabled={this.toggleLogInButtonState()}
                                    text={"Valider ma question"}
                                    textColor={colors.white}
                                    btnColor={colors.green1}/>
                            </View>
                            <Loader
                                modalVisible={loadingVisible}
                                animationType="fade"/>
                        </View>
                </ImageBackground>
        )
    }
}

const style = StyleSheet.create
(
    {
        imgBack:
        {
            flex: 1
        },
        container:
        {
            flex: 1,
            justifyContent: 'flex-start',
            marginTop: 50
        }
    }
)