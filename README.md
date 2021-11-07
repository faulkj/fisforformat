# f is for Format & WHAT THE diff & Friends!

A JavaScript Library that extends JavaScript's Date object to provide all the
functionality that is missing from the standard implementation. With **f is for
Format** you can easily output a date in almost any format. **WHAT THE diff**
gives you the ability to calculate the exact difference between *any* two dates
and output the difference in human readable text. Also included are several
other useful Date methods including **Date.isLeapYear** and
**Date.getDaysInMonth**.


## f is for Format

### Date.f(format)

Outputs a JavaScript Date Object in virtually any textual format.

**format**\
Type: String\
A string specifying how the dat should be formatted

The following characters are recognized in the format parameter string:
|Character|Description|Example returned values|
|--- |--- |--- |
|Day|---|---|
|d|Day of the month, 2 digits with leading zeros|01 to 31|
|D|A textual representation of a day, three letters|Mon through Sun|
|j|Day of the month without leading zeros|1 to 31|
|l (lowercase 'L')|A full textual representation of the day of the week|Sunday through Saturday|
|ll (lowercase 'LL')|Same as l, but with contextual labels for today,tomorrow, and yesterday|Sunday through Saturday, Today, Tomorrow, Yesterday|
|N|ISO-8601 numeric representation of the day of the week|1 (for Monday) through 7 (for Sunday)|
|S|English ordinal suffix for the day of the month, 2 characters|st, nd, rd or th.  Works well with j|
|w|Numeric representation of the day of the week|0 (for Sunday) through 6 (for Saturday)|
|z|The day of the year (starting from 0)|0 through 365|
|Week|---|---|
|W|ISO-8601 week number of year, weeks starting on Monday|Example: 42 (the 42nd week in the year)|
|Month|---|---|
|F|A full textual representation of a month, such as January or March|January through December|
|m|Numeric representation of a month, with leading zeros|01 through 12|
|M|A short textual representation of a month, three letters|Jan through Dec|
|n|Numeric representation of a month, without leading zeros|1 through 12|
|t|Number of days in the given month|28 through 31|
|Year|---|---|
|L|Whether it's a leap year|1 if it is a leap year, 0 otherwise.|
|o|ISO-8601 week-numbering year. This has the same value as Y, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead.|Examples: 1999 or 2003|
|Y|A full numeric representation of a year, 4 digits|Examples: 1999 or 2003|
|y|A two digit representation of a year|Examples: 99 or 03|
|Time|---|---|
|a|Lowercase Ante meridiem and Post meridiem|am or pm|
|A|Uppercase Ante meridiem and Post meridiem|AM or PM|
|B|Swatch Internet time|000 through 999|
|g|12-hour format of an hour without leading zeros|1 through 12|
|G|24-hour format of an hour without leading zeros|0 through 23|
|h|12-hour format of an hour with leading zeros|01 through 12|
|H|24-hour format of an hour with leading zeros|00 through 23|
|i|Minutes with leading zeros|00 to 59|
|ii|Minutes without leading zeros|0 to 59|
|s|Seconds with leading zeros|00 through 59|
|ss|Seconds without leading zeros|0 through 59|
|v|Milliseconds|Example: 654|
|Timezone|---|---|
|e|Timezone identifier|Examples: Pacific Daylight Time, Pacific Standard Time|
|I (capital i)|Whether or not the date is in daylight saving time|true if Daylight Saving Time, false otherwise.|
|O|Difference to Greenwich time (GMT) without colon between hours and minutes|Example: +0200|
|P|Difference to Greenwich time (GMT) with colon between hours and minutes|Example: +02:00|
|p|The same as P, but returns Z instead of +00:00|Example: +02:00|
|Z|Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive.|-43200 through 50400|
|Full Date/Time|---|---|
|c|ISO 8601 date|2004-02-12T15:19:21+00:00|
|r|RFC 2822 formatted date|Example: Thu, 21 Dec 2000 16:01:07 +0200|
|U|Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)|1627616755444|
|@|String representation of the relative time between the Date and the current time|Yesterday / Tomorrow / 5 minutes ago / 7 months from now|

Example:
```javascript
var myDate = new Date();
var myFormattedDate = myDate.f("l, F j, y");
var myFormattedDate2 = myDate.f("m/d/Y H:i:s");
alert("Today is: " + myFormattedDate);
alert("Or would you prefer something more specific: " + myFormattedDate2);
```



## WHAT THE diff??

### Date.diff([date], [settings])

Calculates the exact difference between any two dates, broken down into customizable increments.

**date**\
Type: Date object, valid date string, or Unix epoch timestamp\
*Optional*  The datetime to compare against.  If not specified the current time will be used.

**settings**\
Type: PlainObject or valid unit string\
*Optional*  A set of key/value pairs that define how the difference should be displayed.

- **abbr**  *(dafault: FALSE)*\
  Type: Boolean\
  Use abbreviated time unit names
- **divider**  *(default: ", ")*\
  Type: String\
  Specifies the divider to place between units of time
- **labels**\
  Type: PlainObject, Boolean\
  A set of key value pairs that can be used to override the default unit labels.  Pass FALSE to not display any labels.
- **lc**  *(default: FALSE)*\
  Type: Boolean\
  When set to TRUE, all unit labels will be displayed in lowercase
- **same**  *(default: "Same")*\
  Type: String\
  A string specifying the label to use when the two dates are identical
- **units**  *(default: "*")*\
  Type: String\
  A string specifying which units of time to use to display the difference
- **zeros** *(default: FALSE)*\
  Type: Boolean\
  When set to TRUE, leading zeros will be displayed for all applicable time units

The following characters are used to specify the units of time to display:
|Character|Unit of Time|
|---|--- |
|T|Millenia|
|C|Centuries|
|D|Decades|
|Y|Years|
|M|Months|
|W|Weeks|
|d|Days|
|H|Hours|
|m|Minutes|
|S|Seconds|
|N|Miliseconds|
|*|All (default)|


Example:
```javascript
var oldDate = new Date("03/22/2009 23:23:12");
var curDate = new Date();
var theDiff = curDate.diff(oldDate);
//is the same as
var theDiff2 = curDate.diff(oldDate, "TCDYMWdHmSN");
alert("And the difference is: " + theDiff);

var theDiff3 = curDate.diff(oldDate, {
   units : "dS",
   abbr  : true,
   divider : " - "
});
alert("The diff in just days and seconds is: " + theDiff3);
```


## (& Friends!)

### Date.getDaylightSavingsDays()

Returns an array of two date objects for the two daylight savings change days within the year of the provided date

Example:
```javascript
var thisYear = new Date();
alert(
   "On " + thisYear.getDaylightSavingsDays[0].f("DD, MMM d") + " spring forward.\n"
   + "On " + thisYear.getDaylightSavingsDays[1].f("DD, MMM d") + " fall back."
);
```

### Date.getDaysInMonth()

Returns the number of days in the selected month

Example:
```javascript
var thisMonth = new Date();
var daysThisMonth = thisMonth.getDaysInMonth();
alert("There are " + daysThisMonth + " days in this month.");
```

### Date.isDaylightSavings()

Returns TRUE if the daylight savings is in effect for the date provided, otherwise FALSE

Example:
```javascript
var tomorrow = new Date();
tomorrow.setDate(+1);
alert("Daylight Savings is " + (tomorrow.isDaylightSavings() ? "" : "not ") + "currently in effect!");
```

### Date.isDaylightSavingsDay()

Returns TRUE if the provided date is a daylight savings change day, otherwise FALSE

Example:
```javascript
var tomorrow = new Date();
tomorrow.setDate(+1);
if(tomorrow.isDaylightSavingsDay()) alert("Don't forget to change the clock tonight!");
```

### Date.isLeapYear()

Returns TRUE if the selected year is a leap year, otherwise FALSE

Example:
```javascript
var thisYear = new Date();
if(thisYear.isLeapYear()) alert("It's a leap year!");
else {
   alert("Maybe next year...");
   thisYear.setYear(+1);
   if(thisYear.isLeapYear()) alert("Yes!!");
   else alert("Darn.");
}
```

### Date.when()

 Returns a historical timestamp indicating how long ago the provided date was, like the timestamps on social media posts  (Note: Future dates will be labeled "Now")

 Example:
 ```javascript
var now = new Date();
alert("This date is " + now.when());
now.setHours(-2);
alert("But this date is from " + now.when());
```

