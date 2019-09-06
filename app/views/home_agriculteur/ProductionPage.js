import React, { Component } from 'react';
import ProductionTabNavigator from '../../navigations/ProductionNavigator';

export default class ProductionPage extends Component 
{
    static navigationOptions = () =>({
        gesturesEnabled: true,
        headerTransparent:true,
        headerMode: 'none',
        mode: 'modal',
    });
    render()
    {
        return(
            <ProductionTabNavigator/>
        )
    }
}