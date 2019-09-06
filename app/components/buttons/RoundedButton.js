import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import colors from '@modules/colors';

export default class RoundedButton extends Component {
    render() {
        const { disabled, handleNextButton,btnColor,text, textColor } = this.props;
        const opacityStyle = disabled ? 0.8 : 1;
        return (
            <View style={styles.nextButtonWrapper}>
                <TouchableHighlight
                    style={[{opacity:opacityStyle,backgroundColor:btnColor}, styles.button]}
                    onPress={handleNextButton}
                    disabled={disabled}>
                        <Text style={[{color: textColor},styles.textStyle]}>{text}</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

RoundedButton.propTypes = {
    disabled: PropTypes.bool,
    handleOnPress: PropTypes.func,
    btnColor: PropTypes.string,
    textColor: PropTypes.string,
    text: PropTypes.string
};
const styles = StyleSheet.create({
    nextButtonWrapper : {
        //bottom : 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        height: 50,
        width: '75%',
        marginLeft: '12.5%'

    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});