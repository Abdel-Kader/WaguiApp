import React, { Component } from 'react';
import propTypes from 'prop-types';
var Spinner = require('react-native-spinkit');
import {
    View,
    Modal,
    StyleSheet
} from 'react-native';

export default class Loader extends Component {

    render(){
        const { animationType, modalVisible } = this.props;
        return(
            <Modal
                animationType={animationType}
                visible={modalVisible}
                transparent={true}>
                <View
                    style={styles.wrapper}>
                    <View style={styles.loaderContainer}>
                        <Spinner
                            isVisible={true}
                            type="Bounce"
                            size= {100}
                            color= "#FFFFFF"/>
                    </View>

                </View>

            </Modal>
        )
    }
}

Loader.propTypes = {
    animationType: propTypes.string.isRequired,
    modalVisible: propTypes.bool.isRequired
};

const styles = StyleSheet.create({
    wrapper: {
        zIndex: 9,
        backgroundColor: 'rgba(0,0,0,0.6)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0
    },
    loaderContainer: {
        width: 90,
        height: 90,
        borderRadius: 15,
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: -45,
        marginTop: -45
    },
    loaderImage: {
        width: 90,
        height: 90,
        borderRadius:5
    }
});