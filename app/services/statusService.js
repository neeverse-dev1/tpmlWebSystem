const db = require(__basedir + '/app/models/db');
const os = require('os');
const si = require('systeminformation');
const address = require('ip');
const axios = require('axios');

exports.getStatus = async () => {
  const [
    cpuLoad,
    memInfo,
    publicIpRes
  ] = await Promise.all([
    si.currentLoad(),
    si.mem(),
    axios.get('https://api.ipify.org?format=json')
  ]);

  const cpuUsagePercent = parseFloat(cpuLoad.currentLoad.toFixed(1));
  const ramUsagePercent = parseFloat(((memInfo.total - memInfo.available) / memInfo.total * 100).toFixed(1));
  const localIp = address.address();
  const publicIp = publicIpRes.data.ip;

  const uptimeSec = os.uptime();
  const uptimeStr = `${Math.floor(uptimeSec / 3600)}시간 ${Math.floor((uptimeSec % 3600) / 60)}분`;

  return {
    cpuModel: os.cpus()[0].model,
    cpuCores: os.cpus().length,
    cpuUsagePercent,
    ramUsagePercent,
    memTotal: memInfo.total,
    memFree: memInfo.free,
    osVersion: os.version?.() || os.release(),
    osPlatform: os.platform(),
    nodeVersion: process.version,
    serverStarted: new Date(Date.now() - process.uptime() * 1000).toLocaleString(),
    localIp,
    publicIp,
    uptimeStr
  };
};
