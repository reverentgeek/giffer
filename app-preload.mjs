import { clipboard, contextBridge } from "electron";

contextBridge.exposeInMainWorld( "clipboard", {
	writeText: ( text ) => clipboard.writeText( text )
} );
