import React, { Component } from 'react';
import {
    ImageBackground,
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableHighlight,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import colors from '@modules/colors'
import InputFieldBordered from '@components/forms/InputFieldBordered'
import RoundedButton from '@components/buttons/RoundedButton'
import axios from 'axios'
import { auth_api } from '../../services/apiUrl'
import Loader from '@components/Loader'
import * as Animatable from 'react-native-animatable'


export default class SignIn extends Component
{
    constructor(propos)
    {
        super(propos);
        this.state = {
            Nom: '',
            prenom: '',
            telephone: '',
            password: '',
            reppassword: '',
            validPassword: false,
            formValid: true,
            validTelephone: false,
            loadingVisible: false
        }
        this._connexionClick = this._connexionClick.bind(this);
        this._SignInClick = this._SignInClick.bind(this);
    }

    static navigationOptions = ({ navigation }) =>({
        headerTintColor: colors.white,
        headerTransparent:true,
        headerLeft: null
    });

    _SignInClick(nom, prenom, telephone, password, reppassword){
        const navigation = this.props.navigation;
        if(password === reppassword)
        {
            this.setState({ loadingVisible: true});
            axios.post(auth_api+ "createUser",
            {
                nom: nom, 
                prenom: prenom,
                tel: telephone,
                mdp: password
            })
            .then(json =>{
                if(json.data.message == 'Yess'){
                    this.setState({ loadingVisible: false});
                    AsyncStorage.setItem('Id', json.data.id.toString());
                    AsyncStorage.setItem('userName', json.data.nom);
                    AsyncStorage.setItem('userPrenom', json.data.prenom);
                    AsyncStorage.setItem('userTel', json.data.tel);
                    navigation.navigate("Inscription1")
                } 
                else
                {
                    this.setState({ loadingVisible: false});

                    alert(json.data.message);
                }
            })
            .catch(error =>{
                this.setState({ loadingVisible: false});
                alert("iiiiiii "+error.message)
            })
        }
        else
        {
            alert("Les mots de passe ne sont pas identiques !")
        }
        
    }

    toggleLogInButtonState() {
        const { nom, telephone, password} = this.state;
        if(nom && telephone && password) {
            return false
        }
        return true
    }

    _connexionClick(){
        const navigation = this.props.navigation;
        navigation.navigate("LogIn");
    }
    render()
    {
        const { nom, prenom, telephone, password, reppassword, loadingVisible } = this.state;
        return (
            <ImageBackground
                style={style.imgBack}
                source={require("@assets/images/insc_back.jpg")}>
                    <ScrollView>
                        <View style={style.container}>

                            <Animatable.View animation='zoomIn' iterationCount={1} style={style.headerView}>
                                <Image
                                    source={require('@assets/images/logo.png')}
                                    style={style.headerLogo} />

                                <Text style={style.headerText}>Formulaire d'inscription</Text>
                                <Text style={style.bodyText}>
                                    Réjoignez notre réseau en remplissant les champs ci-dessous et en cliquant sur 'je m'inscris
                                </Text>
                            </Animatable.View>

                            <View style={style.bodyView}>
                                

                                <InputFieldBordered
                                    labelText="Nom *"
                                    labelTextSize={16}
                                    labelColor={colors.green1}
                                    textColor={colors.black}
                                    borderColor={colors.transparent}
                                    inputType="text"
                                    customStyle={{marginBottom: 40}}
                                    onChangeText={(text) => this.setState({nom: text})}
                                    autoFocus={true}
                                />

                                <InputFieldBordered
                                    labelText="Prenom"
                                    labelTextSize={16}
                                    labelColor={colors.green1}
                                    textColor={colors.black}
                                    borderColor={colors.transparent}
                                    inputType="text"
                                    customStyle={{marginBottom: 30}}
                                    onChangeText={(text) => this.setState({prenom: text})}
                                />

                                <InputFieldBordered
                                    labelText="Mot de passe *"
                                    labelTextSize={16}
                                    labelColor={colors.green1}
                                    textColor={colors.black}
                                    borderColor={colors.transparent}
                                    inputType="password"
                                    customStyle={{marginBottom: 30}}
                                    onChangeText={(text) => this.setState({password: text})}
                                />

                                <InputFieldBordered
                                    labelText="Ressaisir le mot de passe *"
                                    labelTextSize={16}
                                    labelColor={colors.green1}
                                    textColor={colors.black}
                                    borderColor={colors.transparent}
                                    inputType="password"
                                    customStyle={{marginBottom: 30}}
                                    onChangeText={(text) => this.setState({reppassword: text})}
                                />

                                <InputFieldBordered
                                    labelText="Téléphone *"
                                    labelTextSize={16}
                                    labelColor={colors.green1}
                                    textColor={colors.black}
                                    borderColor={colors.transparent}
                                    inputType="phone-pad"
                                    customStyle={{marginBottom: 30}}
                                    onChangeText={(text) => this.setState({telephone: text})}
                                />

                                <View style={{marginTop: 30}}>
                                    
                                    <RoundedButton
                                        handleNextButton={()=>this._SignInClick(nom, prenom, telephone, password, reppassword)}
                                        disabled={this.toggleLogInButtonState()}
                                        text={"Je m'inscris"}
                                        textColor={colors.white}
                                        btnColor={colors.green1}/>

                                    <View style={style.buttonView}>
                                        <Text style={{color:colors.green1, fontSize: 16,fontWeight: '700'}}>Vous avez déjà un compte ?</Text>
                                        <View style={{flex:1,alignItems: 'flex-end'}}>
                                        <TouchableHighlight onPress={()=> this._connexionClick()}>
                                            <Text style={{color:colors.green1,borderBottomWidth:1,borderBottomColor: colors.green1, fontSize: 16,fontWeight: '700'}}>Cliquez ici</Text>
                                        </TouchableHighlight>
                                        </View>
                                
                                    </View>
                                </View>
                                
                            </View>
                            <Loader
                                modalVisible={loadingVisible}
                                animationType="fade"/>
                        </View>
                    </ScrollView>
                    
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
            marginTop: 20
        },
        headerView:
        {
            alignItems:'center',
            
        },
        headerText:
        {
            fontSize: 30,
            fontWeight: 'bold',
            color: colors.white,
            marginBottom: 10
        },
        headerLogo:
        {
            width: 100,
            height: 100,
            alignContent: 'center'
        },
        bodyView:
        {
            marginLeft: 20,
            marginRight: 20,
            marginTop: 15,
            backgroundColor: colors.white,
            padding: 15
        },
        bodyText:
        {
            color: colors.white,
            fontSize: 18,
            marginBottom: 20,
            textAlign: 'center'
        },
        buttonView:
        {
            flex:1, 
            flexDirection:'row',
            marginTop: 20
        }
    }
)