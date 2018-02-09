const moment = require("moment");

const nowInUtc = () =>
  moment.utc().format("YYYY-MM-DDTHH:mm:ss.SSSZZ");

module.exports = nowInUtc;
