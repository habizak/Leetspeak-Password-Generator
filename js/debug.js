/**
 * Debug Utility
 * Runtime logging for development and troubleshooting
 */

const DEBUG = location.search.includes('debug=1');

const logs = [];

export function debug(label, data) {
  if (!DEBUG) return;

  const t = new Date().toISOString().split('T')[1].split('.')[0];

  const entry = { t, label, data };

  logs.push(entry);

  console.log(`🟡 [${t}] ${label}`, data ?? '');
}

export function dumpDebug() {
  console.table(logs);

  navigator.clipboard.writeText(JSON.stringify(logs, null, 2));
}

export function clearDebugLogs() { 
  logs.length = 0; 
  console.clear(); 
}

