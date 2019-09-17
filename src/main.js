const { app, BrowserWindow } = require( "electron" );
let mainWindow;

app.on( "ready", async () => {
  mainWindow = new BrowserWindow( {
    width:850,
    height: 500,
    webPreferences: {
      nodeIntegration: true
    }
  } );
  await mainWindow.loadFile( "index.html" );
  mainWindow.webContents.openDevTools( { mode: "detach" } );
} );

