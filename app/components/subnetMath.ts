export type CidrInfo = {
  input: string;
  ip: string;
  prefix: number;
  netmask: string;
  wildcard: string;
  network: string;
  broadcast: string;
  firstHost: string;
  lastHost: string;
  totalHosts: number;
  usableHosts: number;
  ipClass: string;
};

export type SubnetSplit = {
  network: string;
  firstHost: string;
  lastHost: string;
  broadcast: string;
  cidr: string;
};

const IP_RE = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;

export function ipToInt(ip: string): number | null {
  const match = ip.match(IP_RE);
  if (!match) return null;
  const parts = match.slice(1, 5).map(Number);
  if (parts.some((p) => p < 0 || p > 255)) return null;
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

export function intToIp(int: number): string {
  return [
    (int >>> 24) & 255,
    (int >>> 16) & 255,
    (int >>> 8) & 255,
    int & 255,
  ].join(".");
}

function ipClassOf(firstOctet: number): string {
  if (firstOctet < 128) return "A";
  if (firstOctet < 192) return "B";
  if (firstOctet < 224) return "C";
  if (firstOctet < 240) return "D (multicast)";
  return "E (reserved)";
}

export function parseCidr(input: string): CidrInfo | null {
  const trimmed = input.trim();
  const parts = trimmed.split("/");
  if (parts.length !== 2) return null;

  const ipInt = ipToInt(parts[0]);
  const prefix = Number(parts[1]);
  if (ipInt === null) return null;
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) return null;

  const netmaskInt = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  const wildcardInt = (~netmaskInt) >>> 0;
  const networkInt = (ipInt & netmaskInt) >>> 0;
  const broadcastInt = (networkInt | wildcardInt) >>> 0;

  const totalHosts = Math.pow(2, 32 - prefix);
  let usableHosts: number;
  let firstHost: number;
  let lastHost: number;

  if (prefix >= 31) {
    usableHosts = prefix === 32 ? 1 : 2;
    firstHost = networkInt;
    lastHost = broadcastInt;
  } else {
    usableHosts = totalHosts - 2;
    firstHost = networkInt + 1;
    lastHost = broadcastInt - 1;
  }

  return {
    input: trimmed,
    ip: parts[0],
    prefix,
    netmask: intToIp(netmaskInt),
    wildcard: intToIp(wildcardInt),
    network: intToIp(networkInt),
    broadcast: intToIp(broadcastInt),
    firstHost: intToIp(firstHost),
    lastHost: intToIp(lastHost),
    totalHosts,
    usableHosts,
    ipClass: ipClassOf((ipInt >>> 24) & 255),
  };
}

const MAX_SUBNETS_RETURNED = 256;

export function splitSubnet(
  cidrInput: string,
  newPrefix: number
): { subnets: SubnetSplit[]; total: number; truncated: boolean } | null {
  const info = parseCidr(cidrInput);
  if (!info) return null;
  if (newPrefix < info.prefix || newPrefix > 32) return null;

  const networkInt = ipToInt(info.network);
  if (networkInt === null) return null;

  const blockSize = Math.pow(2, 32 - newPrefix);
  const total = Math.pow(2, newPrefix - info.prefix);
  const limit = Math.min(total, MAX_SUBNETS_RETURNED);

  const subnets: SubnetSplit[] = [];
  for (let i = 0; i < limit; i++) {
    const subNetworkInt = (networkInt + i * blockSize) >>> 0;
    const subBroadcastInt = (subNetworkInt + blockSize - 1) >>> 0;
    let firstHost = subNetworkInt;
    let lastHost = subBroadcastInt;
    if (newPrefix < 31) {
      firstHost = subNetworkInt + 1;
      lastHost = subBroadcastInt - 1;
    }
    subnets.push({
      network: intToIp(subNetworkInt),
      firstHost: intToIp(firstHost),
      lastHost: intToIp(lastHost),
      broadcast: intToIp(subBroadcastInt),
      cidr: `${intToIp(subNetworkInt)}/${newPrefix}`,
    });
  }

  return { subnets, total, truncated: total > MAX_SUBNETS_RETURNED };
}
