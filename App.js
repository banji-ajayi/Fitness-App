import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import AddEntry from './components/AddEntry';
import  { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import History from './components/History';

export default class App extends React.Component {
  render() {
    return (
		<Provider store={createStore(reducer)}>
		<View style={{flex: 1}}>
		<History/>
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
