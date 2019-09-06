import React, { Component } from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import colors from '@modules/colors'
import { Card, Icon  } from 'react-native-elements'
import RoundedButton from '@components/buttons/RoundedButton'
import AsyncStorage from '@react-native-community/async-storage';

class Profil extends Component 
{
  
  constructor(props)
  {
    super(props);
    this.state={
      userName :"",
      userPrenom : "",
      Username : "",
      Userprofil : "",
    } 
  }

componentDidMount= async()=> {
  try { 
      const nom = await AsyncStorage.getItem('userName');
      const prenom = await AsyncStorage.getItem('userPrenom');
      const tel = await AsyncStorage.getItem('userTel');
      const profil = await AsyncStorage.getItem('userPhoto');
      if (nom !== null) 
      {
        this.setState({userName: nom, userPrenom: prenom, userPhone: tel, Username: nom+" "+prenom, Userprofil: profil})
      }
  } catch (error) {

  }
}
static navigationOptions = ({ navigation }) =>({
  title:"Mon profil",
  headerStyle: 
  {
      backgroundColor: colors.green1,
  },
  headerTintColor: '#fff'
});

  render() 
  {
    const { Username, userPhone } = this.state;
    return ( 
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            <View>
              <View style={styles.headerColumn}>
                <Image
                style={styles.userImage}
                source={{uri: "file:///storage/emulated/0/Pictures/Wagui/Media/Wagui profil/"+this.state.Userprofil}}/>
                <Text style={styles.userNameText}>{Username}</Text>
                {/* <View style={styles.userAddressRow}>
                    <View>
                        <Icon
                        name="place"
                        underlayColor="transparent"
                        iconStyle={styles.placeIcon}
                        />
                    </View>
                    <View style={styles.userCityRow}>
                        <Text style={styles.userCityText}>
                        Dakar, Sénégal
                        </Text>
                    </View>
                </View> */}
              </View>
            </View>
            <View style={styles.telContainer}>
                <View style={styles.iconRow}>
               
                    <Icon
                    name="call"
                    underlayColor="transparent"
                    iconStyle={styles.telIcon}
                    />
                </View>
                <View style={styles.telRow}>
                <View style={styles.telNumberColumn}>
                    <Text style={styles.telNumberText}>{userPhone}</Text>
                </View>
                <View style={styles.telNameColumn}>
                    <Text style={styles.telNameText}>Mobile</Text>
                </View>
                </View>
                <View style={styles.smsRow}>
                <Icon
                    name="textsms"
                    underlayColor="transparent"
                    iconStyle={styles.smsIcon}
                />
                </View>
            </View>
           
          </Card>
          <View style={{flex: 1,justifyContent: 'flex-end',marginTop:200}}>
            <RoundedButton
                    disabled={false}
                    text={"Modifier mon profil"}
                    textColor={colors.white}
                    btnColor={colors.green1}/>
          </View>
          
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  headerColumn: {
    paddingTop: 35,
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    //backgroundColor: 'green',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: '#A5A5A5',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: colors.green1,
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },

  separatorContainer: {
    flexDirection: 'row',
    flex:1
  },
  separatorOffset: {
    flex: 2,
    flexDirection: 'row',
  },
  separator: {
    flex: 8,
    flexDirection: 'row',
    borderColor: '#EDEDED',
    borderWidth: 0.8,
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
  },
  smsIcon: {
    color: 'gray',
    fontSize: 30,
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: '#ECECEC',
  },
  smsRow: {
    flex: 2,
    justifyContent: 'flex-start',
  },
  telIcon: {
    color: '#01C89E',
    fontSize: 30,
  },
  telNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  telNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200',
  },
  telNumberColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  telNumberText: {
    fontSize: 17,
    color: colors.green1,
    fontWeight: '700'
  },
  telRow: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

export default Profil