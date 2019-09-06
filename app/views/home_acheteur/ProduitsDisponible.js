import React, { Component } from 'react';
import 
{
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import colors from '@modules/colors';
import {Body, Card, CardItem} from "native-base";
import { acheteur_api } from '../../services/apiUrl' 
import axios from 'axios'
import Loader from '@components/Loader'
import NetInfo from "@react-native-community/netinfo";

export default class ProduitsDisponible extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
          data: [],
          loadingVisible : false
        }
        this.detailProduit = this.detailProduit.bind(this);
    }

    componentDidMount= async()=> 
    {
        this.getProduits();
    }

    getProduits() 
    {
        NetInfo.fetch().then(state => 
        {
            if(state.isConnected) 
            {
                this.setState({loadingVisible: true})
                axios.get(acheteur_api+ "getAllProductions")
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

    static navigationOptions = ({ navigation }) =>({
        title:"Produits disponibles",
        headerStyle: 
        {
            backgroundColor: colors.green1,
        },
        headerTintColor: '#fff'
    });

    detailProduit(item)
    {
        this.props.navigation.navigate('DetailProduit',
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
            date_ajout: item.created_at,
            nom: item.nom,
            prenom: item.prenom
        })
    }

    renderItem = ({ item }) => (
        <TouchableOpacity style={styles.list} onPress={() => this.detailProduit(item)}>
            <Card style={{borderBottomWidth: 2, borderBottomColor: colors.green1, borderStartWidth: 2, borderStartColor: colors.green1}}>
                <CardItem>
                    <Body>
                        <View style={{flex:1, flexDirection: 'row'}}>
                            <View style={{flex:1}}>
                                <Text style={{color: colors.darkgreen, fontSize: 22, fontWeight: 'bold'}}>  
                                    {item.libelle.charAt(0).toUpperCase() + item.libelle.slice(1)}  
                                </Text>
                            </View>
                        
                            <View style={{flex:1, flexDirection:'row',  justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                                <Icon name='md-pin' color={colors.lightgreen} size={18} style={{marginRight:10, fontWeight:'bold'}}/>
                                <Text style={{fontWeight: 'bold', color: colors.lightgreen, fontSize: 16}}> 
                                    {item.localisation} 
                                </Text>
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection: 'row', backgroundColor: colors.whitegreen, padding: 10, marginTop:20}}>
                            <View style={{flex:1}}>
                                <Text style={{color: colors.lightgreen, fontSize: 16, fontWeight: 'bold'}}>
                                    Prix total :
                                </Text>
                                <Text style={{color: colors.green2, fontWeight: 'bold'}}>
                                    ({item.prix_unitaire} Fcfa/Kg)
                                </Text>
                            </View>
                            <View style={{flex:1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                                <Text style={{color: colors.darkgreen, fontSize: 18, fontWeight: 'bold'}}>
                                    {item.prix_unitaire * item.qte} Fcfa
                                </Text>
                            </View>
                        </View>

                        <View style={{flex:1, flexDirection: 'row', padding: 10}}>
                            <View style={{flex:1,  backgroundColor: '#f6f6f6'}}>
                                <Text style={{color: colors.lightgreen, fontSize: 16, fontWeight: 'bold'}}>
                                    Vendeur :
                                </Text>
                                <Text style={{color: colors.darkgreen, fontSize: 16, fontWeight: 'bold'}}>
                                    {item.nom.charAt(0).toUpperCase() + item.nom.slice(1)} {item.prenom.charAt(0).toUpperCase() + item.prenom.slice(1)}
                                </Text>
                            </View>
                            <View style={{flex:1, backgroundColor: '#f6f6f6', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                                <Text style={{color: colors.lightgreen, fontSize: 16, fontWeight: 'bold'}}>
                                    Quantité :
                                </Text>
                                <Text style={{color: colors.darkgreen, fontSize: 20, fontWeight: 'bold'}}>
                                    {item.qte} Kg
                                </Text>
                            </View>
                        </View>
                    </Body>
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
                        <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
                            <Icon name="md-outlet" size={35} color={colors.green1}/>
                            <Text style={styles.errorMsg}>
                                Aucun produit trouvé !
                            </Text>
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
                        <Text style={styles.errorMsg}>
                            Vous n'êtes pas connectés à internet ! Veuillez vérifiervotre connection puis réessayer
                        </Text>
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
                        animationType="fade"
                    />
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

    errorMsg:
    {
        fontSize: 23,
        textAlign:'center', 
        color: colors.green1, 
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