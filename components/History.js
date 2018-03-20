import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helper'
import { fetchCalendarResults } from '../utils/api';
import UdaciFitnessCalendar from 'udacifitness-calendar';
import { white } from '../utils/color';
import DateHeader from '../components/DateHeader';
import { AppLoading } from 'expo';
import MetricCard from './MetricCard';

class History extends Component {
	state = {
		ready: false
	}
	componentDidMount() {
		const { dispatch } = this.props

		fetchCalendarResults()
			.then((entries) => dispatch(receiveEntries(entries)))
			.then(({entries}) =>{
				if(!entries[timeToString]) { //if entries at the current day is falsey, then go ahead and dispatch
					dispatch(addEntry({
						[timeToString()]: getDailyReminderValue()
					}))
				}
			})
			.then(() => this.setState(() => ({ready: true})))
	}

renderItem = ({today, ...metrics}, formattedDate, key) => ( //params gives us an implicit return
	<View style={styles.item}>
		{today
		? <View>
			<DateHeader date={formattedDate} />
			<Text style={styles.noDataText}>
			{today}
			</Text>
		   </View>
		: <TouchableOpacity onPress={() => this.props.navigation.navigate(
			'EntryDetail', //Entry Detail screen
			{entryId: key} // key/Id passed to renderItem above
		)}>
			<MetricCard metrics={metrics} date={formattedDate}/>
		  </TouchableOpacity>
	}
	</View>
)

renderEmptyDate(formattedDate) {
	return(
		<View style={styles.item}>
		<DateHeader date={formattedDate}/>
		<Text style={styles.noDataText}>
		No Data logged for this day
		</Text>
		</View>
	)
}

	render() {
		const { entries } = this.props;
		const { ready } = this.state;

		if (ready === false) {
			return <AppLoading />
		}

		return (
		    <UdaciFitnessCalendar
				items = {entries}
				renderItem={this.renderItem}
				renderEmptyDate={this.renderEmptyDate}
			/>
		)
	}	
}

const styles = StyleSheet.create({
item: {
	backgroundColor: white,
	borderRadius: Platform.OS === 'ios' ? 16 : 2,
	padding: 10,
	marginLeft: 10,
	marginRight: 10,
	marginTop: 17,
	justifyContent: 'center',
	shadowRadius: 3,
	shadowOpacity: 0.8,
	shadowColor: 'rgba(0,0,0,0.24)',
	shadowOffset: {
		width: 0,
		height: 3,
	}
},
noDataText: {
	fontSize: 20,
	paddingTop: 20,
	paddingBottom: 20,
}

})

function mapStateToProps (entries) {
	return {
		entries
	}
}

export default connect(mapStateToProps)(History)