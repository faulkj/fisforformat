/************ WHAT THE diff *****************
 * Calculates the exact difference between
 * any two dates and outputs the results in
 * a customizable incremental breakdown of
 * time units
 ********************************************
 */
window.Date.prototype.diff = (date, settings) => {
   if(typeof(date) == "undefined") date = new Date();
   else if((typeof(date) == "string" && !/\d/.test(date)) || (typeof(date) == "object" && !date.getTime)) {
      settings = date;
      date = new Date();
   }
   else if(typeof(date) == "string" || typeof(date) == "number") {
      if((new Date(date)) != "Invalid Date" && new Date(date) != "NaN") date = new Date(date);
      else {
         console.log("Invalid diff comparison date: " + date);
         return false;
      }
   }

   if(typeof(settings) == "string") settings = {
      units: settings
   };
   else if(!settings) settings = {};

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
   var
      min    = date <= this && date || date > this && this,
      max    = date > this && date || date <= this && this,
      diff   = (max.getTime() - min.getTime()),
      tl     = {
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
