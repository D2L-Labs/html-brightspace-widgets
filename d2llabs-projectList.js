function extractImage(html) {
    var htmlObject = document.createElement('div');
    htmlObject.innerHTML = html;
    var images = htmlObject.getElementsByTagName("img");
    var firstImage = images[0].src;
    return firstImage;
}

function GetQueryStringParams(sParam) {
    obj = window;
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

function windowOnLoad () {
    const baseURL = '/d2l/api/le/1.23/';
    //get query strings
    const moduleId = GetQueryStringParams('moduleId', parent);
    const orgUnitId = GetQueryStringParams('ou', parent);

    var numberOfRows = 0;
    var currentColumnsCount = 0;
    const getContentModulesURL =  `${baseURL}${orgUnitId}/content/modules/${moduleId}/structure/`;
    $.ajax(getContentModulesURL, {
        method: 'Get',
        success: function (response)  {
            for (var i = 0; i < response.length; i++) {
                const project = response[i];
                Title = project["Title"];
                moreInfoUrl = `/d2l/le/content/${moduleId}/viewContent/${project["Id"]}/View`

                if(project["Title"] === "_archive") {
                    continue;
                } else if (project["Title"] === "Project Names") {
                    $('#project-name a').attr("href",moreInfoUrl);
                } else {
                    if (numberOfRows === 0) {
                        newRow = `<div class="row" id="row${numberOfRows}"> </div>`
                        $('#d2llabs-projectList').append(newRow)
                        numerOfRows = +1;
                    } else if (currentColumnsCount === 3) {
                        newRow = `<div class="row" id="row${numberOfRows}"> </div>`
                        $('#d2llabs-projectList').append(newRow)
                        currentColumnsCount = 0;
                    }

                    html = project["Description"]["Html"];
                    imgSource = extractImage(html);
                    Description = project["Description"]["Text"];
                    projectComponent = `
                        <div class="col-sm-4">
                        <div class="thumbnail box"><img src="${imgSource}"  class="project-pic">
                        <div class="caption">
                        <h4>${project["Title"]}</h4>
                        <p>${Description}</p>
                        <p><a href=${moreInfoUrl} target="_parent" class="btn btn-default" role="button">More Info</a></p>
                        </div>
                        </div>
                        </div>
                `
                    $(`#row${numberOfRows}`).append(projectComponent);
                    currentColumnsCount = +1;

                }
            }
            $("body .project-pic").on("load", function () {
                $('.box').matchHeight();
                $('.project-pic').matchHeight();
            });
        },
        error: function (error) {
            console.log('error', error);
        }
    });
}

window.onload = windowOnLoad;
