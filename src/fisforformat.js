/************** F is for Format ***************
 * Outputs a JavaScript Date Object in various
 * customizable formats
 **********************************************
 */

window.Date.prototype.f = function(format) {
   if(this === "" || this == "NaN") return "Invalid Date";
   else if(format == "U") return this.getTime();
   else if(format == "@") {
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
      (Math.ceil(day_diff / 7)) == 1 && "1 week ago" ||
      day_diff < 78 && Math.ceil( day_diff / 7 ) + " weeks ago" ||
      day_diff < 730 && Math.ceil( day_diff / 30 ) + " months ago" ||
      Math.ceil(day_diff / 365) + " years ago";
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
      z   : Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24),

      W   : Math.ceil(( date.getDay() + 1 + Math.floor((date - new Date(date.getFullYear(), 0, 1)) / (24 * 60 * 60 * 1000))) / 7),

      F   : MONTH_NAMES[M-1],
      m   : LZ(M),
      M   : MONTH_NAMES[M-1].substr(0, 3),
      n   : M,
      t   : new Date(this.getFullYear(), this.getMonth(), 0).getDate(),

      L   : (new Date(this.getFullYear(), 1, 29)).getDate() == 29,
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
      I   : this.getTimezoneOffset() < Math.max((new Date(this.getFullYear(), 0, 1)).getTimezoneOffset(), (new Date(this.getFullYear(), 6, 1)).getTimezoneOffset()),
      O   : tzO,
      P   : tzO.slice(0,3) + ":" + tzO.slice(3,5),
      p   : parseInt(tzO) == 0 ? "Z" : tzO.slice(0,3) + ":" + tzO.slice(3,5),
      Z   : (parseInt(tzO.slice(0,3)) * 60 * 60) + (parseInt(tzO.slice(3,5)) * 60),

      c   : date.toISOString()
   };

   value.r = value.D + ", " + value.d + " " + value.M + " " + value.H + ":" + value.i + ":" + value.s + " " + value.O;

   while(i_format < format.length) {
      c = format.charAt(i_format);
      token = "";
      while(format.charAt(i_format) == c && i_format < format.length) token += format.charAt(i_format++);
      if(value[token] != null) result=result + value[token];
      else result = result + token;
   }

   return result;
};
