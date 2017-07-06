// create an action creator
export function selectBook(book) {
	// selectBook is an ActionCreator
	// return an action = an object with a type property
	return {
		type: 'BOOK_SELECTED',
		payload: book 
	};
}