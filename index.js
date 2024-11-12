import { app, BrowserWindow } from "electron";
import path from "node:path";

const __dirname = import.meta.dirname;

let mainWindow;

app.whenReady().then( async () => {
	mainWindow = new BrowserWindow( {
		width: 850,
		height: 500,
		center: true,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join( __dirname, "app-preload.mjs" )
		}
	} );
	await mainWindow.loadFile( "app.html" );
	// mainWindow.webContents.openDevTools( { mode: "detach" } );
} );

