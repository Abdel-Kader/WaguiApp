import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import VenteHome from "@views/home_agriculteur/production/VenteHome";
import AjouterProduction from "@views/home_agriculteur/production/AjouterProduction";
import Icon from 'react-native-vector-icons/FontAwesome'
import colors from '@modules/colors'
import React from "react";


// export const ExploreTab = createStackNavigator({
//    ExploreContainer: {screen: ExploreContainer},
//    DetailArticle: {screen: DetailArticle}
// },{
//     mode: 'modal'
// });

const ProductionTabNavigator = createBottomTabNavigator({
    VenteHome: {screen: VenteHome,
        navigationOptions: {
            tabBarIcon: ({tintColor}) =>(<Icon name="home" size={25} color={tintColor}/>),
        }},
    AjouterProduction: AjouterProduction
}, {
    tabBarOptions : {
        fontWeight: '600',
        marginBottom: 5,
        activeTintColor: colors.or,
        showLabel: false
    },
    initialRouteName: 'VenteHome'
});




export default ProductionTabNavigator;