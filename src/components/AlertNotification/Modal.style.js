import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {

    },
    modalContent: {
        backgroundColor: 'white',
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modal: {
        marginLeft: 40,
        marginRight: 40
    },
    buttonParent: {
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        height: 30,
        width: 40
    },

    textContent: {
        color: '#AFAFAF',
        marginTop: 20,
        alignSelf: 'flex-start',
        // fontWeight: '500',
        fontFamily: 'Roboto-Regular',
        fontSize:18,
    }
});