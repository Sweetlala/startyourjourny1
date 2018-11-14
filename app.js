// submit the information
$(function () {

  $("#search").submit(function (e) {
    e.preventDefault();
    var departure = $("#dep").val();
    console.log(departure);
    var arrival = $("#arriv").val();
    console.log(arrival);
    var pass = $("#Passengers").val();
    console.log(pass);
    // var clas = $("#claseb").val();
    // console.log(clas);

    // var timdep =$("#fly-out").val();
    //date
    var date = new Date($('#fly-out').val());
    console.log(date); //Converting Date format into string to match with query string of API
    var dd = (date.getDate()).toString();     //Accessing DAy,Month Year For the dates
    var mm = (date.getMonth() + 1).toString();
    var yy = (date.getFullYear()).toString();

    var date1 = yy + mm + dd; //Got date in YYYYMMDD form

    //  console.log(depdt);
    // condition if there are any scope empty
    if ($("#dep").val() == "") {

      swal("you must put the Departure place ");

    } else if ($("#arriv").val() == "") {
      swal("you must put the Arraival place ");
    } else if ($("#fly-out").val() == "") {
      swal("you must enter Date ");
    } else if ($("#Passengers").val() === "Passengers") {
      swal("you must enter how many passengers? ");
    };

    getDeparture(departure, arrival, date1, pass);

  });
});
/////////////////////////////////////////////////////////////////
//Get Api // the real url
//https://developer.goibibo.com/api/search/?app_id=e28c4782&app_key=3c8216b31ce82dc973e14cbdf473ebc3&format=json&source=CPH&destination=BUD&dateofdeparture=20181112&seatingclass=E&adults=2&children=0&infants=0&counter=0
function getDeparture(departure, arrival, date1, pass) {
  var url = `https://developer.goibibo.com/api/search/?app_id=458906bd&app_key=1be55b0e0a6abb21a6968f9e30a2e3e3&format=json&source=${departure}&destination=${arrival}&dateofdeparture=${date1}&seatingclass=E&adults=${pass}&children=0&infants=0&counter=0`;
  console.log(url);
  // get json data
  // console.log(url)
  $.getJSON(url, function (response) {
    //console.log(response)
    hämtainfo(response);
  });
}
//---------------------------------------------
// Codes for Source Airport by mapping through another Json File
$('#dep').on('change', function () {

  fetch_sourcecode();
});
function fetch_sourcecode() {
  var src1 = $('#dep').val();
  $.getJSON("airports.json", function (responseTxt) {
    for (var i = 0; i < responseTxt.length; i++) {
      if (responseTxt[i].city.toUpperCase() === src1.toUpperCase()) {
        $('#dep').val(responseTxt[i].code);
        return;
      }
    }
  });
}
// Codes for Source Airport by mapping through another Json File
$('#arriv').on('change', function () {

  fetch_desticode();
});
function fetch_desticode() {      // Codes for Destination Airport by mapping through another Json File
  var src1 = $('#arriv').val();
  $.getJSON("airports.json", function (responseTxt) {
    for (var i = 0; i < responseTxt.length; i++) {
      if (responseTxt[i].city.toUpperCase() === src1.toUpperCase()) {
        $('#arriv').val(responseTxt[i].code);
        return;
      }
    }
  });
}





//---------------------------------------------- 
function hämtainfo(response) {
  $.each(response, function (i, result) {
    console.log(Response.onwardflights);
    var table = undefined;
    // if(typeof(result.onwardflights.airline && result.onwardflights.totalfare) != undefined) {
    //show the result in table
    //loop through array with for loop
    for (var i = 0; i < result.onwardflights.length; i++) {
      console.log('airline found');
      table = `
                 <table class="table">
                 <tbody>
                  <tr>
                    <td  class="cen">${response.data.onwardflights[i].airline}</td>
                    <td class="cen">${response.data.onwardflights[i].deptime}</td>
                    <td>${response.data.onwardflights[i].duration} <br><i class="fa fa-spinner fa-spin" style="font-size:24px"></i>
                    </td>
                    <td>${response.data.onwardflights[i].arrtime}<br> 
                    </td>
                    <td>${response.data.onwardflights[i]["fare"].totalfare} KR</td>
                    <td><button type="button" class="btn btn-primary">Boka</button></td>
                  </tr>
                </tbody>
              </table>
                `;
      $('#flight-body').append(table);
      $('#total').html(`Total Travels Is:${result.onwardflights.length}`);
      console.log('airline not found');
    }
  });


};
