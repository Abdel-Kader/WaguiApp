import React, { Component } from 'react';
import 
{
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import colors from '@modules/colors'
import InputFieldBordered from '@components/forms/InputFieldBordered'
import RoundedButton from '@components/buttons/RoundedButton'
import axios from 'axios'
import NetInfo from "@react-native-community/netinfo";
import { acheteur_api } from '../../services/apiUrl'
import Loader from '@components/Loader'
import AsyncStorage from '@react-native-community/async-storage';


export default class DemandeProduit extends Component
{
    constructor(propos)
    {
        super(propos);
        this.state = {
            libelle: '',
            description: '',
            localisation: '',
            quantite: '',
            loadingVisible: false,
            Connected : false,
            id_user: ''
        }
    }

    componentDidMount= async()=> {
      
        try {
            const id = await AsyncStorage.getItem('Id');
            if (id !== null) 
            {
              this.setState({id_user: id})
            }
          } catch (error) {
            console.log("....."+error)
          }
    }

    _AddProduction(libelle, description, localisation, qte)
    {
        if(libelle && qte)
        {
            NetInfo.fetch().then(state => 
            {

                if(state.isConnected)
                { 
                    this.setState({ loadingVisible: true});
                    axios.post(acheteur_api + "searchProduction", 
                        {
                            libelle : libelle,
                            commentaire : description,
                            localisation : localisation,
                            qte : qte,
                            id_wag_user : this.state.id_user
                        })
                        .then(res => 
                            {
                                if(res.data.message == 'Yess')
                                {
                                    this.setState({ loadingVisible : false, libelle : '', localisation : '', quantite : '', description : ''});
                                    this.props.navigation.navigate('DemandeBravo');
                                }
                                else
                                {
                                    this.setState({ loadingVisible: false});
                                    alert(res.data.message);
                                }
                            })
                        .catch(error =>
                            {
                                this.setState({ loadingVisible: false});
                                alert("erreur : "+error.message)
                            })
                    
                }
                else
                {
                    alert("Vous êtes actuellement hors connexion veuillez vérifier votre connection puis reessayer !")
                }

            })
        }
        else
        {
            alert("Veuillez remplir les champs obligatoires !");
        }
    }
    toggleState() {
        const { libelle, quantite } = this.state;
        if(libelle && quantite) {
            return false
        }
        return true
    }

    static navigationOptions = ({ navigation }) =>({
        title:"Demande de produit",
        headerStyle: 
        {
            backgroundColor: colors.green1,
        },
        headerTintColor: '#fff'
    });

    render()
    {
        const { libelle, description, localisation, quantite, loadingVisible } = this.state;
        return(
            <ScrollView>
                <View style={style.container}>
                    <Text style={style.bodyText}>
                        Renseignez les champs correctement afin d'ajouter votre demande
                    </Text>
                    <View style={style.bodyView}>
                    <InputFieldBordered
                            labelText="Nom du produit *"
                            labelTextSize={16}
                            labelColor={colors.green1}
                            textColor={colors.black}
                            borderColor={colors.transparent}
                            inputType="text"
                            customStyle={{marginBottom: 40}}
                            onChangeText={(text) => this.setState({libelle: text})}
                            textValue = {this.state.libelle}
                            autoFocus={true}
                        />

                        <InputFieldBordered
                            labelText="Localisation"
                            labelTextSize={16}
                            labelColor={colors.green1}
                            textColor={colors.black}
                            borderColor={colors.transparent}
                            inputType="text"
                            customStyle={{marginBottom: 30}}
                            onChangeText={(text) => this.setState({localisation: text})}
                            textValue = {this.state.localisation}
                        />
                        
                        <InputFieldBordered
                            labelText="Quantité (en KG) *:"
                            labelTextSize={16}
                            labelColor={colors.green1}
                            textColor={colors.black}
                            borderColor={colors.transparent}
                            inputType="phone-pad"
                            customStyle={{marginBottom: 30}}
                            onChangeText={(text) => this.setState({quantite: text})}
                            textValue = {this.state.quantite}
                        />

                        <InputFieldBordered
                            labelText="Commentaire" 
                            labelTextSize={16}
                            labelColor={colors.green1}
                            textColor={colors.black}
                            borderColor={colors.transparent}
                            inputType="text"
                            customStyle={{marginBottom: 30}}
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={(text) => this.setState({description: text})}
                            textValue = {this.state.description}
                        />

                    </View>
                    <View style={{marginTop: 30}}>
                        <RoundedButton
                            handleNextButton={()=> this._AddProduction(libelle, description, localisation, quantite)}
                            disabled={this.toggleState()}
                            text={"Demander"}
                            textColor={colors.white}
                            btnColor={colors.green1}/>
                    </View>

                    <Loader
                        modalVisible={loadingVisible}
                        animationType="fade"/>
                </View>
            </ScrollView>
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
            marginTop: 20
        },
        headerView:
        {
            alignItems:'center',
            
        },
        avatarContainer1: {
            borderColor: colors.green1,
            borderWidth: 1,
            borderRadius:5,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            marginTop: 20,
            marginBottom: 30,
            marginRight: 15,
            width: '100%',
            height: 100,
        },
        avatar: {
            height: 100,
            width: '100%',
        },
        headerText:
        {
            fontSize: 30,
            fontWeight: 'bold',
            color: colors.white,
            marginBottom: 10
        },
        headerLogo:
        {
            width: 100,
            height: 100,
            alignContent: 'center'
        },
        bodyView:
        {
            marginLeft: 20,
            marginRight: 20,
            marginTop: 15,
            backgroundColor: colors.white,
            padding: 15
        },
        bodyText:
        {
            color: colors.green1,
            fontSize: 18,
            marginBottom: 20,
            textAlign: 'center'
        },
        buttonView:
        {
            flex:1, 
            flexDirection:'row',
            marginTop: 20
        }
    }
)