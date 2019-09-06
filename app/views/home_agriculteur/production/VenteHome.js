import React, { Component } from 'react';
import 
{
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import colors from '@modules/colors'
import {Body, Card, CardItem} from "native-base"
import Loader from '@components/Loader'
import Icon from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable'
import { agri_api } from '../../../services/apiUrl' 
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";


export default class VenteHome extends Component
{
  constructor(props)
  {
    super(props);
    this.state = 
    {
      data: [],
      loadingVisible : false,
      id_agri: ''
    }
    this.detailProduit = this.detailProduit.bind(this);
  }

    componentDidMount= async()=> {
      
      try {
          const id = await AsyncStorage.getItem('Id');
          if (id !== null) 
          {
            this.setState({id_agri: id})
          }
        } catch (error) {
          console.log("....."+error)
        }

        this.getPosts();
  }

  detailProduit(item)
    {
        this.props.navigation.navigate('DetailProduction',
        {
            id: item.id,
            libelle: item.libelle,
            commentaire: item.commentaire,
            localisation: item.localisation,
            qte: item.qte,
            prix_unitaire : item.prix_unitaire,
            media_1: item.media_1,
            media_2: item.media_2,
            media_3: item.media_3,
            date_ajout: item.created_at
        })
    }

  getPosts() 
  {
    NetInfo.fetch().then(state => 
      {
        if(state.isConnected) 
        {
          this.setState({loadingVisible: true})
          axios.get(agri_api+ "getMyProductions/"+this.state.id_agri)
          .then(response => {
            if(response.data != 'no')
              {
                this.setState({loadingVisible: false})
                this.setState({data: response.data})
              }
              else
              {
                this.setState({loadingVisible: false})
                this.setState({data: null})
              }
          });
        }
        else
        {
          alert("Vous êtes actuellement hors connexion veuillez vérifier votre connection puis reessayer !")
          this.setState({data: 0})
        }
    });

  }
    static navigationOptions = ({ navigation }) =>
    ({
        title:"Vendez tout ce que vous cultivez",
        headerStyle: 
        {
            backgroundColor: colors.green1,
        },
        headerTintColor: '#fff'
    });

    renderItem = ({ item }) => (
      <TouchableOpacity style={styles.list}>
          <Card style={{borderBottomWidth: 2, borderBottomColor: colors.green1, borderStartWidth: 2, borderStartColor: colors.green1}}>
              <CardItem>
                  <Body>
                    <View style={{flex:1, flexDirection: 'row'}}>
                      <View style={{flex:1}}>
                        <Text style={{color: colors.darkgreen, fontSize: 23, fontWeight: 'bold'}}>  
                            {item.libelle.charAt(0).toUpperCase() + item.libelle.slice(1)}  
                        </Text>
                      </View>
                      
                      <View style={{flex:1, flexDirection:'row'}}>
                        <Icon name='md-pin' color={colors.lightgreen} size={23} style={{marginRight:20, fontWeight:'bold'}}/>
                          <Text style={{fontWeight: 'bold', color: colors.lightgreen, fontSize:  20}}> 
                            {item.localisation} 
                          </Text>
                      </View>
                    </View>
                    <View style={{flex:1, flexDirection: 'row', backgroundColor: colors.whitegreen, height: 50, padding: 10, marginTop:20}}>
                      <View style={{flex:1}}>
                          <Text style={{color: colors.lightgreen, fontSize: 18, fontWeight: 'bold'}}>Prix :</Text>
                      </View>
                      <View style={{flex:2}}>
                        <Text style={{color: colors.darkgreen, fontSize: 20, fontWeight: 'bold'}}>{item.prix_unitaire * item.qte} Fcfa</Text>
                      </View>
                  </View>
                  </Body>
              </CardItem>
              
                <CardItem>
                  <View style={{flex:1, flexDirection: 'row'}}>
                      <View style={{flex:1, marginRight: 15}}>
                      <Image source={{uri: "http://www.waguispace.com/mobile/imgs/"+item.media_1}} style={{width: '100%', height: 90}}/>
                      </View>
                      <View style={{flex:1, backgroundColor: '#f6f6f6',justifyContent:'center', alignContent: 'center', paddingLeft:15,paddingRight:15}}>
                        <Text>{item.commentaire}</Text>
                      </View>
                  </View>
                </CardItem>
          </Card>
          
      </TouchableOpacity> 
    )

    render()
    {
      if(this.state.data == null)
        {
            return(
                <View style={{flex:1}}>
                     <StatusBar
                        barStyle="dark-content"
                        backgroundColor={colors.green1}
                        translucent={false}
                        />
                        <TouchableOpacity style={{height: 70, width: 270, marginBottom: 20,marginLeft: 20}} onPress={()=>{this.props.navigation.navigate('AjouterProduction')}}>
                          <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', marginTop:20}}>
                            <Icon name="md-add-circle" size={35} style={{marginRight: 20, color: colors.green1, fontWeight: 'bold'}}/>
                            <Text style={{color: colors.green1, fontWeight: 'bold', fontSize:20}}>Ajouter un nouvel article</Text>
                          </View>
                        </TouchableOpacity>
                        <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
                            <Animatable.View animation="slideInDown" iterationCount={'infinite'} direction="alternate">
                                <Icon name="md-outlet" size={35} color={colors.green1}/>
                            </Animatable.View>
                            <Text style={{fontSize: 23,textAlign:'center', color: colors.green1, fontWeight: 'bold'}}> Vous n'avez pas encore ajouté de production !</Text>
                        </View>
                    
                    <Loader
                        modalVisible={this.state.loadingVisible}
                        animationType="fade"/>
                </View>
            )
        }
        else if(this.state.data == 0)
        { 
            return(
                <View style={{flex:1}}>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor="transparent"
                        translucent={false}
                    />
                    <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
                        <Icon name="md-outlet" size={35} color={colors.green1}/>
                        <Text style={{fontSize: 23,textAlign:'center', color: colors.green1, fontWeight: 'bold'}}> Vous n'êtes pas connectés à internet ! Veuillez vérifiervotre connection puis réessayer</Text>
                    </View>
                    
                    <Loader
                        modalVisible={this.state.loadingVisible}
                        animationType="fade"
                    />

                </View>
            )
        }
        else
        {
            return(
                <View style={{flex:1}}>
                   
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor={colors.green1}
                        translucent={false}
                        />
                         <TouchableOpacity style={{height: 70, width: 270, marginBottom: 20,marginLeft: 20}} onPress={()=>{this.props.navigation.navigate('AjouterProduction')}}>
                          <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', marginTop:20}}>
                            <Icon name="md-add-circle" size={30} style={{marginRight: 20, color: colors.green1, fontWeight: 'bold'}}/>
                            <Text style={{color: colors.green1, fontWeight: 'bold', fontSize:20}}>Ajouter un nouvel article {this.state.loadingVisible}</Text>
                          </View>
                        </TouchableOpacity>
                    <FlatList
                        style={{
                            flex: 1,
                        }}
                        data={this.state.data}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index)=>index}
                    />
                     <Loader
                        modalVisible={this.state.loadingVisible}
                        animationType="fade"/>
                </View>
            )
        }
        
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000"
    },
    list: {
        paddingVertical: 5,
        margin: 3,
    },
    employeurText: {
        color: "#000",
        fontSize: 17,
        fontWeight: 'bold'
    },

    posteText: {
        color: colors.orange1,
        fontStyle : 'italic'
    },
    descriptionText: {
        fontSize: 15,
        paddingLeft: 60,
        paddingBottom: 15
    },
    line: {
        height: 0.7,
        width: "100%",
        backgroundColor:"gray",
    },
    icon: {
        position: "absolute",
        bottom: 20,
        width: "100%",
        left: 290,
        zIndex: 1
    },
    numberBox: {
        position: "absolute",
        bottom: 75,
        width: 30,
        height: 30,
        borderRadius: 15,
        left: 330,
        zIndex: 3,
        backgroundColor: "#e3e3e3",
        justifyContent: "center",
        alignItems: "center"
    },
    number: {fontSize: 14,color: "#000"},
    selected: {backgroundColor: "transparent"},
    toolbar: {
    backgroundColor: '#222d65',
        height: 56,
        alignSelf: 'stretch',
        textAlign: 'center'
},
});