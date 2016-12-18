var maxCount = {
  "1月1日 会場A" : 1,
  "1月2日 会場A" : 1,
  "1月3日 会場B" : 1,
  "1月4日 会場B" : 1,
  "1月5日 会場C" : 1,
}
var answerTitle = "候補日";

// スプレッドシートのID
var ssId = "1MmSTZ9xhf8bgt_I8PT6m_3E1ss4t1MYmK9QrKPmgZJE";

function myFunction() {
  var ss = SpreadsheetApp.openById(ssId);
  var sheet = ss.getSheetByName("フォームの回答 1");
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange(2, 2, lastRow, 1); // B2:BXまで取得（Xは最後の行）
  var values = range.getValues();
  Logger.log(values);

  var answerMap = {}
  
  // 回答数をカウント
  for (var i = 0; i < values.length; i++) {
    var answer = values[i][0];
    if (!answerMap[answer]) {
      answerMap[answer] = 0;
    }
    answerMap[answer]++;
  }
  Logger.log(answerMap);
  
  var form = FormApp.getActiveForm();
  var items = form.getItems();
  var item = null;
  for (var i = 0; i < items.length; i++) {
    item = items[i];
    if (item.getTitle() === answerTitle) {
      item = item.asMultipleChoiceItem();
      break;
    }
  }
  
  var resultAnswers = [];
  for (var key in maxCount) {
    var aCount = answerMap[key];
    var mCount = maxCount[key];
    Logger.log(key + " : " + aCount + " : " + mCount);
    if (!aCount || aCount < mCount) {
      resultAnswers.push(item.createChoice(key));
    }
  }
  item.setChoices(resultAnswers);
}
