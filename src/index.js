import React, {Component} from 'react'
import {Platform, View, StatusBar, StyleSheet, Text, ImageBackground, ActivityIndicator, Dimensions, Navigator,  BackAndroid} from 'react-native'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Actions from './actions';
import Home from "./layouts/home";
import SplashScreen from "./layouts/SplashScreen/splashScreen";
import * as image from './images'
import AlertNotification from './components/AlertNotification/AlertNotification'
import { Root } from "native-base";

const StatusBarCustom = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, {backgroundColor}]}>
        <StatusBar backgroundColor={backgroundColor} {...props} />
    </View>
);
class App extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {

    }
    componentWillReceiveProps(nextProps) {

    }

    render() {
        var objLoading = null;
        if (this.props.state.isShowProgressBar) {
            var width = Dimensions.get('window').width;
            var height = Dimensions.get('window').height;
            objLoading = (
                <View style={{
                    flex: 1, position: 'absolute', zIndex: 10, backgroundColor: 'rgba(52, 52, 52, 0.3)',
                    alignItems: 'center', justifyContent: 'center', width: width, height: height
                }}>
                    <ActivityIndicator
                        style={[{
                            padding: 8,
                            position: 'absolute',
                            zIndex: 11,
                            width: 50,
                            height: 50,
                            top: height / 2 - 25,
                            left: width / 2 - 25
                        }, {transform: [{scale: 1.5}]}]}
                        size="large"
                        color="#0000ff"
                    />
                    <Text style={{
                        color: "#FF7167",
                        fontWeight: '600',
                        marginTop: 60
                    }}>{this.props.state.textOfProgressBar}</Text>
                </View>
            )
        }
       let alertNotification = (<AlertNotification isVisible={this.props.state.isShowModal}
                           onButtonPress={() => {
                               if(this.props.state.okAction!=null){
                                   this.props.state.okAction();
                               }else {
                                   this.props.actions.setShowModal(false, "", "");
                                   if(this.props.state.isShowProgressBar==true){
                                       this.props.actions.setShowProgressBar(false);
                                   }
                               }
                           }}
                           onRequestClose = {()=>{
                               // this.props.functions.setShowModal(false, "", "");
                               // this.props.functions.setShowProgressBar(false);
                           }}
                           titleText={this.props.state.titleModal}
                           contentText={this.props.state.contentModal}
                           titleColor={this.props.state.ntfType != null ? '#373737' : '#FF7167'}/>);

                    return ( <View style={{flex: 1}}>
                        <StatusBarCustom backgroundColor='#1F5F1F' barStyle="light-content"/>
                        <Home/>
                        {objLoading != null ? objLoading : null}
                        {alertNotification}
                    </View>)
        }

}
const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        statusBar: {
            height: Platform.OS === 'ios' ? 20 : 0,
        }
    }
);

function mapStateToProps(state) {
    return {
        state: {...state.AppReducer}
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...Actions.AppActions}, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
