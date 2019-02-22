import React from 'react';
import {Text, View} from 'react-native';
import {StackNavigator,} from 'react-navigation';

class Welcome extends React.Component {
    static navigationOptions = {header: null}

    render() {
        const {navigate} = this.props.navigation;
        return(
            <View style={{backgroundColor:'yellow', flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color:'red', marginTop: 50}}>Welcome !!!</Text>
            </View>
        )
    }
}

export default Welcome