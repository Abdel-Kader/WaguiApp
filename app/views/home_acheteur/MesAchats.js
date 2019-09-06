import React, { Component } from 'react';
import 
{
    View,
    Text,
    StyleSheet, 
    StatusBar,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import colors from '@modules/colors';

export default class MesAchats extends Component
{
    static navigationOptions = ({ navigation }) =>({
        title:"Mes produits achetés",
        headerStyle: 
        {
            backgroundColor: colors.green1,
        },
        headerTintColor: '#fff'
    });
    render()
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
                            Vous n'avez pas encore acheté de produit !
                        </Text>
                    </View>
                </View>
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