import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDPu4gI516Z3xLVspNh01SYceO19bmFyE0';

// Create a new component. This component should produce some html.
// Using functional component, changed to class-based component later
/*const App = function() {
	return (
		<div>
			<SearchBar />
		</div>
	);
}*/

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			videos: [],
			selectedVideo: null
		};

		this.videoSearch('guns n roses');
	}

	videoSearch(term) {
		YTSearch({
			key: API_KEY,
			term: term
		}, (videos) => {
			this.setState({ 
				videos: videos,
				selectedVideo: videos[0]
			})
		});
	}

	render() {

		const videoSearch = _.debounce((term) => {
			this.videoSearch(term)
		}, 300);

		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch}/>
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList 
					onVideoSelect={ selectedVideo => this.setState({selectedVideo}) }
					videos={this.state.videos} />
			</div>
		)
	}
}


// Take this components generated html and put it on the page (in the DOM)
// render component instance of App by using <App /> instead of passing App component class to the render() function
ReactDOM.render( < App / > , document.querySelector('.container'));