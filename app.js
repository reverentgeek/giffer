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
			this.searching = true;
			try {
				this.gifs = await searchApi( term );
				this.lastSearch = term;
			} catch ( err ) {
				console.error( err );
				this.error = "Something went wrong searching for gifs. Please try again.";
			} finally {
				this.searching = false;
			}
		},
		copy: async function ( gif ) {
			await window.clipboard.writeText( gif.url );
			this.copiedId = gif.id;
			setTimeout( () => {
				if ( this.copiedId === gif.id ) {
					this.copiedId = null;
				}
			}, 1500 );
		}
	}
} ).mount( "#app" );
