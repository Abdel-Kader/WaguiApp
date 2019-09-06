import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground
} from 'react-native'
import colors from '@modules/colors'
import RoundedButton from '@components/buttons/RoundedButton';


export default class AchatBravo extends Component
{
    static navigationOptions = ({ navigation }) =>({
        title:"J'ai besoin de ",
        headerStyle: 
        {
            backgroundColor: colors.green1,
        },
        headerTintColor: '#fff'
    });

    render()
    {
        return(
            <ImageBackground
                    style={{flex:1}}
                    source={require("@assets/images/question_ag.jpg")}>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('@assets/images/acheteur/bravo.png')}/>
                    <Text style={{color: colors.green1, fontSize:25, marginTop:20, textAlign:'center'}}>Bravo vous venez de payer le produit !</Text>
                </View>
                <RoundedButton
                    handleNextButton={()=>this.props.navigation.navigate('ProduitsDisponible')}
                    disabled={false}
                    text={"Voir d'autres produits disponibles"}
                    textColor={colors.white}
                    btnColor={colors.green1}/>
            </ImageBackground>
        )
    }
}