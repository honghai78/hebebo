import React, {Component} from 'react';
import {Text, View, Image, Alert, TouchableOpacity, ScrollView, Dimensions, Platform} from 'react-native';
import Modal from 'react-native-modal';
import styleModal from './Modal.style'
import PropTypes from 'prop-types';
const ANIMATION_TIME = 300;
var {height, width} = Dimensions.get('window');

export default class AlertNotification extends Component {

    constructor(props) {
        super(props);
    }

    _hideModal = () => {
        // this.setState({isVisible: false});
        this.props.onButtonPress();
    };

    _renderButton = (text) => (
        <TouchableOpacity style={styleModal.buttonParent} onPress={this._hideModal}>
            <View style={styleModal.button}>
                <Text style={{color: '#6FA0BA', fontWeight: '700', textAlign:'center',  fontSize: 16}}>{text}</Text>
            </View>
        </TouchableOpacity>
    );

    _renderModalContent = () => (
        <View style={styleModal.modalContent}>
            <Text style={this._getColorTextHeader(this.props.titleColor)}>{this.props.titleText}</Text>
            <ScrollView style={{maxHeight: height*50/100}}>
            <Text style={styleModal.textContent}>{this.props.contentText}</Text>
            </ScrollView>
            {this._renderButton(this.props.buttonText)}
        </View>
    );

    _getColorTextHeader(color) {
        return {
            color: color?color:'#FF7167',
            alignSelf: 'flex-start',
            // fontWeight: '500',
            fontFamily: 'Roboto-Regular',
            fontSize: 18,
        }
    }

    render() {
        if(this.props.titleText==null && this.props.contentText==null){
            return null;
        }
        return (
            <Modal
                isVisible={this.props.isVisible}
                // animationIn={'zoomInDown'}
                // animationOut={'zoomOutUp'}
                animationInTiming={ANIMATION_TIME}
                animationOutTiming={ANIMATION_TIME}
                backdropTransitionInTiming={ANIMATION_TIME}
                backdropTransitionOutTiming={ANIMATION_TIME}
                style={styleModal.modal}
                onRequestClose = {()=>this.props.onRequestClose()}
            >
                {this._renderModalContent()}
            </Modal>
        );
    }
}
AlertNotification.propsTypes = {
    isVisible: PropTypes.any,
    titleText: PropTypes.any,
    contentText: PropTypes.any,
    buttonText: PropTypes.any,
};
AlertNotification.defaultProps = {
    isVisible: true,
    titleText: null,
    contentText: null,
    buttonText: "OK",
};
