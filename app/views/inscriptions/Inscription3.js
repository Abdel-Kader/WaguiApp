import React, { Component } from 'react';
import {
    ImageBackground,
    View,
    Text,
    StyleSheet,
    ScrollView,
    AsyncStorage,
    TouchableHighlight
} from 'react-native';
import { CheckBox } from 'react-native-elements'
import colors from '@modules/colors'


export default class Inscription3 extends Component
{
    constructor(propos)
    {
        super(propos);
        this.state={
            checked1 : false,
            checked2 : false,
            checked3 : false,
            checked4 : false,
            checked5 : false,
            checked6 : false,
        }

        this._nextClick = this._nextClick.bind(this);
        this._cancelClick = this._cancelClick.bind(this);
        this._checkClick1 = this._checkClick1.bind(this);
        this._checkClick2 = this._checkClick2.bind(this);
        this._checkClick3 = this._checkClick3.bind(this);
        this._checkClick4 = this._checkClick4.bind(this);
        this._checkClick5 = this._checkClick5.bind(this);
        this._checkClick6 = this._checkClick6.bind(this);
    }
    static navigationOptions = ({ navigation }) =>({
        headerTintColor: colors.white,
        headerTransparent:true,
    });

    _nextClick(){
        const navigation = this.props.navigation;
        navigation.navigate("Inscription4");
    }

    _cancelClick(){
        AsyncStorage.setItem('completUser', 'ins3'); 
        const navigation = this.props.navigation;
        navigation.navigate("Main");
    }

    _checkClick1(){
        this.setState({
            checked1 : !this.state.checked1
        })
    }

    _checkClick2(){
        this.setState({
            checked2 : !this.state.checked2
        })
    }

    _checkClick3(){
        this.setState({
            checked3 : !this.state.checked3
        })
    }

    _checkClick4(){
        this.setState({
            checked4 : !this.state.checked4
        })
    }

    _checkClick5(){
        this.setState({
            checked5 : !this.state.checked5
        })
    }

    _checkClick6(){
        this.setState({
            checked6 : !this.state.checked6
        })
    }


    render()
    {
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
                                    Veuillez préciser les fruits ou légumes que vous cultivez au quotidien :
                                </Text>

                                <CheckBox
                                    title='Banane'
                                    checkedColor={colors.green1}
                                    checked={this.state.checked1}
                                    onPress={()=>this._checkClick1()}
                                    />
                                <CheckBox
                                    title='Choux'
                                    checkedColor={colors.green1}
                                    checked={this.state.checked2}
                                    onPress={()=>this._checkClick2()}
                                    />
                                <CheckBox
                                    title='Tubercule'
                                    checkedColor={colors.green1}
                                    checked={this.state.checked3}
                                    onPress={()=>this._checkClick3()}
                                    />
                                <CheckBox
                                    title='Laitue'
                                    checkedColor={colors.green1}
                                    checked={this.state.checked4}
                                    onPress={()=>this._checkClick4()}
                                    />
                                <CheckBox
                                    title='Tomates'
                                    checkedColor={colors.green1}
                                    checked={this.state.checked5}
                                    onPress={()=>this._checkClick5()}
                                    />
                                <CheckBox
                                    title='Oseille'
                                    checkedColor={colors.green1}
                                    checked={this.state.checked6}
                                    onPress={()=>this._checkClick6()}
                                    />
                            </View>
                            <View style={style.buttonView}>
                                <TouchableHighlight onPress={()=> this._cancelClick()}>
                                    <Text style={{color:colors.white, fontSize: 20,fontWeight: '700'}}>Plus tard</Text>
                                </TouchableHighlight>
                                <View style={{flex:1,alignItems: 'flex-end'}}>
                                    <TouchableHighlight onPress={()=> this._nextClick()}>
                                        <Text style={{color:colors.white, fontSize: 20,fontWeight: '700'}}>Suivant ->></Text>
                                    </TouchableHighlight>
                                </View>
                                
                            </View>
                        
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
            flex:1,
            marginLeft: 30,
            marginRight: 30,
            marginTop: 80
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