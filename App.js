import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { View, Platform, StatusBar } from 'react-native';
import AddEntry from './components/AddEntry';
import  { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import History from './components/History';
import { TabNavigator, StackNavigator } from 'react-navigation';
import  { purple, white } from './utils/color';
import { Constants } from 'expo'
import EntryDetail from './components/EntryDetail';

function UdaciStatusBar ({ backgroundColor, ...props}) {
	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight}}>
			<StatusBar translucent backgroundColor= {backgroundColor} {...props} />
		</View>
	)
}


const Tabs = TabNavigator ({ //first argument to tab navigator
	History: {
		screen: History,
		navigationOptions: {
			tabBarlabel: 'History',
			tabBarIcon: ({ tintColor }) => <Ionicons name ='ios-bookmarks' size={30} color={tintColor}/>
		}
	},

	AddEntry: {
		screen: AddEntry,
		navigationOptions: {
			tabBarlabel: 'AddEntry',
			tabBarIcon: ({ tintColor }) => <Ionicons name ='ios-bookmarks' size={30} color={tintColor}/>
		}
	}

}, { //2nd argument to tab Navigator
	navigationOptions: {
		header:null
	}
},

{ //3rd argument to tab Navigator
	tabBarOptions: {
		activeTintColor: Platform.OS === 'ios' ? purple : white,
		style: {
			height: 56,
			backgroundColor: Platform.OS === 'ios' ? white : purple,
			shadowColor: 'rgba(0,0,0,0.24)',
			shadowOffset: {
				width: 0,
				height: 3
			},
			shadowRadius: 6,
			shadowOpacity: 1
		}
	}


})

const MainNavigator = StackNavigator({
	Home: {
		screen: Tabs,
	},
	EntryDetail: {
		screen: EntryDetail,
		navigatorOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: purple
			}
		}
	}
})




export default class App extends React.Component {
  render() {
    return (
		<Provider store={createStore(reducer)}>
		<View style={{flex: 1}}>
			<UdaciStatusBar backgroundColor={purple} barStyle='light-content'/>
		<MainNavigator/>
		</View>
		</Provider>
    //   <View style={styles.container}>
	// 	<Ionicons name='ios-pizza' color='red' size={100}/>
	//   </View>
	
	
	
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
