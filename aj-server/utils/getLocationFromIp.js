const requestIp = require('request-ip');
const ipinfo = require("ipinfo");
const getUserDeveiceInfo = require('./getUserDeviceInfo');
const ExtractIpAddress = (req) => {
    const ip = requestIp.getClientIp(req); 
    return ip
  };

const getLocationFromIP = (ip) => {
    return  new Promise((resolve, reject) => {
      ipinfo(ip, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
};

const getExtensiveLoginInfo = async (req) =>{
  const deviceInfo = getUserDeveiceInfo(req)
  const ip = ExtractIpAddress(req);
  try {
    const locationInfo  =await getLocationFromIP(ip)
    return { ip,locationInfo,deviceInfo}
  }
  catch(err){
    return { ip,locationInfo:{},deviceInfo}

  }
}
  module.exports = {ExtractIpAddress,getLocationFromIP,getExtensiveLoginInfo}