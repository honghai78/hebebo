import { StyleSheet } from 'react-native';
import PlatformUtil from '../../utils/PlatformUtil';

export default StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  container_greetingText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    // marginTop: -38,
    marginTop: -88,
  },

  logo: {
    width: 200,
    // width:100,
    height: 150,
    // width: 80,
    resizeMode: 'contain',
    //marginTop: -70,
    backgroundColor:'rgba(52,52,52,0)',
    //marginBottom: 33,
  },

  brand_name: {
      width: 150,
      // width:100,
      height: 80,
      // width: 80,
      resizeMode: 'contain',
      //marginTop: -70,
      backgroundColor:'rgba(52,52,52,0)',
      //marginBottom: 33,
  },

  app_name: {
    fontFamily: 'Omnes-Light',
    fontSize: 32,
    // fontWeight: '100',
    color: '#fff',
  },

  slogan: {
    color: '#666666',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '400',
    fontFamily: 'Roboto-Medium',
  },

  greeting_text: {
    color: '#6ea0ba',
    fontSize: 27,
    textAlign: 'center',
    fontWeight: '100',
    fontFamily: 'Roboto-Light',
  },
  backgroundImage: {
      flex: 1, // or 'stretch'
      justifyContent: 'center',
      alignItems: 'center',
    },
    status:{
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'center',
        color: '#666666',
        fontSize: 13
  }
});
