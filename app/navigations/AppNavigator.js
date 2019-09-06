import React from 'react'
import { createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator } from "react-navigation";
import  LogIn  from '@views/auth/LogIn';
import  SignIn from '@views/auth/SignIn';
import  Profile from '@views/auth/Profil';

import Presentation1 from "@views/presentations/Presentation1";
import Presentation2 from "@views/presentations/Presentation2";
import Presentation3 from "@views/presentations/Presentation3";
import Presentation4 from "@views/presentations/Presentation4";
import Presentation5 from "@views/presentations/Presentation5";

import Inscription1 from "@views/inscriptions/Inscription1";
import Inscription2 from "@views/inscriptions/Inscription2";
import Inscription3 from "@views/inscriptions/Inscription3";
import Inscription4 from "@views/inscriptions/Inscription4";
import Inscription5 from "@views/inscriptions/Inscription5";

import Acceuil from "@views/home_agriculteur/Accueil";
import AidePage from "@views/home_agriculteur/AidePage";
import EnCours from "@views/home_agriculteur/questions/EnCours";
import Repondues from "@views/home_agriculteur/questions/Repondues";
import AddQuestion from "@views/home_agriculteur/questions/AddQuestion";
import VenteHome from "@views/home_agriculteur/production/VenteHome";
import AjouterProduction from "@views/home_agriculteur/production/AjouterProduction";
import DetailProduction from "@views/home_agriculteur/production/DetailProduction";
import ModifierProduction from "@views/home_agriculteur/production/ModifierProduction";

import HomeAcheteur from "@views/home_acheteur/HomeAcheteur";
import DemandeProduit from "@views/home_acheteur/DemandeProduit";
import ProduitsDisponible from "@views/home_acheteur/ProduitsDisponible";
import DemandeBravo from "@views/home_acheteur/DemandeBravo";
import AchatBravo from "@views/home_acheteur/AchatBravo";
import DetailProduit from "@views/home_acheteur/DetailProduit";
import MesAchats from "@views/home_acheteur/MesAchats";

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import colors from '@modules/colors'

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

 
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('Id');

    this.props.navigation.navigate(userToken ? 'AcheteurMain' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const AuthNavigator = createStackNavigator({
  
  LogIn: 
  {
    screen: LogIn
  },
  Inscription1: 
    {
      screen: Inscription1
    },
    
    Inscription2: 
    {
      screen: Inscription2
    },
    Inscription3: 
    {
      screen: Inscription3
    },
    Inscription4: 
    {
      screen: Inscription4
    },
    Inscription5: 
    {
      screen: Inscription5
    },
    
    SignIn: 
    {
      screen: SignIn
    },
    Profile: 
    {
      screen: Profile
    },
    Presentation1: 
    {
      screen: Presentation1
    },

    Presentation2: 
    {
      screen: Presentation2
    },

    Presentation3: 
    {
      screen: Presentation3
    },

    Presentation4: 
    {
      screen: Presentation4
    },

    Presentation5: 
    {
      screen: Presentation5
    },

    

  });

  const TabNavigator = createBottomTabNavigator(
  {
    EnCours: EnCours,
    Repondues: Repondues,
  },
  {
    headerMode: 'none',        // I don't want a NavBar at top
    tabBarOptions: {
      activeTintColor: colors.darkgreen,  // Color of tab when pressed
      inactiveTintColor: colors.lightgreen, // Color of tab when not pressed
      showIcon: 'false', // Shows an icon for both iOS and Android
     
      labelStyle: {
        fontSize: 16,
        marginBottom: 16,
        fontWeight: 'bold',
       
      },
      style: {
        backgroundColor: colors.green1, // Makes Android tab bar white instead of standard blue
        height: (Platform.OS === 'ios') ? 48 : 50 // I didn't use this in my app, so the numbers may be off. 
      }
    },
});
  
const AgriculteurNavigator = createStackNavigator({
  
  Acceuil: {
    screen: Acceuil,
  },
  VenteHome: {
    screen: VenteHome,
  },
  Questions: {
    screen: TabNavigator,
    navigationOptions: {
      header: null  //Need to set header as null.
  }
  },
  AddQuestion: {
    screen: AddQuestion
  },
  AidePage: {
    screen: AidePage
  },
  AjouterProduction: {
    screen: AjouterProduction,
  },
  DetailProduction: {
    screen: DetailProduction,
  },
  ModifierProduction: {
    screen: ModifierProduction,
  },
})

const AcheteurNavigator = createStackNavigator({
  
  HomeAcheteur: {
    screen: HomeAcheteur
  },
  DemandeProduit: {
    screen: DemandeProduit,
  },
  DemandeBravo: {
    screen: DemandeBravo,
  },
  ProduitsDisponible: {
    screen: ProduitsDisponible,
  },
  DetailProduit: {
    screen: DetailProduit,
  },
  AchatBravo: {
    screen: AchatBravo,
  },
  MesAchats: {
    screen: MesAchats,
  },
})


const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthNavigator,
    AgriculteurMain: AgriculteurNavigator,
    AcheteurMain: AcheteurNavigator,

  },
  {
    initialRouteName: 'AuthLoading'
  }
  ));

export default AppContainer;