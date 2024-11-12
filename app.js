import { createApp } from "./node_modules/vue/dist/vue.esm-browser.prod.js";
const baseUrl = "https://api.giphy.com/v1/gifs/";
const apiKey = "i7goGcrvAUuxtHjBUErmG7aaXSiLu14v";

const searchApi = ( searchTerm ) => {
	const url = `${ baseUrl }search?api_key=${ apiKey }&q=${ searchTerm }&limit=25&offset=0&rating=G&lang=en`;
	return fetch( url ).then( res => {
		return res.json();
	} )
		.then( json => {
			return json.data.map( g => {
				return {
					id: g.id,
					gif: g.images.downsized.url,
					preview: g.images["480w_still"].url,
					url: g.images["480w_still"].url,
					title: g.title,
					showCopy: false
				};
			} );
		} )
		.catch( err => {
			console.log( err );
		} );
};

createApp( {
	data() {
		return {
			searchTerm: "",
			gifs: [],
			searching: false
		};
	},
	computed: {
		noGifs: function() {
			return this.gifs.length === 0;
		},
		notSearching: function() {
			return !this.searching;
		}
	},
	methods: {
		search: async function() {
			this.gifs = [];
			this.searching = true;
			const gifs = await searchApi( this.searchTerm );
			this.gifs = gifs;
			this.searching = false;
		},
		showGif: function( id ) {
			const gif = this.gifs.find( x => x.id === id );
			gif.url = gif.gif;
			gif.showCopy = true;
		},
		hideGif: function( id ) {
			const gif = this.gifs.find( x => x.id === id );
			gif.url = gif.preview;
			gif.showCopy = false;
		},
		copy: function( gif ) {
			console.log( gif );
			self.clipboard.writeText( gif );
		}
	}
} ).mount( "#app" );
