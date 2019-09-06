import React, { Component } from 'react';
import {
    ImageBackground,
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import colors from '@modules/colors'


export default class Presentation2 extends Component
{
    constructor(propos)
    {
        super(propos);
        this._nextClick = this._nextClick.bind(this);
        this._cancelClick = this._cancelClick.bind(this);
    }
    static navigationOptions = ({ navigation }) =>({
        headerTintColor: colors.white,
        headerTransparent:true,
        headerLeft: null
    });

    _nextClick(){
        const navigation = this.props.navigation;
        navigation.navigate("Presentation3");
    }

    _cancelClick(){
        const navigation = this.props.navigation;
        navigation.navigate("SignIn");
    }
    render()
    {
        return (
            <ImageBackground
                style={style.imgBack}
                source={require('@assets/images/presentation2.png')}>
                        <View style={style.container}>

                            <View style={style.headerView}>
                                <Text style={style.headerText}>En répondant à toutes vos questions</Text>
                            </View>

                            <View style={style.bodyView}>
                                <Text style={style.bodyText}>
                                    Wagui, c'est de nombreux agronomes spécialisés, prêts à répondre à toutes vos questions.
                                    Par exemple : 
                                </Text>

                                <Text style={{marginTop: 30,marginBottom: 20,fontSize: 20,fontWeight: '700', color: colors.white, textAlign: 'center'}}>Pourquoi mes tomates ont cette couleur ?</Text>

                                <Text style={{marginBottom: 40,fontSize: 20,fontWeight: '700', color: colors.white, textAlign: 'center'}}>Mes récoltes ne donnent plus autant qu'avant, est-ce normal ?</Text>
                                
                            </View>
                            <View style={style.buttonView}>
                                <TouchableHighlight onPress={()=> this._cancelClick()}>
                                    <Text style={{color:colors.white, fontSize: 20,fontWeight: '700'}}>Passer</Text>
                                </TouchableHighlight>

                                <View style={{flex:1,alignItems: 'flex-end'}}>
                                    <TouchableHighlight onPress={()=> this._nextClick()}>
                                        <Text style={{color:colors.white, fontSize: 20,fontWeight: '700'}}>Suivant ->></Text>
                                    </TouchableHighlight>
                                </View>
                                
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
            fontSize: 20,
            marginBottom: 20,
            textAlign: 'center'
        },
        buttonView:
        {
            flex:1, flexDirection:'row',
            borderTopWidth:1,
            borderTopColor:'#fff',
            justifyContent:'flex-end',
            position: 'absolute',
            bottom:20,
            marginLeft:10,
            marginRight:10,
        }
    }
)