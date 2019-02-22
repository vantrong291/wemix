import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#26AE90',
        flex: 1,
        justifyContent: 'center',
        paddingRight: 20,
        paddingLeft: 20
    },
    inputStyle: {
        backgroundColor: '#fff',
        marginBottom: 15,
        fontSize: 18,
        paddingLeft: 15,
        height: 40
    },
    btnText: {
        backgroundColor: '#fff',
        paddingBottom: 10,
        paddingTop: 10,
        fontSize: 18,
        marginTop: 20,
        textAlign: 'center'
    },
    btnTextSignUp: {
        fontSize: 16,
        color: '#fff',
        marginTop: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    error: {
        borderWidth: 2,
        borderColor: 'red'
    }
});