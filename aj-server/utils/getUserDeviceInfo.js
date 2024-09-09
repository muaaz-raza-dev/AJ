const useragent = require("useragent");

function getUserDeveiceInfo (req){
    const agent = useragent.parse(req.headers['user-agent']);
    return ({
      browser: agent.toAgent(),
      os: agent.os.toString(),
      platform: agent.device.toString(),
    });
}

module.exports = getUserDeveiceInfo;