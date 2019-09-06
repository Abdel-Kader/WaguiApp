import React, { Component } from 'react';
import {
    ImageBackground,
    View,
    Text,
    StyleSheet,
    ScrollView,
    Picker
} from 'react-native';
import colors from '@modules/colors'
import RoundedButton from '@components/buttons/RoundedButton'


export default class Inscription2 extends Component
{
    constructor(propos)
    {
        super(propos);
        this.state={
            type_compte : ""
        }

        this._nextClick = this._nextClick.bind(this);
    }
    static navigationOptions = ({ navigation }) =>({
        headerTintColor: colors.white,
        headerTransparent:true,
    });

    _nextClick(){
        if(this.state.type_compte !="")
        {
            const navigation = this.props.navigation;
            navigation.navigate("Inscription3");
        }
        else {
            alert("Veuillez choisir votre type de compte");
        }
    }
    render()
    {
        return (
            <ImageBackground
                style={style.imgBack}
                source={require('@assets/images/ins_agri1.png')}>
                    <ScrollView>
                        <View style={style.container}>

                            <View style={style.headerView}>
                                <Text style={style.headerText}>Je complète mon compte</Text>
                            </View>

                            <View style={style.bodyView}>
                                <Text style={style.bodyText}>
                                    Wagui met en relation différents acteurs du domaine agricole. De quel groupe d'acteur faites-vous parti ?
                                </Text>

                                <View style={{borderWidth: 1, borderColor: '#fff', marginBottom:50}}>
                                <Picker
                                    selectedValue={this.state.pays}
                                    style={{height: 50}}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({type_compte: itemValue})
                                    }>
                                    <Picker.Item label="Type de compte" value=""/>
                                    <Picker.Item label="Agriculteur" value="agriculteur"/>
                                    <Picker.Item label="Agronome" value="agronome"/>
                                    <Picker.Item label="Acheteur" value="acheteur"/>
                                </Picker>
                            </View>
                            </View>
                            <View style={{marginTop: 60}}>
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
            marginTop: 80
        },
        bodyText:
        {
            color: colors.white,
            fontSize: 23,
            marginBottom: 20,
            textAlign: 'center'
        }
    }
)