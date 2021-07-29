/*!
 * F is for Format, WHAT THE diff, & Friends v2.0
 *
 * Kopimi 2021 Joshua Faulkenberry
 * Unlicensed under The Unlicense
 * http://unlicense.org/
 */

/************** F is for Format ***************
 * Outputs a JavaScript Date Object in various
 * customizable formats
 **********************************************
 */

window.Date.prototype.f = function(format) {
   if(this === "" || this == "NaN") return "Invalid Date";
   else if(format == "@") return this.getTime();
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
         diff < 86400 && Math.floor( diff / 3600 ) + " hours ago"
      ) ||

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

   var
      MONTH_NAMES  = ['January','February','March','April','May','June','July','August','September','October','November','December'],
      DAY_NAMES    = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      date         = this,
      result       = "",
      i_format     = 0,
      c            = "",
      token        = "",
      y            = date.getFullYear(),
      M            = date.getMonth() + 1,
      d            = date.getDate(),
      E            = date.getDay(),
      D            = date.getDay(),
      H            = date.getHours(),
      m            = date.getMinutes(),
      s            = date.getSeconds(),
      n            = date.getMilliseconds(),
      tz           = date.toTimeString().replace(")", "").split("(")[1],
      tzO          = date.toTimeString().split(" ")[1].replace("GMT", ""),
      LZ           = function(x, p) {
                        p = p || 2;
                        return ("00" + x).slice(-p);
                     },
      midnight     = new Date();

   if(!MONTH_NAMES[M-1]) return "Invalid Date";

   format = format + "";
   midnight.setHours(0);
   midnight.setMinutes(0);
   midnight.setSeconds(0);
   midnight.setMilliseconds(0);

   var
      today = date.getTime() >= midnight.getTime() && date.getTime() < midnight.getTime() + 86400000,
      yesterday = new Date(midnight),
      tomorrow  = new Date(midnight);

   yesterday.setDate(-1);
   yesterday = date.getTime() >= yesterday.getTime() && date.getTime() < yesterday.getTime() + 86400000;
   tomorrow.setDate(+1);
   tomorrow = date.getTime() >= tomorrow.getTime() && date.getTime() < tomorrow.getTime() + 86400000;

   var value = {
      d   : LZ(d),
      D   : DAY_NAMES[E].substr(0,3),
      j   : d,
      l   : DAY_NAMES[E],
      ll  : today ? "Today" : yesterday ? "Yesterday" : tomorrow ? "Tomorrow" : DAY_NAMES[D],
      N   : E + 1,
      S   : d+(d % 10 == 1 && d != 11 ? 'st' : (d % 10 == 2 && d != 12 ? 'nd' : (d % 10 == 3 && d != 13 ? 'rd' : 'th'))),
      w   : E,
      z   : date.diff(new Date(y, 0, 1), {
               units :  "d",
               labels : false
            }),

      W   : Math.ceil(parseInt(date.diff(new Date(y, 0, 1), {
               units :  "d",
               labels : false
            })) / 7),

      F   : MONTH_NAMES[M-1],
      m   : LZ(M),
      M   : MONTH_NAMES[M-1].substr(0, 3),
      n   : M,
      t   : date.getDaysInMonth(),

      L   : date.isLeapYear(),
      Y   : y,
      y   : (y + "").substr(2, 4),

      a   : (H > 11) ? "pm" : "am",
      A   : (H > 11) ? "PM" : "AM",

      B   : Math.floor((((date.getUTCHours() + 1) % 24) + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600) * 1000 / 24),

      g   : (H===0) ? 12 : (H>12) ? H-12 : H,
      G   : H,
      h   : LZ((H===0) ? 12 : (H>12) ? H-12 : H),
      H   : LZ(H),

      i   : LZ(m),
      ii  : m,

      s   : LZ(s),
      ss  : s,

      v   : n,
      vv  : LZ(n, 3),

      e   : tz,
      I   : date.isDayLightSavings(),
      O   : tzO,
      P   : tzO.slice(0,3) + ":" + tzO.slice(3,5),
      p   : parseInt(tzO) == 0 ? "Z" : tzO.slice(0,3) + ":" + tzO.slice(3,5),
      Z   : (parseInt(tzO.slice(0,3)) * 60 * 60) + (parseInt(tzO.slice(3,5)) * 60),

      c   : date.toISOString(),
      U   : date.getTime()
   };

   value.r = value.D + ", " + value.d + " " + value.M + " " + value.H + ":" + value.i + ":" + value.s + " " + value.O;


   while(i_format < format.length) {
      c = format.charAt(i_format);
      token = "";
      while(format.charAt(i_format) == c && i_format < format.length) token += format.charAt(i_format++);
      if(value[token] != null) result=result + value[token];
      else result=result + token;
   }
   return result;
};

/************ WHAT THE diff *****************
 * Calculates the exact difference between
 * any two dates and outputs the results in
 * a customizable incremental breakdown of
 * time units
 ********************************************
 */
window.Date.prototype.diff = function(date, settings) {
   if(typeof(date) == "undefined") date = new Date();
   else if((typeof(date) == "string" && !/\d/.test(date)) || (typeof(date) == "object" && !date.getTime)) {
      settings = date;
      date = new Date();
   }
   else if(typeof(date) == "string" || typeof(date) == "number") {
      if((new Date(date)) != "Invalid Date" && (new Date(date)) != "NaN") date = new Date(date);
      else {
         console.log("Invalid diff comparison date: " + date);
         return false;
      }
   }

   if(typeof(settings) == "string") settings = {
      units: settings
   };
   if(!settings) settings = {};
   settings = {
      abbr      : settings.abbr || false,
      divider   : settings.divider || ", ",
      labels    : settings.hasOwnProperty('labels') ? settings.labels : {
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
                  },
      same      : settings.same || "Same",
      units     : settings.units || "*",
      zeros     : settings.zeros || false
   };
   if(settings.units == "*") settings.units = "TCDYMWdHmSN";
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

   for(var i = 0; i < settings.units.length; i++) {
      var res = Math.floor(diff / tl[settings.units.charAt(i)]);
      if(res || settings.zeros) {
         if(settings.zeros && settings.units.charAt(i) == "N") {
            if(res < 10) res = "00" + res;
            else if(res < 100) res = "0" + res;
         }
         result.push(res + (settings.labels ? " " + settings.labels[settings.units.charAt(i)][settings.abbr ? 2 : res == 1 ? 0 : 1] : ""));
         diff = diff % tl[settings.units.charAt(i)];
      }
   };

   diff = result.join(settings.divider);
   if(diff === "") diff = settings.same;
   if(settings.lc) diff = diff.toLowerCase();

   return diff;
};

/*************** Date.when() ****************
 * Returns a historical timestamp indicating
 * how long ago the provided date was, like
 * the timestamps on social media posts
 ********************************************
 */
window.Date.prototype.when = function() {
   var
      now       = new Date(),
      ts        = this.f("F j, Y g:i a"),
      nowSec    = now.getTime() / 1000,
      tsSec     = this.getTime() / 1000;

   if((nowSec - tsSec) < 60) ts = "Now";
   else if((nowSec - tsSec) / 60 < 60) ts = this.diff(now, "m");
   else if(((nowSec - tsSec) / 60) / 60 < 12) ts = this.diff(now, "H");
   else if(now.f("Ymd") == this.f("Ymd")) ts = "Today" + this.f("g:i a");
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
window.Date.prototype.getDaysInMonth = function() {
   return new Date(this.getFullYear(), this.getMonth(), 0).getDate();
};

/************* Date.isLeapYear() ***************
 * Returns true if the current year is a leap
 * year
 ***********************************************
 */
window.Date.prototype.isLeapYear = function() {
   return (new Date(this.getFullYear(),1,29)).getDate() == 29;
};

/******** Date.isDayLightSavings() *************
 * Returns true if daylight savings is currently
 * in effect
 ***********************************************
 */
window.Date.prototype.isDayLightSavings = function () {
   return this.getTimezoneOffset() < Math.max(( new Date(this.getFullYear(), 0, 1)).getTimezoneOffset(), (new Date(this.getFullYear(), 6, 1)).getTimezoneOffset());
}

/******* Date.getDaylightSavingsDays() *********
 * Returns an array containing date objects for
 * the two daylight savings change days within
 * the current year
 ***********************************************
 */
window.Date.prototype.getDaylightSavingsDays = function() {
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

/******** Date.isDaylightSavingsDay() **********
 * Returns true if the current day is a
 * daylight savings change day
 ***********************************************
 */
window.Date.prototype.isDaylightSavingsDay = function() {
   var comp = new Date(this.getTime());
   comp.setDate(comp.getDate()+1);
   return (comp.getTime() - this.getTime())/1000/60/60 != 24;
};