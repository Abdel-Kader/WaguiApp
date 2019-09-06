import React, { Component } from 'react';
import {
    ImageBackground,
    View,
    Text,
    StyleSheet,
} from 'react-native';
import colors from '@modules/colors';
import RoundedButton from '@components/buttons/RoundedButton'


export default class Presentation5 extends Component
{
    constructor(propos)
    {
        super(propos);
        this._nextClick = this._nextClick.bind(this);
    }
    static navigationOptions = ({ navigation }) =>({
        headerTintColor: colors.white,
        headerTransparent:true,
        headerLeft: null
    });

    _nextClick(){
        const navigation = this.props.navigation;
        navigation.navigate("SignIn");
    }

    render()
    {
        return (
            <ImageBackground
                style={style.imgBack}
                source={require('@assets/images/presentation5.png')}>
                        <View style={style.container}>

                            <View style={style.headerView}>
                                <Text style={style.headerText}>Wagui</Text>
                            </View>

                            <View style={style.bodyView}>
                                <Text style={style.bodyText}>
                                    Exploitez vous-même la puissance du réseau wagui, comme beaucoup l'ont déjà fait avant vous
                                </Text>

                            </View>
                            <View style={style.buttonView}>
                                <RoundedButton
                                    handleNextButton={this._nextClick}
                                    disabled={false}
                                    text={"Je me lance"}
                                    textColor={colors.green1}
                                    btnColor={colors.white}/>
                                
                            </View>
                        
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
            marginTop: 40
        },
        headerView:
        {
            flex:1,
            alignItems:'center',
            
        },
        headerText:
        {
            fontSize: 30,
            fontWeight: 'bold',
            color: colors.white,
            textAlign: 'center'
        },
        
        bodyView:
        {
            marginLeft: 30,
            marginRight: 30,
            flex:3,
        },
        bodyText:
        {
            color: colors.white,
            fontSize: 22,
            marginBottom: 20,
            textAlign: 'center'
        },
        buttonView:
        {
            flex:1, 
            justifyContent:'flex-end',
            marginLeft:10,
            marginRight:10,
        }
    }
)