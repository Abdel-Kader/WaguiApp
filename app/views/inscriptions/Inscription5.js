import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Picker,
    Image
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'react-native-fetch-blob'
import colors from '@modules/colors'
import axios from 'axios'
import { auth_api } from '../../services/apiUrl'
import Loader from '@components/Loader'
import ImagePicker from 'react-native-image-picker'
import RoundedButton from '@components/buttons/RoundedButton'
import InputFieldBordered from '@components/forms/InputFieldBordered';


export default class Inscription5 extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            avatarSource: null,
            data: null,
            age: "",
            sexe: "",
            id_agri: "",
            loadingVisible: false,
            avatarName: "",
            
        }
        this._signInClick = this._signInClick.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

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
                //alert('source : '+ JSON.stringify(source))
                this.setState({
                    avatarSource: source,
                    data: response.data,
                    avatarName: response.fileName
                });
            }
        });
    }

    uploadImage()
    {
        RNFetchBlob.fetch('POST', 'http://www.waguispace.com/mobile/upload.php', {
            Authorization : "Bearer access-token",
            otherHeader : "foo",
            'Content-Type' : 'multipart/form-data',
          }, [
           
            { name : 'image', filename : this.state.avatarName, type:'image/png', data: this.state.data},
            
          ]).then((resp) => {
           // alert("Upload then "+resp.data.message)
          }).catch((err) => {
            //alert("Upload catch "+err)
          })
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

    static navigationOptions = ({ navigation }) =>({
        headerTintColor: colors.white,
        headerTransparent:true,
    });

    _signInClick(_sexe, _age){
        const navigation = this.props.navigation;
        const { sexe, age } = this.state;
        if(sexe && age)
        {
            this.setState({ loadingVisible: true});
            this.uploadImage()
            axios.put(auth_api+ "completeUser/"+ this.state.id_agri,
            {
                sexe: _sexe, 
                age: _age,
                photo: this.state.avatarName, 
            })
            .then(json =>{
                if(json.data.message == 'Yess'){
                    AsyncStorage.setItem('userPhoto', this.state.avatarName)
                    this.setState({ loadingVisible: false});
                     
                    navigation.navigate("Main")
                }
                else
                {
                    this.setState({ loadingVisible: false});

                    alert(json.data.message);
                }
            })
            .catch(error =>{console.error(error.message)})
        
        }
        else{
            this.setState({ loadingVisible: false});
            alert("Veuillez remplir les champs avec *")
        }
        //navigation.navigate("Inscription3");
    }
    render()
    {
        const { age, sexe, loadingVisible } = this.state
        return (
                <ScrollView>
                    <View style={style.container}>
                        <View style={style.headerView}>
                            <Text style={style.headerText}>Je complète mon compte</Text>
                        </View>

                        <View style={style.bodyView}>
                            <Text style={style.bodyText}>
                                Dites nous-en plus sur vous :
                            </Text>

                            <View
                                style={style.avatarContainer1}>
                                <TouchableOpacity style={{flex:1,width: '100%',justifyContent: 'center', alignItems: 'center'}} onPress={this.photo1.bind(this)}>
                                    {this.state.avatarSource === null ? (
                                        <Text style={{fontSize: 17, color:colors.green1}}>Cliquez pour ajouter une photo de profil</Text>
                                    ) : (
                                        <Image style={style.avatar} source={this.state.avatarSource} />
                                    )}
                                </TouchableOpacity>
                            </View>
                            <Text style={{color: colors.green1, fontSize: 16,fontWeight: '700',marginBottom:10,marginTop:25}}>
                                Votre sexe : 
                            </Text>
                            <View style={{flex:1,borderWidth: 1,borderColor: colors.green1,marginBottom:20}}>
                                <Picker
                                    selectedValue={this.state.sexe}
                                    style={{height: 50}}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({sexe: itemValue})
                                    }>
                                    <Picker.Item label="Choisir votre sexe" value="" />
                                    <Picker.Item label="Femme" value="femme" />
                                    <Picker.Item label="Homme" value="homme" />
                                </Picker>
                            </View>
                            <InputFieldBordered
                                labelText="Age *"
                                labelTextSize={16}
                                labelColor={colors.green1}
                                textColor={colors.black}
                                borderColor={colors.transparent}
                                inputType="phone-pad"
                                customStyle={{marginBottom: 30}}
                                onChangeText={(text) => this.setState({age: text})}
                            />
                            
                        </View>
                        <View>
                                <Text style={{textAlign:'center',color: colors.white,marginBottom: 30,fontWeight:  '700', fontSize: 16}}>Si vous n'avez pas de compte appuyez ci-dessous :</Text>
                                <RoundedButton
                                    handleNextButton={()=>this._signInClick(sexe, age)}
                                    disabled={false}
                                    text={"Terminer"}
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
            color: colors.green1,
            marginBottom: 10,
            textAlign: 'center'
        },
        
        bodyView:
        {
            marginLeft: 30,
            marginRight: 30
        },
        bodyText:
        {
            color: colors.green1,
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
            height: 250,
        },
        avatar: {
            width: 150,
            height: 150,
            borderRadius: 100,
        },
    }
)