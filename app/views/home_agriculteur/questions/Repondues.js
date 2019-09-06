import React, { Component } from 'react';
import { View, Text, FlatList, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
import { agri_api } from '../../../services/apiUrl' 
import axios from 'axios'
import {Body, Card, CardItem} from "native-base"
import colors from '@modules/colors'
import Loader from '@components/Loader'
import Icon from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable'
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";


export default class Repondues extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            data: [],
            loadingVisible : false,
            id_agri: ''
        }

      
    }

    static navigationOptions = ({ navigation }) =>({
        title:"Questions répondues",
        
    });

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

    getPosts() { 
        NetInfo.fetch().then(state => 
        {
            if(state.isConnected) 
            { 
                this.setState({loadingVisible: true})
                axios.get(agri_api+ "getMyQuestionsRepondus/"+this.state.id_agri)
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
        })
    }
   
    renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.list}>
            <Card style={{borderBottomWidth: 2, borderBottomColor: colors.green1, borderStartWidth: 2, borderStartColor: colors.green1}}>
                <CardItem>
                    <Body>
                        <Text style={{color: colors.black, fontSize: 17}}>  
                            {item.question.charAt(0).toUpperCase() + item.question.slice(1)}  
                        </Text>
                        <Text style={{fontWeight: 'bold', color: colors.darkgreen, marginTop: 15}}> 
                           {item.date_debut} 
                        </Text>
                    </Body>
                </CardItem>
                <CardItem footer bordered>
                    <Text>Répondue par : </Text>
                    <Text style={{fontWeight: 'bold',fontSize: 17, color: colors.green1}}> 
                           {item.nom} {item.prenom}
                        </Text>
                </CardItem>
            </Card>
            
        </TouchableOpacity>
        
    )
    render(){
        if(this.state.data == null)
        {
            return(
                <View style={{flex:1}}>
                    <StatusBar
                    barStyle="dark-content"
                    backgroundColor="transparent"
                    translucent={false}
                    />
                    <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>

                        <Animatable.View animation="slideInDown" iterationCount={'infinite'} direction="alternate">
                            <Icon name="md-outlet" size={35} color={colors.green1}/>
                        </Animatable.View>
                        <Text style={{fontSize: 23,textAlign:'center', color: colors.green1, fontWeight: 'bold'}}> Vous n'avez pas encore reçu de réponse à vos questions!</Text>
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

                        <Animatable.View animation="slideInDown" iterationCount={'infinite'} direction="alternate">
                            <Icon name="md-outlet" size={35} color={colors.green1}/>
                        </Animatable.View>
                        <Text style={{fontSize: 23,textAlign:'center', color: colors.green1, fontWeight: 'bold'}}> Vous n'êtes pas connectés à internet ! Veuillez vérifiervotre connection puis réessayer</Text>
                    </View>
                    
                    <Loader
                        modalVisible={this.state.loadingVisible}
                        animationType="fade"/>
                </View>
            )
        }
        else
        {
            return(
                <View style={{flex:1}}>
                   
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor="transparent"
                        translucent={false}
                        />
                        
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
    list: {
        paddingVertical: 5,
        margin: 3,
    },
})