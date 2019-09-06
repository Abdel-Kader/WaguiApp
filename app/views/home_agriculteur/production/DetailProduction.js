import React, { Component } from 'react';
import 
{
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    StatusBar
} from 'react-native';
import colors from '@modules/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { Footer, FooterTab, Button, Content, Container } from 'native-base';

export default class DetailProduction extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            id: "this.props.navigation.state.params.id",
            libelle: "this.props.navigation.state.params.libelle",
            commentaire: "this.props.navigation.state.params.commentaire",
            localisation:  "this.props.navigation.state.params.localisation",
            qte:  "this.props.navigation.state.params.qte",
            prix_unitaire:  "this.props.navigation.state.params.prix_unitaire",
            media_1:  "this.props.navigation.state.params.media_1",
            media_2:  "this.props.navigation.state.params.media_2",
            media_3:  "this.props.navigation.state.params.media_3",
        };
        this.editProduct = this.editProduct.bind(this);
    }

    editProduct()
    {
        this.props.navigation.navigate('ModifierProduction',
        {
            id: this.state.id,
            libelle: this.state.libelle,
            commentaire: this.state.commentaire,
            localisation: this.state.localisation,
            qte: this.state.qte,
            prix_unitaire : this.state.prix_unitaire,
            media_1: this.state.media_1,
            media_2: this.state.media_2,
            media_3: this.state.media_3,
        })
    }

    deleteProduction()
    {
        alert("Voulez-vous vraiment supprimer cette production ?")
    }

    static navigationOptions = ({ navigation }) =>(
    {
        title:"this.state.libelle",
        headerStyle: 
        {
            backgroundColor: colors.green1,
        },
        headerTintColor: '#fff'
    });

    render()
    {
        return(
                <Container style={{flex:1}}>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor={colors.green1}
                        translucent={false}
                        />
                    <Content style={{flex:1, marginTop: 20, marginLeft:15, marginRight:15}}>
                        <View style={{flex:1, flexDirection: 'row'}}>
                            <View style={{flex:1}}>
                                <Text style={{color: colors.lightgreen, fontSize: 17, fontWeight: 'bold'}}>Prix total : </Text>
                                <Text style={{color: colors.darkgreen, fontSize: 20, fontWeight: 'bold'}}>{this.state.prix_unitaire * this.state.qte}</Text>
                                <Text style={{color: colors.green1, fontWeight: 'bold'}}>({this.state.prix_unitaire} / Kg)</Text>
                            </View>
                            <View style={{flex:1, justifyContent:'flex-end', alignItems: 'flex-end'}}>
                                <Text style={{color: colors.lightgreen, fontSize: 17, fontWeight: 'bold'}}>Quantité : </Text>
                                <Text style={{color: colors.darkgreen, fontSize: 20, fontWeight: 'bold'}}>{this.state.qte} Kg</Text>
                            </View>

                        </View>
                        <View style={{flex:1, flexDirection: 'row', marginTop: 20, marginBottom: 20}}>
                            <View style={{flex:1}}>
                                <Text style={{color: colors.darkgreen, fontSize: 22, fontWeight: 'bold'}}>  
                                    {this.state.libelle}
                                </Text>
                            </View>
                        
                            <View style={{flex:1, flexDirection:'row',  justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                                <Icon name='md-pin' color={colors.lightgreen} size={18} style={{marginRight:10, fontWeight:'bold'}}/>
                                <Text style={{fontWeight: 'bold', color: colors.lightgreen, fontSize: 16}}> 
                                    {this.state.localisation}
                                </Text>
                            </View>
                        </View>
                        <View style={{flex:1}}>
                            <View style={{flex:1, backgroundColor: '#f6f6f6',justifyContent:'center', alignContent: 'center', padding:15, marginBottom:20}}>
                                <Text style={{textAlign : 'justify'}}>
                                    {this.state.commentaire}
                                </Text>
                            </View>
                            <View style={{flex:1, marginRight: 15, flexDirection: 'row'}}>
                                { this.state.media_1 != null ?
                                    <View style={{flex:1, marginRight: 10}}>
                                        <Image source={{uri: "http://www.waguispace.com/mobile/imgs/"+this.state.media_1}} style={{width: '100%', height: 90}}/>
                                    </View> 
                                : null }
                                { this.state.media_2 !=null ?
                                    <View style={{flex:1, marginRight: 10}}>
                                        <Image source={{uri: "http://www.waguispace.com/mobile/imgs/"+this.state.media_2}} style={{width: '100%', height: 90}}/>
                                    </View>
                                : null }
                                {this.state.media_3 != null ?
                                    <View style={{flex:1}}>
                                        <Image source={{uri: "http://www.waguispace.com/mobile/imgs/"+this.state.media_3}} style={{width: '100%', height: 90}}/>
                                    </View>
                                : null }
                            </View>
                        </View>
                    </Content>
                    <Footer>
                        <FooterTab style={{backgroundColor: colors.darkgreen}}>
                            <Button vertical onPress={this.editProduct}>
                                <Icon name="ios-create" style={{color:colors.white, fontSize: 20}}/>
                                <Text style={{color: colors.white}}>Modifier</Text>
                            </Button>
                            <Button vertical onPress={this.deleteProduction}>
                                <Icon name="ios-trash" style={{color:colors.white, fontSize: 20}}/>
                                <Text style={{color: colors.white}}>Supprimer</Text>
                            </Button>


                        </FooterTab>
                    </Footer>
                </Container>
        )
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