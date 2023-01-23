// Fetches every file name in a folder and outputs it to a spreadsheet
function fetchFolderContents() {
  // Looker Photo Uploads ID
  var folderId = DriveApp.getFolderById('1igJ-uH8rFlxG2RIVrwMkjz5EbG1ddqe1');

  // Method to grab file names from a folder
  var contents = folderId.getFiles();

  // Selects active sheet to output to, and clears it
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.clear();

  // Variables to hold data from current file selected
  var file;
  var name;
  var link;

  // Loop that runs until end of folder contents
  while(contents.hasNext()) {
    file = contents.next();
    name = file.getName();
    // Fixes the name by slicing everything after the '.'
    // last ensures it is the last '.' incase the name of the file already has a '.'
    nameFixed = name.slice(0, name.lastIndexOf("."));
    link = file.getUrl();
    sheet.appendRow([nameFixed, link]);
  }
};