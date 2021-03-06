/**
* Sample React Native App
* https://github.com/facebook/react-native
*/

import React, {
    Component
} from 'react';

import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    Platform,
    BackAndroid,
    NativeModules,
    Text,
    View
} from 'react-native';


class SecondReactActivity extends Component {
    constructor(props){
        super(props);

        this.state = {
            text: 'Welcome to Second React Activity!',
            navigateCount: 0
        };
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', ()=>this._backButton());
        }
    }

     _secondReactActivity(){
          NativeModules.RNIntentModule.openSecondReactActivity();
     }

      _thirdReactActivity(){
               NativeModules.RNIntentModule.openThirdReactActivity();
      }

     _backButton(){
             const {navigateCount} = this.state;
             if (navigateCount) {
                 NativeModules.RNIntentModule.backActivity(navigateCount)
                 return true;
             }
             return false;
     }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    {this.state.text}
                </Text>
                 <TouchableOpacity activeOpacity={0.8} onPress={this._thirdReactActivity}>
                    <Text style={styles.instructions}>
                        点击我，打开Android third React Activity页面
                    </Text>
                </TouchableOpacity>
                <Text style={styles.instructions}>
                    Shake or press menu button for dev menu
                </Text>
            </View>
        );
    }

    componentDidMount() {
        NativeModules.RNIntentModule.getDataFromIntent(
                    successMsg => this.setState({text: successMsg, navigateCount: 1}),
                    errorMsg => this.setState({text: errorMsg, navigateCount: 1})
         );
        NativeModules.ToastAndroid.show('Toast 是原生支持的!', 3000);
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', ()=>this._backButton());
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'red'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginTop: 15,
        marginBottom: 5,
        fontSize: 14,
    },
});

AppRegistry.registerComponent('SecondReactActivity', () => SecondReactActivity);
