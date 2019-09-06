import React, { Component } from 'react';
import {
    ImageBackground,
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableHighlight,
} from 'react-native';
import colors from '@modules/colors'
import InputField from '@components/forms/InputField';
import RoundedButton from '@components/buttons/RoundedButton'
import { connect } from 'react-redux'
import axios from 'axios'
import { auth_api } from '../../services/apiUrl'
import Loader from '@components/Loader'
import * as Animatable from 'react-native-animatable'
import AsyncStorage from '@react-native-community/async-storage';


 class LogIn extends Component
{
    
    constructor(props)
    {
        super(props);
        this.state = 
        {
            telephone: '',
            password: '',
            loadingVisible: false,
            validPassword: false,
            formValid: true,
            validTelephone: false,
        }
        
        this._signInClick = this._signInClick.bind(this);
        this._logInClick = this._logInClick.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleTelephoneChange = this.handleTelephoneChange.bind(this);
        this.toggleLogInButtonState = this.toggleLogInButtonState.bind(this);
      
    }
    static navigationOptions = ({ navigation }) =>({
        headerTintColor: colors.white,
        headerTransparent:true,
    });

    _signInClick(){
        const navigation = this.props.navigation;
        navigation.navigate("Presentation1");
    }

    _logInClick(tel, pass){
        this.setState({ loadingVisible: true});
        const navigation = this.props.navigation;
        axios.post(auth_api+ "userLogin",{tel: tel, mdp: pass})
        .then(json =>{
            if(json.data.message == 'Vous êtes maintenant connecté !'){
                this.setState({ loadingVisible: false});
                AsyncStorage.setItem('Id', json.data.id.toString());
                AsyncStorage.setItem('userName', json.data.nom);
                AsyncStorage.setItem('userPrenom', json.data.prenom);
                AsyncStorage.setItem('userTel', json.data.tel);
                navigation.navigate("AgriculteurMain")
            }
            else
            {
                this.setState({ loadingVisible: false});

                alert(json.data.message);
            }
        })
        .catch(error =>{console.error(error.message)})

    }

    handlePasswordChange(password) {
        console.log("pass :"+this.state.password)
        if (!this.state.validPassword){
            this.setState({password: password});
            if(password.length !== 0){
                this.setState({ validPassword: true})
            }
        }else {
            this.setState({ validPassword: false});
        }
    }

    handleTelephoneChange(telephone) {
        console.log("tel :"+this.state.telephone)
        if (!this.state.validTelephone){
            this.setState({telephone: telephone});
            if(telephone.length !== 0){
                this.setState({ validTelephone: true})
            }
        }else {
            this.setState({ validTelephone: false});
        }
    }

    toggleLogInButtonState() {
        const { telephone, password} = this.state;
        if(telephone && password) {
            return false
        }
        return true
    }



    render()
    {
        const { loadingVisible, telephone, password } = this.state;
        
        return (
            <ImageBackground
                style={style.imgBack}
                source={require("@assets/images/connexion.jpg")}>
                    <ScrollView>
                        <View style={style.container}>

                            <View style={style.headerView}>
                                <Animatable.Text animation='zoomInRight' iterationCount={1}>
                                    <Text style={style.headerText}>Wagui</Text>
                                </Animatable.Text>
                                <Animatable.View animation='slideInDown' iterationCount={1}>
                                    <Image
                                        source={require('@assets/images/logo.png')}
                                        style={style.headerLogo} />
                                </Animatable.View>
                            </View>

                            <View style={style.bodyView}>
                                <Text style={style.bodyText}>
                                    Veuillez remplir les champs ci-dessous pour vous connecter et accéder à votre compte
                                </Text>

                                <InputField
                                    labelText="Teléphone *"
                                    labelTextSize={16}
                                    labelColor={colors.white}
                                    textColor={colors.white}
                                    borderColor={colors.transparent}
                                    inputType="phone-pad"
                                    customStyle={{marginBottom: 40}}
                                    onChangeText={(text) => this.setState({telephone: text})}
                                    autoFocus={true}
                                />

                                <InputField
                                    labelText="Mot de passe *"
                                    labelTextSize={16}
                                    labelColor={colors.white}
                                    textColor={colors.white}
                                    borderColor={colors.transparent}
                                    inputType="password"
                                    customStyle={{marginBottom: 30}}
                                    onChangeText={(pass) => this.setState({password: pass})}
                                />

                                <TouchableHighlight style={{marginBottom: 40}}>
                                    <Text style={{color: colors.white,fontWeight:  '700', fontSize: 16}}>J'ai oublié mon mot de passe</Text>
                                    
                                </TouchableHighlight>
                                

                                <RoundedButton
                                    handleNextButton={()=>this._logInClick(telephone, password)}
                                    disabled={this.toggleLogInButtonState()}
                                    text={"Connexion"}
                                    textColor={colors.green1}
                                    btnColor={colors.white}/>

                                <View style={{marginTop: 30}}>
                                    <Text style={{textAlign:'center',color: colors.white,marginBottom: 30,fontWeight:  '700', fontSize: 16}}>Si vous n'avez pas de compte appuyez ci-dessous :</Text>
                                    <RoundedButton
                                        handleNextButton={this._signInClick}
                                        disabled={false}
                                        text={"Je m'inscris"}
                                        textColor={colors.white}
                                        btnColor={colors.green1}/>
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
            fontSize: 35,
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
            marginLeft: 30,
            marginRight: 30,
            marginTop: 30
        },
        bodyText:
        {
            color: colors.white,
            fontSize: 18,
            marginBottom: 20
        }
    }
)

const mapStateToProps = (state) => {
    return state
  }

export default connect(mapStateToProps)(LogIn)