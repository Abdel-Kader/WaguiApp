import React, { Component } from 'react';
import colors from '@modules/colors'
import { Container } from "native-base";
import { ToolbarAndroid, View, TouchableHighlight, Text, StyleSheet, ImageBackground, Image, AsyncStorage, ScrollView } from 'react-native'

export default class HomeAcheteur extends Component
{
    constructor(props){
        super(props);
        this.state={
           userName :"",
           userPrenom : "",
           Username : ""
        } 
        this.onActionSelected = this.onActionSelected.bind(this);
        this._signOutAsync = this._signOutAsync.bind(this);
    }
    static navigationOptions = ({ navigation }) =>({
        headerTintColor: colors.white,
        headerTransparent:true,
    });
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
      };
    onActionSelected (position) {
        // if(position === 0)
        // {
        //     this.props.navigation.navigate("Profile")
        // }
        if (position === 1) 
        { 
            this.props.navigation.navigate("MesAchats")
        }

        if (position === 2) 
        { 
            this._signOutAsync();
        }
      }
    // componentDidMount= async()=> {
    //     try {
    //         const nom = await AsyncStorage.getItem('userName');
    //         const prenom = await AsyncStorage.getItem('userPrenom');
    //         if (nom !== null) {
    //         this.setState({userName: nom, userPrenom: prenom, Username: nom+"-"+prenom})
            
    //         }
    //     } catch (error) {
    //         // Error retrieving data
    //     }
    // }

    
     
    render() {
        const { Username } = this.state
        return (
            <ScrollView>
                <Container>
                    <ToolbarAndroid
                        style=
                        {{
                            backgroundColor: colors.green1,
                            height: 56,
                            alignSelf: 'stretch',
                            textAlign: 'center'
                        }}
                        title= "Chaïma" //{Username}
                        subtitle="Acheteur"
                        titleColor= "#fff"
                        actions = {[
                            {title: "Mon Profil", show: "never"},
                            {title: "Mes achats", show: "never"},
                            {title: "Me déconnecter", show: "never"},
                            {title: "Recommander à un ami", show: "never"},
                            {title: "Contactez-nous", show: "never"},
                        ]}
                        onActionSelected={this.onActionSelected}
                    />
                    <View style={{flex:1, marginTop: 20}}>
                    <Text style={{textAlign: 'center', fontSize: 28, fontWeight: '700', color: colors.green1 }}>Que puis-je faire pour vous ?</Text>
                    <TouchableHighlight onPress={()=>this.props.navigation.navigate("DemandeProduit")} style={{flex:0.5,marginTop:30, marginLeft:15, marginRight:15}}>
                        <ImageBackground source={require('@assets/images/acheteur/besoins.png')} style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={require('@assets/images/acheteur/Ibesoin.png')}/>
                            <Text style={{color: colors.white, fontSize:30, fontWeight: 'bold'}}>
                                J'ai besoin de
                            </Text>
                            <Text style={{color: 'white'}}>Faites nous part de ce dont vous avez besoin</Text>
                        </ImageBackground>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={()=>this.props.navigation.navigate("ProduitsDisponible")} style={{flex:0.5,marginTop:30, marginLeft:15, marginRight:15}}>
                        <ImageBackground source={require('@assets/images/acheteur/produitsdis.png')} style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={require('@assets/images/acheteur/Iproduitsdis.png')}/>
                            <Text style={{color: colors.white, fontSize:30, fontWeight: 'bold'}}>
                                Produits disponibles
                            </Text>
                            <Text style={{color: 'white', textAlign:'center'}}>Découvrez d'autres produits. Ce que vous cherchez se trouve peut-être déjà ici</Text>
                        </ImageBackground>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={()=>alert('En cours de developpement...')} style={{flex:0.5,marginTop:30, marginLeft:15, marginRight:15}}>
                        <ImageBackground source={require('@assets/images/acheteur/demandes.png')} style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={require('@assets/images/acheteur/Idemandes.png')}/>
                            <Text style={{color: colors.white, fontSize:30, fontWeight: 'bold'}}>
                                Mes demandes
                            </Text>
                            <Text style={{color: 'white'}}>Retrouvez toutes vos demandes traitées ou en attente</Text>
                        </ImageBackground>
                    </TouchableHighlight>
                
                </View>
            </Container>
        </ScrollView>
    );
    }
}

const styles = StyleSheet.create({
    
  })


    