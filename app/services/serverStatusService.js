// services/serverStatusService.js
const os = require('os');
const si = require('systeminformation'); // npm install systeminformation


exports.getStatus = async () => {
  const mem = os.totalmem();
  const free = os.freemem();
  const used = mem - free;

  const disk = await si.fsSize();
  const net = await si.networkStats();
  const uptime = os.uptime();

  return {
    cpu: await si.currentLoad().then(load => Math.round(load.currentLoad)),
    ram_used: (used / 1024 / 1024 / 1024).toFixed(1),
    ram_total: (mem / 1024 / 1024 / 1024).toFixed(1),
    ram_percent: Math.round((used / mem) * 100),
    disk_used: (disk[0].used / 1024 / 1024 / 1024).toFixed(0),
    disk_total: (disk[0].size / 1024 / 1024 / 1024).toFixed(0),
    disk_percent: Math.round((disk[0].used / disk[0].size) * 100),
    net_up: (net[0].tx_sec / 1024 / 1024).toFixed(1),
    net_down: (net[0].rx_sec / 1024 / 1024).toFixed(1),
    local_ip: getLocalIP(),
    node_version: process.version,
    uptime: formatUptime(uptime),
    started_at: new Date(Date.now() - uptime * 1000).toISOString().slice(0, 19).replace('T', ' ')
  };
};


function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) return iface.address;
    }
  }
  return '-';
}

function formatUptime(seconds) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${d}일 ${h}시간 ${m}분`;
}
