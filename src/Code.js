// Log the name of every file in the user's Drive.
function logNamesOfFiles() {
  var files = DriveApp.getFiles();

  while (files.hasNext()) {
    var file = files.next();
    Logger.log(file.getName());
  }
};

// Fetches every file name in a folder and outputs it to a spreadsheet
function fetchFolderContents() {
  // Looker Photo Uploads ID
  var folderId = DriveApp.getFolderById('1igJ-uH8rFlxG2RIVrwMkjz5EbG1ddqe1');

  // Method to grab file names from a folder
  var contents = folderId.getFiles();

  // Selects active sheet to output to, and clears it
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.clear();

  // Stores current file name before being appended to sheet
  var file;

  // Loop that runs until end of folder contents
  while(contents.hasNext()) {
    file = contents.next();
    sheet.appendRow([file.getName()])
  }
  // Test 123
};