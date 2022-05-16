const { app, BrowserWindow } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

function copy(){
  var targetCode = document.getElementById("pass");  // コピー対象のテキストを選択する
  targetCode.select();  // コピーしたい要素を選択状態にする
  document.execCommand("Copy"); // 選択しているテキストをクリップボードにコピー
  alert("コピーしました！") // 任意でアラートを出す
}

function makePass(){
  
  //英数字を用意する
  var letters = 'abcdefghijklmnopqrstuvwxyz';
  var numbers = '0123456789';
  let password_symbol = '!"#$%&()=~|@[];:+-*<>?_>.,\'';

    var string  = letters + letters.toUpperCase() + numbers + password_symbol;
   //toUpperCase()  小文字を大文字に変換

    var len = 10;  //10文字
    var password=''; //文字列が空っぽという定義をする


    for (var i = 0; i < len; i++) {
     password += string.charAt(Math.floor(Math.random() * string.length));
     // charAt メソッドを用いて文字列から指定した文字を返す。
    }
  document.getElementById("pass").value = password;
}
