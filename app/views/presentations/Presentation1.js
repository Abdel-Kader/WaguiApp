import React, { Component } from 'react';
import {
    ImageBackground,
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableHighlight
} from 'react-native';
import colors from '@modules/colors'
import RoundedButton from '@components/buttons/RoundedButton'


export default class Presentation1 extends Component
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
        navigation.navigate("Presentation2");
    }
    render()
    {
        return (
            <ImageBackground
                style={style.imgBack}
                source={require('@assets/images/presentation1.png')}>
                    <ScrollView>
                        <View style={style.container}>

                            <View style={style.headerView}>
                                <Text style={style.headerText}>Wagui à votre service</Text>
                            </View>

                            <View style={style.bodyView}>
                                <Text style={style.bodyText}>
                                    Chaque jour grâce à Wagui, des agriculteurs, des agronomes, 
                                    des demandeurs d'emplois et même des investisseurs 
                                    trouvent les moyens pour satisfaire leurs plus belles ambitions.
                                </Text>

                                <Text style={{marginTop: 30,marginBottom: 40,fontSize: 28,fontWeight: '700', color: colors.white, textAlign: 'center'}}>Découvrez comment en seulement trois étapes...</Text>
                                
                            </View>
                            <View style={{marginTop: 60}}>
                                    <RoundedButton
                                        handleNextButton={this._nextClick}
                                        disabled={false}
                                        text={"Commencer"}
                                        textColor={colors.green1}
                                        btnColor={colors.white}
                                        />
                                </View>
                        
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
            marginTop: 40
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
        
        bodyView:
        {
            marginLeft: 30,
            marginRight: 30,
            marginTop: 40
        },
        bodyText:
        {
            color: colors.white,
            fontSize: 20,
            marginBottom: 20,
            textAlign: 'center'
        }
    }
)