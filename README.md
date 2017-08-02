# html-brightspace-widgets

Some HTML pages intended be used in custom widgets in Brightspace by including them in an <iframe> tag. All files must be deployed to the site in question to not run into cross-origin issues.

The pages are designed to be self-contained with everything in the single HTML page for ease of deployment. This could make code management in the long term more difficult, but at this time each file is pretty basic and it should not be much of a problem and if it becomes a problem it can be addressed at that time.

## Widgets

### d2llabs-carousel.html
This widget reads the titles and descriptions for the topics in a given content module and displays the as a set of panes that are automatically cycled. Uses the `/d2l/api/le/1.25/${orgUnitId}/content/modules/${moduleId}/structure/` API method.

- Query String Parameters
  - **ou** - integer value of the org unit where the content exists, use {orgUnitId} for current org unit.
  - **moduleId** - integer value of the parent content module containing the topics to display.

### d2llabs-newsFeed.html
This widget displays a simple feed-style view of announcements for a given org unit. Uses the `/d2l/api/le/1.25/${orgUnitId}/news/?since={$sinceParam}` API method. Looks for images in each announcement and displays the first image in the body to the left side of the announcement title.

- Query String Parameters
  - **ou** - integer value of the org unit where the content exists, use {orgUnitId} for current org unit.
  - **limit** - (optional) integer value for the number of announcements to display. Defaults to 5.
  - **sinceDays** - (optional) integer value of days to which to limit announcments. Defaults to 365.
  - **summaryLimit** - (optional) integer number of characters to show of announcement text as a summary. Defaults to 100.
  - **showTags** - (optional) binary flag to determine if tags should be display (set to 0 to disable). Defaults to 1 (tags shown)

### d2llabs-projectList.html
This widget reads the titles and descriptions for the topics in a given content module and displays the as a grid that is 3 columns wide. Uses the `/d2l/api/le/1.25/${orgUnitId}/content/modules/${moduleId}/structure/` API method. Looks for the first image in the topic description and uses that as part of the display for that topic.

- Query String Parameters
 -- **ou** - integer value of the org unit where the content exists, use {orgUnitId} for current org unit
 -- **moduleId** - integer value of the parent content module containing the topics to display
