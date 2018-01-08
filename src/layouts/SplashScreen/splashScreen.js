import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    BackAndroid,
    Platform,
    Alert,
    PixelRatio,
    Dimensions,
    NetInfo
} from 'react-native';
import styles from './styles';
import {images} from "../../images";

export default class SplashScreen extends Component {
    constructor(probs) {
        super(probs);
    }

    _renderSplashView() {
        return (<View style={styles.container}>
            <View style={styles.backgroundImage}>
                <Image source={images.logo} style={styles.logo}/>
                <Image source={images.logo_text} style={styles.brand_name}/>
            </View>
        </View>);
    }

    render() {
        return this._renderSplashView();
    }
}