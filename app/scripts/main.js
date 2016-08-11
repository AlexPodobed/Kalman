$(function () {
  var source = $('#formRowTemplate').html();
  var template = Handlebars.compile(source);
  var KALMAN_API = '';
  var index = 1;

  google.charts.load('current', {'packages': ['line']});

  function addRow() {
    var $temp = $(template({index: index++}));
    $('.form-wrapper').append($temp);
    $temp.find('.datetimepicker').datetimepicker({});
  }

  function removeRow() {
    $(this).parents('.col-md-12').remove();
  }

  function gatherData(form) {
    var obj = {};
    $(form).find('input').each(function (i, input) {
      obj[input.name] = (input.name === 'runDtg') ? moment(input.value).format('x') : input.value;
    });
    return obj;
  }

  function getFormDataArr() {
    var results = [];

    $('.form-wrapper').find('form').each(function (i, el) {
      var formData = gatherData(el);
      formData['name'] = $(el).find('h4').text();
      results.push(formData);
    });
    return results;

  };

  function onSubmit() {
    var data = getFormDataArr();
    // TODO: remove drawChart(mocked_arr)
    drawChart(mocked_arr);
    // TODO: uncomment it when method will be ready
    // $.post(KALMAN_API, data, drowChart);
  }

  function prepareDataTableHeader(row) {
    var header = [{type:'date', label: 'date'}];
    for(var i = 1; i<row.length; i++){
      header.push({type:'number', label: 'Line - '+i});
    }
    return header;
  }

  var mocked_arr = [
    [
      'Date(2016, 08, 10, 2, 0, 0, 0)',
      45,
      null,
      80
    ],
    [
      'Date(2016, 08, 10, 3, 0, 0, 0)',
      45,
      5,
      43
    ],
    [
      'Date(2016, 08, 10, 4, 0, 0, 0)',
      10,
      10,
      43
    ],
    [
      'Date(2016, 08, 10, 5, 0, 0, 0)',
      45,
      null,
      43
    ],
    [
      'Date(2016, 08, 10, 6, 0, 0, 0)',
      45,
      null,
      43
    ],
    [
      'Date(2016, 08, 10, 7, 0, 0, 0)',
      45,
      null,
      43
    ],
    [
      'Date(2016, 08, 10, 8, 0, 0, 0)',
      45,
      null,
      43
    ],
    [
      'Date(2016, 08, 10, 9, 0, 0, 0)',
      45,
      null,
      43
    ]]

  function drawChart(response) {
    var options = {
      height: 500
    };

    var header = prepareDataTableHeader(response[0]);
    response.unshift(header);

    var data = google.visualization.arrayToDataTable(response);
    var chart = new google.charts.Line(document.getElementById('chart_div'));

    chart.draw(data, options);
  }


  $('#addRow').on('click', addRow);
  $('#submit').on('click', onSubmit);
  $('.form-wrapper').on('click', '.remove-row', removeRow);

  addRow();
});
