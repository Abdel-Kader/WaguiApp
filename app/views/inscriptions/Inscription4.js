import React, { Component } from 'react';
import {
    ImageBackground,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    AsyncStorage
} from 'react-native';
import colors from '@modules/colors'
import InputField from "@components/forms/InputField";
import axios from 'axios'
import { agri_api } from '../../services/apiUrl'
import Loader from '@components/Loader'


export default class Inscription4 extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            libelle : "",
            dimensions : "",
            emplacement : "",
            nb_annee : "",
            id_agri : "",
            loadingVisible : false
        }

        this._nextClick = this._nextClick.bind(this);
    }

    componentDidMount= async()=> {
        try 
        {
            const id = await AsyncStorage.getItem('Id')
            if (id !== null) 
            {
                this.setState({id_agri: id})
            }
        } catch (error) {
            // Error retrieving data
        }
    }

    _cancelClick(){
        AsyncStorage.setItem('completUser', 'ins4'); 
        const navigation = this.props.navigation;
        navigation.navigate("Main");
    }

    static navigationOptions = ({ navigation }) =>({
        headerTintColor: colors.white,
        headerTransparent:true,
    });

    _nextClick(lib, dimension, empl, nbAnnee){
        const navigation = this.props.navigation;
        const { libelle, dimensions, emplacement } = this.state;
        if(libelle && dimensions && emplacement)
        {
            this.setState({ loadingVisible: true});
            axios.post(agri_api+ "addCulture",
            {
                libelle: lib, 
                dimensions: dimension,
                commentaire: empl,
                date_creation: nbAnnee,
                id_wag_user: this.state.id_agri
            })
            .then(json =>{
                if(json.data.message == 'Yess'){
                    this.setState({ loadingVisible: false});
                    
                    navigation.navigate("Inscription5")
                }
                else
                {
                    this.setState({ loadingVisible: false});

                    alert(json.data.message);
                }
            })
            .catch(error =>{console.error(error.message)})
        
        }
        else {
            alert("Veuillez remplir tous les champs obligatoires (avec *)");
        }
    }
    render()
    {
        const { libelle, dimensions, emplacement, nb_annee, loadingVisible } = this.state;
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
                                   Donnez nous les dimensions de votre plantation et dites nous où elle est située :
                                </Text>
                               
                                <InputField
                                    labelText="Libellé (nom de la plantation) *"
                                    labelTextSize={16}
                                    labelColor={colors.white}
                                    textColor={colors.white}
                                    borderColor={colors.white}
                                    inputType="text"
                                    customStyle={{marginBottom: 40}}
                                    onChangeText={(text) => this.setState({libelle: text})}
                                    autoFocus={true}
                                />
                                <InputField
                                    labelText="Dimensions (en hectars) *"
                                    labelTextSize={16}
                                    labelColor={colors.white}
                                    textColor={colors.white}
                                    borderColor={colors.white}
                                    inputType="phone-pad"
                                    onChangeText={(text) => this.setState({dimensions: text})}
                                    customStyle={{marginBottom: 30}}
                                />

                                <InputField
                                    labelText="Emplacement *"
                                    labelTextSize={16}
                                    labelColor={colors.white}
                                    textColor={colors.white}
                                    borderColor={colors.white}
                                    inputType="text"
                                    customStyle={{marginBottom: 30}}
                                    onChangeText={(text) => this.setState({emplacement: text})}
                                />

                                <InputField
                                    labelText="Nombre d'années :"
                                    labelTextSize={16}
                                    labelColor={colors.white}
                                    textColor={colors.white}
                                    borderColor={colors.white}
                                    inputType="phone-pad"
                                    customStyle={{marginBottom: 30}}
                                    onChangeText={(text) => this.setState({nb_annee: text})}
                                />
                            </View>
                            <View style={style.buttonView}>
                                <TouchableHighlight onPress={()=> this._cancelClick()}>
                                    <Text style={{color:colors.white, fontSize: 20,fontWeight: '700'}}>Plus tard</Text>
                                </TouchableHighlight>
                                <View style={{flex:1,alignItems: 'flex-end'}}>
                                    <TouchableHighlight onPress={()=> this._nextClick(libelle, dimensions, emplacement, nb_annee)}>
                                        <Text style={{color:colors.white, fontSize: 20,fontWeight: '700'}}>Suivant ->></Text>
                                    </TouchableHighlight>
                                </View>
                                
                            </View>
                            <Loader
                                modalVisible={loadingVisible}
                                animationType="fade"/>
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
            marginTop: 100
        },
        bodyText:
        {
            color: colors.white,
            fontSize: 23,
            marginBottom: 20,
            textAlign: 'center'
        },
        buttonView:
        {
            flex:1, 
            marginTop: 30,
            marginBottom: 30,
            marginLeft: 15,
            marginRight: 15,
            flexDirection:'row',
            borderTopWidth:1,
            borderTopColor:'#fff',
            justifyContent:'flex-end'
        }
    }
)