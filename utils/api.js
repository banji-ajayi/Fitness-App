import { AsyncStorage } from 'react-native';
import { CALENDAR_STRORAGE_KEY, formatCalendarResults } from './_calendar';

export function fetchCalendarResults () {
	return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
		.then(formatCalendarResults)
}

export function submitEntry ({ entry, key }){
	return AsyncStorage.mergeItem(CALENDAR_STRORAGE_KEY, JSON.stringify({
		[key]: entry,
	}))
}

export function removeEntry (key) {
	return AsyncStorage.getItem(CALENDAR_STRORAGE_KEY)
	.then( (results) => {
		const data = JSON.parse(results);
		data[key] = undefined;
		delete data[key];
		AsyncStorage.setItem(CALENDAR_STRORAGE_KEY, JSON.stringify(data));
	})
}