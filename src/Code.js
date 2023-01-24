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

// Function to find duplicates in a column and combine them in to one inlcuding the links
function fixDuplicates() {
  // Variables to select active sheet, its range, and data.
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var dataRange = sheet.getRange(2, 1, lastRow - 1, 2);
  var data = dataRange.getValues();
  // Array to hold links from matching VINs.
  var linksByVin = {};

  // Loop that goes through data length
  for(var i = 0; i < data.length; i++) {
    var col = data[i];
    var currentVin = col[0];
    var currentUrl = col[1];

    // Empty Vin
    //if(!currentVin.trim()) {
      //continue;
    //}

    // Saves first instance of a VIN to the array.
    if(!linksByVin[currentVin]) {
      linksByVin[currentVin] = Number(currentUrl);
    }
    // If there is a duplicate, add links
    else {
      linksByVin[currentVin] += currentUrl;
    }

    // Prepare for output
    var outputData = Object.keys(linksByVin).map(function(vin){
      return [vin, linksByVin[vin]];
    });

    // Clears old data
    dataRange.clearContent();

    // Write data
    var newDataRange = sheet.getRange(2, 1, outputData.length, 2);
    newDataRange.setValues(outputData);
    // Test
  }
};