/*************** Date.happened() ****************
 * Returns a historical timestamp indicating
 * how long ago the provided date was, like
 * the timestamps on social media posts
 ********************************************
 */
window.Date.prototype.happened = () => {
   if(!Date.prototype.f || !Date.prototype.diff) return "Date.happened requires Date.f and Date.diff!";
   var
      now       = new Date(),
      ts        = this.f("F j, Y g:i a"),
      nowSec    = now.getTime() / 1000,
      tsSec     = this.getTime() / 1000;

   if((nowSec - tsSec) < 20) ts = "Now";
   else if((nowSec - tsSec) < 60) ts = this.diff(now, "s");
   else if((nowSec - tsSec) / 60 < 60) ts = this.diff(now, "m");
   else if(((nowSec - tsSec) / 60) / 60 < 12) ts = this.diff(now, "H");
   else if(now.f("Ymd") == this.f("Ymd")) ts = "Today " + this.f("g:i a");
   else if(tsSec > (new Date(new Date(now.f("m/d/Y 00:00:00")).setDate(now.getDate()-1))).getTime() / 1000) ts = "Yesterday " + this.f("g:i a");
   else if(tsSec > (new Date(new Date(now.f("m/d/Y 00:00:00")).setDate(now.getDate() - now.getDay()))).getTime() / 1000) ts = this.f("l g:i a");
   else if(tsSec > (new Date(new Date().getFullYear(), 0, 1)).getTime() / 1000) ts = this.f("F j g:i a");

   return ts;
};

/********* Date.getDaysInMonth() *************
 * Returns the number of days in the current
 * month
 *********************************************
 */
window.Date.prototype.getDaysInMonth = () => {
   return new Date(this.getFullYear(), this.getMonth(), 0).getDate();
};

/************* Date.isLeapYear() ***************
 * Returns true if the current year is a leap
 * year
 ***********************************************
 */
window.Date.prototype.isLeapYear = () => {
   return (new Date(this.getFullYear(), 1, 29)).getDate() == 29;
};

/******** Date.isDayLightSavings() *************
 * Returns true if daylight savings is currently
 * in effect
 ***********************************************
 */
window.Date.prototype.isDayLightSavings = () => {
   return this.getTimezoneOffset() < Math.max((new Date(this.getFullYear(), 0, 1)).getTimezoneOffset(), (new Date(this.getFullYear(), 6, 1)).getTimezoneOffset());
}

/******* Date.getDaylightSavingsDays() *********
 * Returns an array containing date objects for
 * the two daylight savings change days within
 * the current year
 ***********************************************
 */
window.Date.prototype.getDaylightSavingsDays = () => {
   var
      result = [],
      day1 = new Date("03/07/"+this.getFullYear()),
      day2 = new Date("03/06/"+this.getFullYear());

   while(day1.getMonth() < 3 || (day1.getMonth() == 3  && day1.getDate() < 16)) {
      if((day1.getTime() - day2.getTime()) / 1000 / 60 / 60 != 24) result[result.length] = new Date(day2.getTime());
      day1.setDate(day1.getDate()+1);
      day2.setDate(day2.getDate()+1);
   }
   day1 = new Date("10/31/"+this.getFullYear());
   day2 = new Date("10/30/"+this.getFullYear());
   while(day1.getMonth() < 11 || (day1.getMonth() == 10 && day1.getDate() < 9)) {
      if((day1.getTime() - day2.getTime()) / 1000 / 60 / 60 != 24) result[result.length] = new Date(day2.getTime());
      day1.setDate(day1.getDate()+1);
      day2.setDate(day2.getDate()+1);
   }
   return result;
};

/******** Date.isDaylightSavingsDay() **********
 * Returns true if the current day is a
 * daylight savings change day
 ***********************************************
 */
window.Date.prototype.isDaylightSavingsDay = () => {
   var c = new Date(this.getTime());
   c.setDate(c.getDate() + 1);
   return (c.getTime() - this.getTime())/1000/60/60 != 24;
};
