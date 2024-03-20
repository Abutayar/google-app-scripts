// Script used to populate dropdown option in form from spreadsheet 
function populateDropdown() {
  var form = FormApp.openById(<FORM ID>);
  var sheet = SpreadsheetApp.openById(<SpreadSheet ID>).getSheetByName(<SheetName>);
  var range = sheet.getRange(<Sheet Range>); // Update the range accordingly

  var values = range.getValues();
  var items = [];

  for (var i = 0; i < values.length; i++) {
    items.push(values[i][0]);
  }

  var item = form.getItems(FormApp.ItemType.LIST)[0].asListItem();
  item.setChoiceValues(items);
}