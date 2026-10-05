import { app, BrowserWindow, clipboard, ipcMain } from "electron";
import path from "node:path";

const __dirname = import.meta.dirname;

let mainWindow;

app.whenReady().then( async () => {
	ipcMain.handle( "clipboard:writeText", ( event, text ) => clipboard.writeText( text ) );

	mainWindow = new BrowserWindow( {
		width: 850,
		height: 500,
		center: true,
		webPreferences: {
			preload: path.join( __dirname, "app-preload.cjs" )
		}
	} );
	await mainWindow.loadFile( "app.html" );
	// mainWindow.webContents.openDevTools( { mode: "detach" } );
} );
