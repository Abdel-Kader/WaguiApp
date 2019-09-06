import React, { Component } from 'react';
import {
    ImageBackground,
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import colors from '@modules/colors'
import RoundedButton from '@components/buttons/RoundedButton'


export default class Inscription1 extends Component
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
        navigation.navigate("Inscription2");
    }
    render()
    {
        return (
            <ImageBackground
                style={style.imgBack}
                source={require('@assets/images/inscription1.png')}>
                    <ScrollView>
                        <View style={style.container}>

                            <View style={style.headerView}>
                                <Text style={style.headerText}>Je complète mon inscription</Text>
                            </View>

                            <View style={style.bodyView}>
                                <Text style={style.bodyText}>
                                    Afin de pouvoir répondre au mieux à vos demandes, veuillez complètez votre compte WAGUI :
                                </Text>
                            </View>
                            <View style={{marginTop: 100,flex:1,}}>
                                    <RoundedButton
                                        handleNextButton={this._nextClick}
                                        disabled={false} 
                                        text={"Suivant ->"}
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
            fontSize: 30,
            fontWeight: 'bold',
            color: colors.white,
            marginBottom: 10,
            textAlign: 'center'
        },
        
        bodyView:
        {
            marginLeft: 30,
            marginRight: 30,
            marginTop: 100
        },
        bodyText:
        {
            color: colors.white,
            fontSize: 25,
            marginBottom: 20,
            textAlign: 'center'
        }
    }
)