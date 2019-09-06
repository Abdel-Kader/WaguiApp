import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '@modules/colors';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

export default class InputFieldBordered extends Component {
    constructor(props){
        super(props);
        this.state={
            secureInput : props.inputType === 'text' || props.inputType === 'email' ? false : true,
            
        };
        this.toggleShowPassword = this.toggleShowPassword.bind(this);
    }
    
    toggleShowPassword() {
        this.setState({ secureInput: !this.state.secureInput });
    }
    render(){
        const { labelText, labelTextSize, labelColor, textColor, borderColor, inputType, customStyle, onChangeText, textValue, autoFocus, autoCapitalize, multiline,numberOfLines, iconText}  = this.props;
        const { secureInput } = this.state;
        const fontSize = labelTextSize || 14;
        const color = labelColor || colors.white;
        const inputColor = textColor || colors.white;
        const border = borderColor || 'transparent';
        const keyboardType = inputType === 'phone-pad' ? 'phone-pad' : 'default';

        return(
            <View style={[customStyle, styles.wrapper]}>
                <Text style={[{fontSize}, {color}, styles.label]}>{labelText}</Text>
                { inputType === 'password' ?
                    <TouchableOpacity
                        style={styles.showButton}
                        onPress={this.toggleShowPassword}>
                        <Text style={styles.showButtontext}>{ secureInput ? <Icon name='eye-slash' size={17} color={colors.green1}/> : <Icon name='eye' size={17} color={colors.green1}/>}</Text>
                    </TouchableOpacity>
                : null }
                
                <TextInput
                    autoCorrect={false}
                    style={[{color: inputColor, borderColor:border}, styles.inputField]}
                    secureTextEntry={secureInput}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    value={textValue}
                    autoFocus={autoFocus}
                    autoCapitalize={autoCapitalize}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                />
                <View style={styles.checkmarkWrapper}>
                    <Icon name={iconText} size = {25} color={colors.green1} />
                </View>
            </View>
        )
    }
}

InputFieldBordered.propTypes = {
    labelText: PropTypes.string.isRequired,
    iconText: PropTypes.string,
    labelTextSize: PropTypes.number,
    labelColor: PropTypes.string,
    textColor: PropTypes.string,
    borderColor : PropTypes.string,
    inputType:PropTypes.string.isRequired,
    customStyle: PropTypes.object,
    onChangeText: PropTypes.func,
    textValue: PropTypes.string,
    autoFocus: PropTypes.bool,
    autoCapitalize: PropTypes.bool,
    multiline: PropTypes.bool,
    numberOfLines: PropTypes.number
};

const styles = StyleSheet.create({
   wrapper: {
       display: 'flex',
   },
   label: {
       fontWeight: '700',
       marginBottom: 15
   },
    inputField: {
       borderWidth: 1,
       paddingTop: 5,
       paddingBottom: 5,
       paddingLeft: 20,
       backgroundColor: 'transparent',
       borderColor: colors.green1
    },
    showButton: {
       position: 'absolute',
        right: 10,
        top:10
    },
    showButtontext: {
       color: colors.white,
       fontWeight: '700',
    },
    checkmarkWrapper: {
       position: 'absolute',
       left: 5,
       bottom: 10
    }
});