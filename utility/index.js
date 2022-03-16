var moment = require("moment");
var TOKEN_SECRET =
  "35c3a4381ae55840ebf6e5001d5e6fbf736721b7c34cf06b836c9616216c272f02031e9231eb86769b8ba8cf4fc3a3460cb0404251632eeada6475007fd2899a";
var CURRENT_DATETIME = moment().format("YYYY-MM-DD HH:mm:ss");
module.exports = { TOKEN_SECRET, CURRENT_DATETIME };
