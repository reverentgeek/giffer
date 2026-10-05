// eslint-disable-next-line n/no-unpublished-import
import { createApp } from "./node_modules/vue/dist/vue.esm-browser.prod.js";
const baseUrl = "https://api.giphy.com/v1/gifs/";
const apiKey = "i7goGcrvAUuxtHjBUErmG7aaXSiLu14v";

const searchApi = async ( searchTerm ) => {
	const params = new URLSearchParams( {
		api_key: apiKey,
		q: searchTerm,
		limit: 25,
		offset: 0,
		rating: "G",
		lang: "en"
	} );
	const res = await fetch( `${ baseUrl }search?${ params }` );
	if ( !res.ok ) {
		throw new Error( `Giphy search failed: ${ res.status } ${ res.statusText }` );
	}
	const json = await res.json();
	return json.data.map( ( g ) => {
		return {
			id: g.id,
			gif: g.images.downsized.url,
			preview: g.images["480w_still"].url,
			title: g.title
		};
	} );
};

createApp( {
	data() {
		return {
			searchTerm: "",
			lastSearch: "",
			gifs: [],
			searching: false,
			error: "",
			hoveredId: null,
			copiedId: null
		};
	},
	methods: {
		search: async function () {
			this.gifs = [];
			this.error = "";
			this.searching = true;
			try {
				this.gifs = await searchApi( this.searchTerm );
				this.lastSearch = this.searchTerm;
			} catch ( err ) {
				console.error( err );
				this.error = "Something went wrong searching for gifs. Please try again.";
			} finally {
				this.searching = false;
			}
		},
		copy: async function ( gif ) {
			await window.clipboard.writeText( gif.gif );
			this.copiedId = gif.id;
			setTimeout( () => {
				if ( this.copiedId === gif.id ) {
					this.copiedId = null;
				}
			}, 1500 );
		}
	}
} ).mount( "#app" );
