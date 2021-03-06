// config.js
module.exports = {
  env: {
    envFilename: `.env.staging`
  },
  arp: {
    interface: "edge0",
    entry_interface: "iface"
  },
  watcher_apr: {
    path_to_watch: "/proc/net/arp"
  },
  watcher_leases: {
    path_to_watch: "/var/lib/misc/dnsmasq.leases"
  },
  general: {
    ipDnsServer: "10.10.0.1",
    //tenant_id: "Agri01",
    //ipIpDb: "127.0.0.1",
    ipIpDb: process.env.IPDb,
    path_to_log: "/root/log.txt",
    path_to_log_ok: "/root/log_ok.txt",
    path_to_log_err: "/root/log_err.txt", 
    //ipFrontend: "172.19.0.5",
    ipFrontend: process.env.IPFrontend,
    ipDnsServerApp: process.env.IPDnsServerApp,
    //ipDnsServerApp: "172.19.0.6",
    portDnsServerApp: "3900",
    portFrontend: "4100"
  }
};
