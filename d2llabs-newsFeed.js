function extractImage(html) {
    var htmlObject = document.createElement('div');
    htmlObject.innerHTML = html;
    var images = htmlObject.getElementsByTagName("img");
    if (images.length === 0 || !images) {
        return false;
    }
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

const load = () => {
    const limit = GetQueryStringParams('limit', parent) || 5;
    const orgUnitId = GetQueryStringParams('ou', parent);
    const baseUrl = '/d2l/api/le/1.5/'
    const getNewsUrl = `${baseUrl}${orgUnitId}/news/`
    $.ajax(getNewsUrl, {
        method: 'Get',
        success: function (apiRes) {
            for (var i = 0; i < apiRes.length; i++) {
                if(i+1 > limit) {
                    break;
                }
                newObj = apiRes[i];
                postDate = formatDate(newObj.StartDate);
                var componentObj;
                firstImageSource = extractImage(newObj.Body.Html);
                title = `<a href="/d2l/le/news/${orgUnitId}/${newObj.Id}/view",   target="_top">${newObj.Title}</a>`;
                if (firstImageSource) {
                    componentObj = `
                           <li class="newObject">
                              <span><img src="${firstImageSource}"  class="project-pic img-thumbnail">
                              </span>

                              <div class="withPicture">
                                  <h3>${title}</h3>
                                  <p>${postDate}</p>
                              </div>
                           </li>

                        `
                }else {
                    componentObj = `
                           <li class="newObject">
                              <div>
                                  <h3>${title}</h3>
                                  <p>${postDate}</p>
                              </div>
                           </li>
                        `
                }
                $("#d2llabs-newsFeed").append(componentObj);
            }

            componentObj = `
                    <li>
                    <h4><a href="/d2l/lms/news/main.d2l?ou=${orgUnitId}"  target="_top">Show All Announcements</a></h4>
                    </li>
                `
            $("#d2llabs-newsFeed").append(componentObj);
        },
        error: function (error) {
            console.log('error', error);
        }
    });
}

function formatDate (date) {
    date = new Date(date);
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes()

    //parse month
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ]
    month = monthNames[month]

    //parse hour
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    //parse minutes
    if(minutes < 10) {
        minutes = `0${minutes}`
    }

    result = `Posted ${month} ${day}, ${year} ${hours}:${minutes} ${ampm}`;
    return result;

}

window.onload = load;


