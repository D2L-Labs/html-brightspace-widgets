$(document).ready(function(){
  var backgroundColours = ['green', 'blue', 'purple', 'orange'];
  var moduleId = GetQueryStringParams('moduleId');
  var carousel = $('<div class="carousel-inner" role="listbox">');
  var orgUnitId = GetQueryStringParams('ou');

  var i = 0;
  function moduleSuccessCallback (apiRes) {
    apiRes.forEach(function (topic) {
      if (topic.Type === 1) {
        function addTopic(topicAPIRes) {
          var colour = backgroundColours[i % backgroundColours.length];
          $('<div class="' + "item " + colour + '">' +
            '<div class="pane center-block">' +
            '<h2>' + topicAPIRes.Title + '</h2>' +
            '<p>' + topicAPIRes.Description.Text + '</p>' +
            '<a class="btn btn-default" href="/d2l/le/content/' + orgUnitId + '/viewContent/' + topicAPIRes.Id + '/View" target="_parent">Learn More</a></div>' +
            '</div>').appendTo('.carousel-inner');
          $('<li data-target="#myCarousel" data-slide-to="' + (i + 1) + '"></li>').appendTo('.carousel-indicators');
          i++;
          $('.item').first().addClass('active');
          $('.carousel-indicators > li').first().addClass('active');
          $('#carousel-example-generic').carousel();
        }
        var topicAPI = '/d2l/api/le/1.25/' + orgUnitId + '/content/topics/' + topic.Id;
        makeAPIcall('GET', topicAPI, addTopic);
      }
    });
  }

  var moduleAPI = '/d2l/api/le/1.25/' + orgUnitId + '/content/modules/' + moduleId + '/structure/';
  makeAPIcall('GET', moduleAPI, moduleSuccessCallback);
});

function GetQueryStringParams(sParam) {
  var obj = window;
  var sPageURL = obj.location.search.substring(1);
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

function makeAPIcall(method, api, result_success) {
  $.ajax(api, {
    method: method,
    xhrFields: {withCredentials: true},
    success: result_success,
    error: result_error
  });
}

function result_error(err) {
  console.log(err);
}
