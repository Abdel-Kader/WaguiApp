import React, { Component } from 'react';
import colors from '@modules/colors';
import { Container } from "native-base";
import { Image, View, TouchableHighlight, Text } from 'react-native'

export default class AidePage extends Component
{
    static navigationOptions = ({ navigation }) =>({
        title:"J'ai besoin d'aide",
        headerStyle: 
        {
            backgroundColor: colors.green1,
        },
        headerTintColor: '#fff'
    });
    render()
    {
        return (
                <Container>
                    <View style={{flex:1, marginTop: 20}}>
                        <Text style={{textAlign: 'center', fontSize: 28, fontWeight: '700', color: colors.green1 }}>J'ai besoin de ...</Text>
                        <View style={{flex:0.75, marginTop:50, marginLeft:10,marginRight:10}}>
                            <View style={{flex:1, flexDirection: 'row', marginBottom: 30}}>
                                <View style={{backgroundColor: colors.green1, flex:1, marginRight:20}}>
                                    <TouchableHighlight style={{flex: 1}} onPress={()=> this.props.navigation.navigate('VenteHome')}>
                                        <View>
                                            <Image source={require('@assets/images/art1.png')} style={{justifyContent:'center', alignSelf:'center', marginBottom: 10}}/>
                                            <Text style={{fontSize: 23, textAlign: 'center', color: 'white'}}>Vendre ma production</Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>

                                <View style={{backgroundColor: colors.green1, flex:1}}>
                                    <TouchableHighlight style={{flex: 1}}>
                                        <View>
                                            <Image source={require('@assets/images/art2.png')} style={{justifyContent:'center', alignSelf:'center', marginBottom: 20}}/>
                                            <Text style={{fontSize: 25, textAlign: 'center', color: 'white'}}>Transport</Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>

                            <View style={{flex:1, flexDirection: 'row'}}>
                                <View style={{backgroundColor: colors.green1, flex:1, marginRight:20}}>
                                    <TouchableHighlight style={{flex: 1}}>
                                        <View>
                                            <Image source={require('@assets/images/art3.png')} style={{justifyContent:'center', alignSelf:'center', marginBottom: 20}}/>
                                            <Text style={{fontSize: 25, textAlign: 'center', color: 'white'}}>Analyser</Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>

                                <View style={{backgroundColor: colors.green1, flex:1}}>
                                    <TouchableHighlight style={{flex: 1}}>
                                        <View>
                                            <Image source={require('@assets/images/art4.png')} style={{justifyContent:'center', alignSelf:'center', marginBottom: 20}}/>
                                            <Text style={{fontSize: 25, textAlign: 'center', color: 'white'}}>Autres</Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </View>
                </Container>
        );
    }
}