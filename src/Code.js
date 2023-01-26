// Fetches every file name in a folder and outputs it to a spreadsheet
function fetchFolderContents() {
  // Looker Photo Uploads ID
  var folderId = DriveApp.getFolderById('1igJ-uH8rFlxG2RIVrwMkjz5EbG1ddqe1');

  // Method to grab file names from a folder
  var contents = folderId.getFiles();

  // Selects Sheet by Name and then clears a specific range.
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Script");
  var lastRow = sheet.getLastRow();
  // Row, Column, Num Rows, Num Columns
  var range = sheet.getRange(2, 1, lastRow, 5)
  range.clear();

  // Variables to hold data from current file selected
  var file;
  var name;
  var link;

  // Start at Row 2 and Increment for the total amount of data in the while loop
  var row = 2;

  // Loop that runs until end of folder contents
  while(contents.hasNext()) {
    file = contents.next();
    name = file.getName();
      var fileLink = [];
    // Fixes the name by slicing everything after the '.' and '_'
    // last ensures it is the last '.' incase the name of the file already has a '.' or '_'
    nameFixed = name.slice(0, name.lastIndexOf("."));
    nameFixed = nameFixed.slice(0, nameFixed.lastIndexOf('_'));
    link = file.getUrl();
    fileLink = [nameFixed, link];
    //sheet.appendRow([nameFixed, link]);
    sheet.getRange(row, 1, 1, fileLink.length).setValues([fileLink]);
    row++;
    console.log("Array:",fileLink);
  }
};

// Function to find duplicates in a column and combine them in to one including the links
function fixDuplicates() {
  // Variables to select active sheet, its range, and data.
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Script");
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

    // Saves first instance of a VIN to the array.
    if(!linksByVin[currentVin]) {
      linksByVin[currentVin] = currentUrl;
    }
    // If there is a duplicate, add links
    else {
      linksByVin[currentVin] += ', ' + currentUrl;
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

    var rangeFix = sheet.getRange("B2:B" + lastRow);
    rangeFix.splitTextToColumns(", ");
  }
};