import React, { Component } from 'react';
import colors from '@modules/colors'
import { Container } from "native-base";
import { ToolbarAndroid, View, Share, TouchableHighlight, Text, StyleSheet, ImageBackground, StatusBar } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';



export default class Acceuil extends Component
{
    constructor(props){
        super(props);
        this.state={
           userName :"",
           userPrenom : "",
           Username : "",
           UserProfil : ""
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
        if(position === 0)
        {
            this.props.navigation.navigate("Profile")
        }
        if (position === 2) { // index of 'Deconnexion'
        this._signOutAsync();
        }
        if(position === 3)
        {
            this.onShare();
        }
        if(position === 1)
        {
            this.props.navigation.navigate("Questions")
        }
      }
    componentDidMount= async()=> {
        try {
            const nom = await AsyncStorage.getItem('userName');
            const prenom = await AsyncStorage.getItem('userPrenom');
            const profil = await AsyncStorage.getItem('userPhoto');
            if (nom !== null) {
            this.setState({userName: nom, userPrenom: prenom, Username: nom+"-"+prenom, UserProfil: profil})
            
            }
        } catch (error) {
            // Error retrieving data
        }
    }

    onShare = async () => {
        try {
          const result = await Share.share({
            title: "Wagui ",
            message: "Salut je t'invite à découvrir Wagui l'application qui aide les agriculteurs à vendre leur production. ",
            //url: 'www.facebook.com'
          });
    
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
             // alert('shared with activity type of result.activityType')
            } else {
              //alert('shared')
            }
          } else if (result.action === Share.dismissedAction) {
            //alert('dismiss')
          }
        } catch (error) {
          alert(error.message);
        }
      };

    
     
    render() 
    
    {
        const { Username } = this.state
        return (
                <Container>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor= {colors.green1}
                    />
                    <ToolbarAndroid
                        style={{
                            backgroundColor: colors.green1,
                            height: 56,
                            alignSelf: 'stretch',
                            textAlign: 'center'
                        }}
                        title= {Username}
                      //  navIcon={{uri: "file:///storage/emulated/0/Pictures/Wagui/Media/Wagui profil/"+this.state.UserProfil}}
                        subtitle="Agriculteur"
                        titleColor= "#fff"
                        actions = {[
                            {title: "Mon Profil", show: "never"},
                            {title: "Mes questions", show: "never"},
                            {title: "Me déconnecter", show: "never"},
                            {title: "Recommander à un ami", show: "never"},
                            {title: "Contactez-nous", show: "never"},
                        ]}
                        onActionSelected={this.onActionSelected}
                    />
                    <View style={{flex:1, margin: 20}}>
                    <Text style={{textAlign: 'center', fontSize: 28, fontWeight: '700', color: colors.green1 }}>Que puis-je faire pour vous ?</Text>
                    <TouchableHighlight onPress={()=>this.props.navigation.navigate("AddQuestion")} style={{flex:0.5,marginTop:30}}>
                        
                        <ImageBackground source={require('@assets/images/agri_question.jpg')} style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: colors.white, fontSize:30, fontWeight: 'bold'}}>
                                J'ai une question ?
                            </Text>
                        </ImageBackground>
                    </TouchableHighlight>
                    <View style={{flex:0.5, flexDirection: 'row', marginTop:15}}>
                        <TouchableHighlight onPress={()=>this.props.navigation.navigate("AidePage")} style={{flex:1}}>
                            <ImageBackground source={require('@assets/images/agri_aide.png')} style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
                                <View>
                                    <Text style={{color: colors.white,fontSize: 30, fontWeight: 'bold', textAlign:'center'}}>
                                    J'ai besoin d'aide 
                                    </Text>
                                </View>
                            </ImageBackground>
                        </TouchableHighlight>
                        
                        <TouchableHighlight style={{flex:1,marginLeft:10, backgroundColor: colors.green1, justifyContent:'center', alignItems: 'center'}}>
                            <Text style={{color: colors.white,fontSize: 30, fontWeight: 'bold', textAlign:'center'}}>
                                Mes offres
                            </Text>
                        </TouchableHighlight>
                    </View>

                    <View style={{flex:0.5,marginTop:15}}>
                        <TouchableHighlight style={{backgroundColor: colors.green2, height: 70, justifyContent:'center', alignItems: 'center'}}>
                            <Text style={{color: colors.white,fontSize: 25, fontWeight: 'bold', textAlign:'center'}}>
                                Produits demandés sur le marché
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    
  })


    