$(document).ready(function(){
  $.ajaxSetup({
    async: false
  });
  var backgroundColours = ['green', 'blue', 'purple', 'orange'];
  var moduleId = GetQueryStringParams('moduleId');
  var carousel = $('<div class="carousel-inner" role="listbox">');
  var orgUnitId = GetQueryStringParams('ou');

  var moduleAPI = '/d2l/api/le/1.25/' + orgUnitId + '/content/modules/' + moduleId + '/structure/';//ADD SLASH BACK TO END
  var apiRes = makeAPIcall('GET', moduleAPI);
  console.log(apiRes);
  var i = 0;
  apiRes.forEach(function(topic) {
    if (topic.Type === 1) {
      var colour = backgroundColours[i%backgroundColours.length];
      var topicAPI = '/d2l/api/le/1.25/' + orgUnitId + '/content/topics/' + topic.Id;
      var topicAPIRes = makeAPIcall('GET', topicAPI);
      $('<div class="' + "item " + colour + '">' +
        '<div class="pane center-block">' +
        '<h2>' + topicAPIRes.Title + '</h2>' +
        '<p>' + topicAPIRes.Description.Text + '</p>' +
        '<a class="btn btn-default" href="/d2l/le/content/' + orgUnitId + '/viewContent/' + topicAPIRes.Id + '/View" target="_parent">Learn More</a></div>' +
        '</div>').appendTo('.carousel-inner');
      $('<li data-target="#myCarousel" data-slide-to="' + (i+1) + '"></li>').appendTo('.carousel-indicators');
      i++;
    }
  });
  $('.item').first().addClass('active');
  $('.carousel-indicators > li').first().addClass('active');
  $('#carousel-example-generic').carousel();
});

function GetQueryStringParams(sParam) {
  var obj = window;
  var sPageURL = obj.location.search.substring(1);
  console.log(obj.location);
  console.log(sPageURL);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++)
  {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam)
    {
      return sParameterName[1];
    }
  }
}

function makeAPIcall(method, api) {
  var res = {};
  function result_success (data) {
    res = data;
  }

  $.ajax(api, {
    method: method,
    xhrFields: {withCredentials: true},
    success: result_success,
    error: result_error
  });
  return res;
}

function result_error(err) {
  console.log(err);
}
