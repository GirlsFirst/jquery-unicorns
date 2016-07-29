
$(document).ready(function() {

	//ajax call for loading data and then appending it
	$.ajax({
      url:JSONURL,
      success: function(data){
      	//data is all the JSON that is returned from the AJAX call
          readDataAndAppend(data);
      }
  })

	//on submission of the html form, get the data
	$("#unicorn-form").submit(function(event){
		event.preventDefault();
		var data = $(this).serialize();
		console.log(data)

		$.ajax({
    	url: "https://script.google.com/macros/s/AKfycbxSHmtqylt1ekdy4j761bFx7YW6xDr0BNvdht3xRY6bPgeFMaYY/exec",
      type: "POST",
		  data: data
  	});
	})



})

//global variable for url needed to access Google Spreadsheet data as JSON
var JSONURL = 'https://spreadsheets.google.com/feeds/list/1Ca9Grr_TcSyuU_i-s8rukzlRVMmyr8kwyDdLuDTBSQo/1/public/basic?alt=json';


function readDataAndAppend(data){
    var rows = [];
    var cells = data.feed.entry;
    
    for (var i = 0; i < cells.length; i++){
        var rowObj = {};
        rowObj.timestamp = cells[i].title.$t;
        var rowCols = cells[i].content.$t.split(',');
        for (var j = 0; j < rowCols.length; j++){
            var keyVal = rowCols[j].split(':');
            rowObj[keyVal[0].trim()] = keyVal[1].trim();
        }
        rows.push(rowObj);
    }


    //code to parse through rows array and grab the data you need, and append it 
    for (var i = 0; i < rows.length; i++) {
    	//rename rows[i] just to make sure I know what I am working with
    	var unicornObject = rows[i];

    	//turn all of the data into html strings
    	var headerName = "<h3>" + unicornObject.name + "</h3>"
    	var colorText = "<p>" + unicornObject.color + "</p>"
    	var magicPowerText = "<p>" + unicornObject.magic + "</p>"

    	//add all the strings together into an html string that gets appended to a div that already exists on my HTML
    	$("#my-unicorns").append(headerName + colorText + magicPowerText)
    }
}






