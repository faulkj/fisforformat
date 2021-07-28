# F is for format & WHAT THE diff (And Friends)

A JavaScript Library that extends JavaScript's Date object to provide all the
functionality that is missing from the standard implementation. With **F is for
Format** you can easily output a date in almost any format. **WHAT THE diff**
gives you the ability to calculate the exact difference between *any* two dates
and output the difference in human readable text. Also included are several
other useful Date methods including **Date.isLeapYear** and
**Date.getDaysInMonth**.


## F is for Format

**Date.f**

Outputs a JavaScript Date Object in virtually any textual format.

...
var myDate = new Date();
var myFormattedDate = myDate.f("EE, MMM d, y");
var myFormattedDate2 = myDate.f("MM/dd/yyyyy HH:mm:ss");
alert("Today is: " + myFormattedDate);
alert("Or would you prefer something more specific: " + myFormattedDate2);
...