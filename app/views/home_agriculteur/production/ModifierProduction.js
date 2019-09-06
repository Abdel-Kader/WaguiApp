import React, { Component } from 'react';
import 
{
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableHighlight
} from 'react-native';
import colors from '@modules/colors'
import InputFieldBordered from '@components/forms/InputFieldBordered'
import RoundedButton from '@components/buttons/RoundedButton'
import axios from 'axios'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'
import { agri_api } from '../../../services/apiUrl'
import Loader from '@components/Loader'
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';

export default class ModifierProduction extends Component
{
    constructor(propos)
    {
        super(propos);
        this.state = {
            id: this.props.navigation.state.params.id,
            libelle: this.props.navigation.state.params.libelle,
            description: this.props.navigation.state.params.commentaire,
            localisation:  this.props.navigation.state.params.localisation,
            quantite:  this.props.navigation.state.params.qte,
            prix_unitaire:  this.props.navigation.state.params.prix_unitaire,
            media_1:  this.props.navigation.state.params.media_1,
            media_2:  this.props.navigation.state.params.media_2,
            media_3:  this.props.navigation.state.params.media_3,
            loadingVisible: false,
            data1 : null,
            data2 : null,
            data3 : null,
            avatar1Name: "",
            avatar2Name: "",
            avatar3Name: "",
            id_agri: ''
        }
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
    }

    _editProduction(libelle, description, localisation, qte, prix_unitaire, media_1, media_2, media_3)
    {
        if(libelle && qte && prix_unitaire && localisation)
        {
            NetInfo.fetch().then(state => {
                //alert("Connection type", state.type);
                if(state.isConnected)
                { 
                    this.setState({ loadingVisible: true});
                    this.uploadImage1()
                    this.uploadImage2()
                    this.uploadImage3()
                    if(media_1)
                    {
                        axios.post(agri_api + "addProduction", 
                        {
                            libelle : libelle,
                            commentaire : description,
                            localisation : localisation,
                            qte : qte,
                            prix_unitaire : prix_unitaire,
                            media_1 : this.state.avatar1Name,
                            id_wag_user : this.state.id_agri
                        })
                        .then(res => 
                            {
                                if(res.data.message == 'Yess')
                                {
                                    this.setState({ loadingVisible : false, libelle : '', localisation : '', prix_unitaire : '', quantite : '', description : ''});
                                    alert("Votre production a été modifiée avec succès");
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
                    else if(media_1 && media_2)
                    {
                        axios.post(agri_api + "addProduction", 
                        {
                            libelle : libelle,
                            commentaire : description,
                            localisation : localisation,
                            qte : qte,
                            prix_unitaire : prix_unitaire,
                            media_1 : this.state.avatar1Name,
                            media_2 : this.state.avatar2Name,
                            id_wag_user : this.state.id_agri
                        })
                        .then(res => 
                            {
                                if(res.data.message == 'Yess')
                                {
                                    this.setState({ loadingVisible : false, libelle : '', localisation : '', prix_unitaire : '', quantite : '', description : ''});
                                    alert("Votre production a été modifiée avec succès");
                                    
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
                    else if(media_1 && media_2 && media_3)
                    {
                        axios.post(agri_api + "addProduction", 
                        {
                            libelle : libelle,
                            commentaire : description,
                            localisation : localisation,
                            qte : qte,
                            prix_unitaire : prix_unitaire,
                            media_1 : this.state.avatar1Name,
                            media_2 : this.state.avatar2Name,
                            media_3 : this.state.avatar3Name,
                            id_wag_user : this.state.id_agri
                        })
                        .then(res => 
                            {
                                if(res.data.message == 'Yess')
                                {
                                    this.setState({ loadingVisible : false, libelle : '', localisation : '', prix_unitaire : '', quantite : '', description : ''});
                                    alert("Votre production a été modifiée avec succès");
                                    
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
                    else if(media_2)
                    {
                        axios.post(agri_api + "addProduction", 
                        {
                            libelle : libelle,
                            commentaire : description,
                            localisation : localisation,
                            qte : qte,
                            prix_unitaire : prix_unitaire,
                            media_2 : this.state.avatar2Name,
                            id_wag_user : this.state.id_agri
                        })
                        .then(res => 
                            {
                                if(res.data.message == 'Yess')
                                {
                                    this.setState({ loadingVisible : false, libelle : '', localisation : '', prix_unitaire : '', quantite : '', description : ''});
                                    alert("Votre production a été modifiée avec succès");
                                    
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
                    else if(media_3)
                    {
                        axios.post(agri_api + "addProduction", 
                        {
                            libelle : libelle,
                            commentaire : description,
                            localisation : localisation,
                            qte : qte,
                            prix_unitaire : prix_unitaire,
                            media_3 : this.state.avatar3Name,
                            id_wag_user : this.state.id_agri
                        })
                        .then(res => 
                            {
                                if(res.data.message == 'Yess')
                                {
                                    this.setState({ loadingVisible : false, libelle : '', localisation : '', prix_unitaire : '', quantite : '', description : ''});
                                    alert("Votre production a été modifiée avec succès");
                                    
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
                                alert("error "+error.message)
                            })
                    }
                    else if(media_2 && media_3)
                    {
                        axios.post(agri_api + "addProduction", 
                        {
                            libelle : libelle,
                            commentaire : description,
                            localisation : localisation,
                            qte : qte,
                            prix_unitaire : prix_unitaire,
                            media_2 : this.state.avatar2Name,
                            media_3 : this.state.avatar3Name,
                            id_wag_user : this.state.id_agri
                        })
                        .then(res => 
                            {
                                if(res.data.message == 'Yess')
                                {
                                    this.setState({ loadingVisible : false, libelle : '', localisation : '', prix_unitaire : '', quantite : '', description : ''});
                                    alert("Votre production a été modifiée avec succès");
                                    
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
                    else if(!media_1 && !media_2 && !media_3)
                    {
                        axios.post(agri_api + "addProduction", 
                        {
                            libelle : libelle,
                            commentaire : description,
                            localisation : localisation,
                            qte : qte,
                            prix_unitaire : prix_unitaire,
                            id_wag_user : this.state.id_agri
                        })
                        .then(res => 
                            {
                                if(res.data.message == 'Yess')
                                {
                                    this.setState({ loadingVisible : false, libelle : '', localisation : '', prix_unitaire : '', quantite : '', description : ''});
                                    alert("Votre production a été modifiée avec succès");
                                }
                                else
                                {
                                    this.setState({ loadingVisible: false});
        
                                    alert(es.data.message);
                                }
                            })
                        .catch(error =>
                            {
                                this.setState({ loadingVisible: false});
                                alert("error "+error.message)
                            })
                    }
                }
                else
                {
                    alert("Vous êtes actuellement hors connexion veuillez vérifier votre connection puis reessayer !")
                }
               
            });
            
        }
        else
        {
            alert("Veuillez remplir les champs obligatoires !")
        }
    }

    static navigationOptions = ({ navigation }) =>({
        title:"Modifier",
        headerStyle: 
        {
            backgroundColor: colors.green1,
        },
        headerTintColor: '#fff'
    });

    photo1() {
        const options = {
            title: 'Ajouter une photo',
            takePhotoButtonTitle: 'Prendre une photo',
            chooseFromLibraryButtonTitle: 'Choisir depuis la galerie',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
                path: 'Wagui/Media/Wagui productions'
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri };
                this.setState({
                    media_1: source,
                    data1: response.data,
                    avatar1Name: response.fileName
                });
            }
        });
    }

    photo2() {
        const options = {
            title: 'Ajouter une photo',
            takePhotoButtonTitle: 'Prendre une photo',
            chooseFromLibraryButtonTitle: 'Choisir depuis la galerie',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
                path: 'Wagui/Media/Wagui productions'
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri };
                this.setState({
                    media_2: source,
                    data2: response.data,
                    avatar2Name: response.fileName
                });
            }
        });
    }
    photo3() {
        const options = {
            title: 'Ajouter une photo',
            takePhotoButtonTitle: 'Prendre une photo',
            chooseFromLibraryButtonTitle: 'Choisir depuis la galerie',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
                path: 'Wagui/Media/Wagui profil'
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri };
                this.setState({
                    media_3: source,
                    data3: response.data,
                    avatar3Name: response.fileName
                });
            }
        });
    }

    toggleState() {
        const { libelle, quantite, prix_unitaire } = this.state;
        if(libelle && quantite && prix_unitaire) {
            return false
        }
        return true
    }

    uploadImage1()
    {
        RNFetchBlob.fetch('POST', 'http://www.waguispace.com/mobile/upload.php', {
            Authorization : "Bearer access-token",
            otherHeader : "foo",
            'Content-Type' : 'multipart/form-data',
          }, [
           
            { name : 'image', filename : this.state.avatar1Name, type:'image/png', data: this.state.data1},
            
          ]).then((resp) => {
           // alert("Upload then "+resp.data.message)
          }).catch((err) => {
            //alert("Upload catch "+err)
          })
    }

    uploadImage2()
    {
        RNFetchBlob.fetch('POST', 'http://www.waguispace.com/mobile/upload.php', {
            Authorization : "Bearer access-token",
            otherHeader : "foo",
            'Content-Type' : 'multipart/form-data',
          }, [
           
            { name : 'image', filename : this.state.avatar2Name, type:'image/png', data: this.state.data2},
            
          ]).then((resp) => {
           // alert("Upload then "+resp.data.message)
          }).catch((err) => {
            //alert("Upload catch "+err)
          })
    }

    uploadImage3()
    {
        RNFetchBlob.fetch('POST', 'http://www.waguispace.com/mobile/upload.php', {
            Authorization : "Bearer access-token",
            otherHeader : "foo",
            'Content-Type' : 'multipart/form-data',
          }, [
           
            { name : 'image', filename : this.state.avatar3Name, type:'image/png', data: this.state.data3},
            
          ]).then((resp) => {
           // alert("Upload then "+resp.data.message)
          }).catch((err) => {
            //alert("Upload catch "+err)
          })
    }


    render()
    {
        
        const { libelle, description, localisation, quantite, prix_unitaire, media_1, media_2, media_3, loadingVisible } = this.state;
        return(
            <ScrollView>
                <View style={style.container}>

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
                            labelText="Prix du KG *"
                            labelTextSize={16}
                            labelColor={colors.green1}
                            textColor={colors.black}
                            borderColor={colors.transparent}
                            inputType="phone-pad"
                            customStyle={{marginBottom: 30}}
                            onChangeText={(text) => this.setState({prix_unitaire: text})}
                            textValue = {this.state.prix_unitaire}
                        />

                        <InputFieldBordered
                            labelText="Quantité *:"
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

                        <View style={{flex:1, flexDirection:'row'}}>
                            <View
                                style={style.avatarContainer1}>
                                <TouchableHighlight style={{flex:1,width: '100%',justifyContent: 'center', alignItems: 'center'}} onPress={this.photo1.bind(this)}>
                                    {this.state.media_1 === null ? (
                                        <Text style={{color:colors.green1, textAlign:'center'}}>Ajouter une photo</Text>
                                    ) : (
                                        <Image style={style.avatar} source={this.state.media_1} />
                                    )}
                                </TouchableHighlight>
                            </View>

                            <View
                                style={style.avatarContainer1}>
                                <TouchableHighlight style={{flex:1,width: '100%',justifyContent: 'center', alignItems: 'center'}} onPress={this.photo2.bind(this)}>
                                    {this.state.media_2 === null ? (
                                        <Text style={{color:colors.green1, textAlign:'center'}}>Ajouter une photo</Text>
                                    ) : (
                                        <Image style={style.avatar} source={this.state.media_2} />
                                    )}
                                </TouchableHighlight>
                            </View>

                            <View
                                style={style.avatarContainer1}>
                                <TouchableHighlight style={{flex:1,width: '100%',justifyContent: 'center', alignItems: 'center'}} onPress={this.photo3.bind(this)}>
                                    {this.state.media_3 === null ? (
                                        <Text style={{color:colors.green1, textAlign:'center'}}>Ajouter une photo</Text>
                                    ) : (
                                        <Image style={style.avatar} source={this.state.media_3} />
                                    )}
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={{marginTop: 30}}>
                            
                            <RoundedButton
                                handleNextButton={()=> this._editProduction(libelle, description, localisation, quantite, prix_unitaire, media_1, media_2, media_3)}
                                disabled={this.toggleState()}
                                text={"Modifier"}
                                textColor={colors.white}
                                btnColor={colors.green1}/>
                        </View>
                        
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
            color: colors.white,
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