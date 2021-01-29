/*!
 * F is for Format, WHAT THE diff??, & Friends v1.2
 *
 * Kopimi 2021 Joshua Faulkenberry
 * Unlicensed under The Unlicense
 * http://unlicense.org/
 *
 * $Date: 2020-12-03 11:48:35 -0800 (Thu, 03 Dec 2020) $
 * $Revision: 771 $
 */
/************** F is for Format ***************
 * Outputs a JavaScript Date Object in various
 * customizable formats
 **********************************************
 */
/*global window*/
window.Date.prototype.f = function(format) {
   if(this === "" || this == "NaN") {
      return "Invalid Date";
   }
   if(format == "@") {
      return this.getTime();
   }
   else if(format == "REL") {
      var diff = (((new Date()).getTime() - this.getTime()) / 1000), day_diff = Math.floor(diff / 86400);
      return day_diff === 0 && (
          diff > -60 && "right now" ||
         diff > -120 && "1 minute from now" ||
         diff > -3600 && -(Math.floor(diff / 60)) + " minutes from now" ||
         diff > -7200 && "1 hour ago" ||
         diff > -86400 && -(Math.floor(diff / 3600)) + " hours from now" ||

         diff < 60 && "just now" ||
         diff < 120 && "1 minute ago" ||
         diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
         diff < 7200 && "1 hour ago" ||
         diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||

         day_diff === 0 && "Tomorrow" ||
         day_diff > -7 && -(day_diff) + " days from now" ||
         -(Math.ceil( day_diff / 7 )) == 1 && "1 week from now" ||
         day_diff > -78 && -(Math.ceil( day_diff / 7 )) + " weeks from now" ||
         day_diff > -730 && -(Math.ceil( day_diff / 30 )) + " months from now" ||
         day_diff <= -730 && -(Math.ceil( day_diff / 365 )) + " years from now" ||

         day_diff == 1 && "Yesterday" ||
         day_diff < 7 && day_diff + " days ago" ||
         (Math.ceil( day_diff / 7 )) == 1 && "1 week ago" ||
         day_diff < 78 && Math.ceil( day_diff / 7 ) + " weeks ago" ||
         day_diff < 730 && Math.ceil( day_diff / 30 ) + " months ago" ||
         Math.ceil( day_diff / 365 ) + " years ago";
   }
   var MONTH_NAMES=['January','February','March','April','May','June','July','August','September','October','November','December'],
       DAY_NAMES=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
       date = this,
       result="",
       i_format=0,
       c="",
       token="",
       y=date.getYear()+"",
       M=date.getMonth()+1,
       d=date.getDate(),
       E=date.getDay(),
       D=date.getDay(),
       H=date.getHours(),
       m=date.getMinutes(),
       s=date.getSeconds(),
       n=date.getMilliseconds(),
       yyyy,yy,MMM,MM,dd,hh,h,mm,ss,nn,ampm,HH,KK,K,kk,k,
       LZ = function(x) {
           return(x<0||x>9?"":"0")+x;
       },
       midnight = (new Date());
       if(!MONTH_NAMES[M-1]) return "Invalid Date";
   format=format+"";
   midnight.setHours(0);
   midnight.setMinutes(0);
   midnight.setSeconds(0);
   midnight.setMilliseconds(0);
   if (y.length < 4) {
      y=""+(y-0+1900);
   }
   var value = {
      y: ""+y,
      yyyy: y,
      yy: (y+"").substr(2,4),
      M: M,
      MM: LZ(M),
      MMM: MONTH_NAMES[M-1],
      NNN: MONTH_NAMES[M-1].substr(0,3),
      N: MONTH_NAMES[M-1].substr(0,1),
      d: d,
      dd: LZ(d),
      e: DAY_NAMES[E].substr(0,1),
      ee: DAY_NAMES[E].substr(0,2),
      E: DAY_NAMES[E].substr(0,3),
      EE: DAY_NAMES[E],
      D: (date.getTime() >= midnight.getTime() && date.getTime() < (midnight.getTime() + (1000*60*60*24))) ? "Today" : DAY_NAMES[D].substr(0,3),
      DD: (date.getTime() >= midnight.getTime() && date.getTime() < (midnight.getTime() + (1000*60*60*24))) ? "Today" : DAY_NAMES[D],
      H: H,
      HH: LZ(H),
      h: (H===0) ? 12 : (H>12) ? H-12 : H,
      hh: LZ((H===0) ? 12 : (H>12) ? H-12 : H),
      k: H+1,
      kk: LZ(H+1),
      K: (H>11) ? H-12 : H,
      KK: LZ((H>11) ? H-12 : H),
      m: m,
      mm: LZ(m),
      s: s,
      ss: LZ(s),
      n: n,
      a: (H>11) ? "PM" : "AM",
   };
   while (i_format < format.length) {
      c=format.charAt(i_format);
      token="";
      while ((format.charAt(i_format)==c) && (i_format < format.length)) {
         token += format.charAt(i_format++);
      }
      if (value[token] != null) { result=result + value[token]; }
      else { result=result + token; }
   }
   return result;
};

/************ WHAT'S THE diff?? *************
 * Calculates the exact difference between
 * any two dates and outputs the results in
 * a customizable incremental breakdown
 ********************************************
 */
window.Date.prototype.diff = function(date, options) {
   if(typeof(date) == "undefined") date = new Date();
   else if(typeof(date) ==  "string" || typeof(date) ==  "number") {
      if((new Date(date)) != "Invalid Date" && (new Date(date)) != "NaN") {
         date = new Date(date);
      }
      else {
         console.log("Invalid diff comparison date: " + date);
         return false;
      }
   }
   else if(typeof(date) ==  "object" && !date.getTime) {
      options = date;
      date = new Date();
   }
   if(typeof(options) ==  "string") {
      options = {
         breakdown: options
      };
   }
   if(!options) options = {};
   options = {
      breakdown: options.breakdown || "TCDYMWdHmSN",
      divider:   options.divider || ", ",
      abbr:      options.abbr || false,
      same:      options.same || "Same",
      zeros:     options.zeros || false,
      labels:    options.hasOwnProperty('labels') ? options.labels : {
         T : ["Millennium","Millennia","ml"],
         C : ["Century","Centuries","c"],
         D : ["Decade","Decades","d"],
         Y : ["Year","Years","yr"],
         M : ["Month","Months","mo"],
         W : ["Week","Weeks","wk"],
         d : ["Day","Days","d"],
         H : ["Hour","Hours","hr"],
         m : ["Minute","Minutes","m"],
         S : ["Second","Seconds","s"],
         N : ["Millisecond","Milliseconds","ms"]
      }
   };
   var min   = date <= this && date || date > this && this,
       max   = date > this && date || date <= this && this,
       diff  = (max.getTime() - min.getTime()),
       tl    = {
          T : 1000*60*60*24*365*100*10,
          C : 1000*60*60*24*365*100,
          D : 1000*60*60*24*365*10,
          Y : 1000*60*60*24*365,
          M : 1000*60*60*24*30,
          W : 1000*60*60*24*7,
          d : 1000*60*60*24,
          H : 1000*60*60,
          m : 1000*60,
          S : 1000,
          N : 1
       },
       result = [];

   for(var i = 0; i < options.breakdown.length; i++) {
      var res = Math.floor(diff / tl[options.breakdown.charAt(i)]);
      if(res || options.zeros) {
         if(options.zeros && options.breakdown.charAt(i) == "N") {
            if(res < 10) res = "00" + res;
            else if(res < 100) res = "0" + res;
         }
         result.push(res + (options.labels ? " " + options.labels[options.breakdown.charAt(i)][options.abbr ? 2 : res == 1 ? 0 : 1] : ""));
         diff = diff % tl[options.breakdown.charAt(i)];
      }
   };

   diff = result.join(options.divider);
   if(diff === "") {
      diff = options.same;
   }
   if(options.lc) {
      diff = diff.toLowerCase();
   }
   return diff;
};

/*************** Date.when() ****************
 * Returns a fancy timestamp indicating how
 * long ago a date was like you see on
 * Facebook or Twitter
 ********************************************
 */
window.Date.prototype.when = function() {
   var
      now       = new Date(),
      ts        = this.f("MMM d, yyyy h:mm a"),
      nowSec    = now.getTime() / 1000,
      tsSec     = this.getTime() / 1000;

   if((nowSec - tsSec) < 60) ts = "Now";
   else if((nowSec - tsSec) / 60 < 60) ts = this.diff(now, "m");
   else if(((nowSec - tsSec) / 60) / 60 < 12) ts = this.diff(now, "H");
   else if(now.f("yyyyMMdd") == this.f("yyyyMMdd")) ts = "Today" + this.f("h:mm a");
   else if(tsSec > (new Date(new Date(now.f("MM/dd/yyyy 00:00:00")).setDate(now.getDate()-1))).getTime() / 1000) ts = "Yesterday " + this.f("h:mm a");
   else if(tsSec > (new Date(new Date(now.f("MM/dd/yyyy 00:00:00")).setDate(now.getDate() - now.getDay()))).getTime() / 1000) ts = this.f("EE h:mm a");
   else if(tsSec > (new Date(new Date().getFullYear(), 0, 1)).getTime() / 1000) ts = this.f("MMM d h:mm a");
   return ts;
};

/********* Date.getDaysInMonth() *************
 * Returns the number of days in the current
 * month
 *********************************************
 */
window.Date.prototype.getDaysInMonth = function() {
   return [31,28,31,30,31,30,31,31,30,31,30,31][this.getMonth()];
};

/************* Date.isLeapYear() ***************
 * Returns true if the current year is a leap
 * year
 ***********************************************
 */
window.Date.prototype.isLeapYear = function() {
   return (new Date(this.getFullYear(),1,29)).getDate() == 29;
};

/******* Date.getDayLightSavingsDays() *********
 * Returns an array containing date objects for
 * the two daylight savings change days within
 * the current year
 ***********************************************
 */
window.Date.prototype.getDayLightSavingsDays = function() {
   var result = [];
   var day1 = new Date("03/07/"+this.getFullYear());
   var day2 = new Date("03/06/"+this.getFullYear());
   while(day1.getMonth() < 3 || (day1.getMonth() == 3  && day1.getDate() < 16)) {
      if((day1.getTime() - day2.getTime())/1000/60/60 != 24) {
         result[result.length] = new Date(day2.getTime());
      }
      day1.setDate(day1.getDate()+1);
      day2.setDate(day2.getDate()+1);
   }
   day1 = new Date("10/31/"+this.getFullYear());
   day2 = new Date("10/30/"+this.getFullYear());
   while(day1.getMonth() < 11 || (day1.getMonth() == 10 && day1.getDate() < 9)) {
      if((day1.getTime() - day2.getTime())/1000/60/60 != 24) {
         result[result.length] = new Date(day2.getTime());
      }
      day1.setDate(day1.getDate()+1);
      day2.setDate(day2.getDate()+1);
   }
   return result;
};

/******** Date.isDayLightSavingsDay() **********
 * Returns true if the current day is a
 * daylight savings change day
 ***********************************************
 */
window.Date.prototype.isDayLightSavingsDay = function() {
   var comp = new Date(this.getTime());
   comp.setDate(comp.getDate()+1);
   return (comp.getTime() - this.getTime())/1000/60/60 != 24;
};
