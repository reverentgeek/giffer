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
			url: g.images.downsized.url,
			animated: g.images.fixed_width.url,
			still: g.images.fixed_width_still.url,
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
			copyError: "",
			status: "",
			copyTimer: null,
			activeId: null,
			copiedId: null
		};
	},
	mounted() {
		// wait for v-cloak to be removed so the input is focusable
		this.$nextTick( () => this.$refs.searchText.focus() );
	},
	methods: {
		search: async function () {
			const term = this.searchTerm.trim();
			if ( !term || this.searching ) {
				return;
			}
			this.gifs = [];
			this.error = "";
			this.copyError = "";
			this.copiedId = null;
			this.status = "Searching…";
			this.searching = true;
			try {
				this.gifs = await searchApi( term );
				this.lastSearch = term;
				this.status = this.gifs.length ? `${ this.gifs.length } GIFs found.` : `No GIFs found for ${ term }. Try a different keyword.`;
			} catch ( err ) {
				console.error( err );
				this.error = "Something went wrong searching for gifs. Please try again.";
				this.status = this.error;
			} finally {
				this.searching = false;
			}
		},
		copy: async function ( gif ) {
			clearTimeout( this.copyTimer );
			this.copiedId = null;
			this.copyError = "";
			this.status = "";
			try {
				await window.clipboard.writeText( gif.url );
				this.copiedId = gif.id;
				this.status = "Copied!";
				this.copyTimer = setTimeout( () => {
					this.copiedId = null;
				}, 1500 );
			} catch ( err ) {
				console.error( err );
				this.copyError = "Couldn’t copy. Try again.";
			}
		}
	}
} ).mount( "#app" );
