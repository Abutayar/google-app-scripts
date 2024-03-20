function createGoogleForm() {
  // Create a new Google Form
  var form = FormApp.create(<Form Title>);

  // Get the form's ID
  var formId = form.getId();

  populateDropdown(formId);

  // Get the form URL
  var formUrl = form.getPublishedUrl();

  // Log the form ID and URL
  Logger.log('Form ID: ' + formId);
  Logger.log('Form URL: ' + formUrl);

  // Add questions to the form in sections of 10
  var questions = getQuestions();
  var sectionSize = 10;

  for (var i = 0; i < questions.length; i += sectionSize) {
    var sectionQuestions = questions.slice(i, i + sectionSize);
    addSectionToForm(form, sectionQuestions, i / sectionSize + 1);
  }

  // Log a message indicating the form creation is complete
  Logger.log('Google Form created successfully!');
}

function populateDropdown(formId) {
  var form = FormApp.openById(formId);
  var sheet = SpreadsheetApp.openById(<Spreadsheet ID>).getSheetByName(<SheetName>);
  var range = sheet.getRange("A2:A29"); // Update the range accordingly

  var values = range.getValues();
  var items = [];

  for (var i = 0; i < values.length; i++) {
    items.push(values[i][0]);
  }

  var item = form.addListItem();
  item.setChoiceValues(items);
  Logger.log('Name Field Added');
}


function addSectionToForm(form, sectionQuestions, sectionNumber) {
  // Add a section header
  form.addSectionHeaderItem()
    .setTitle('Section ' + sectionNumber);

  // Add each question to the form with question numbers
  sectionQuestions.forEach(function (question, index) {
    var questionNumber = (sectionNumber - 1) * 10 + index + 1;

    // Add a paragraph text item for the question description
    form.addParagraphTextItem()
      .setTitle('Q' + questionNumber + ': ' + question.question)
      .setHelpText(question.description)
      .setRequired(true);
  });
}

function getQuestions() {
  var questions = [
    { question: "How do you declare an empty array in JavaScript?", description: "Briefly explain the process." },
    //add more question
  ];

  return questions;
}

