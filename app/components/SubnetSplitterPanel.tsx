"use client";

import { FormEvent, useState } from "react";
import ResultCard from "./ResultCard";
import { splitSubnet, parseCidr, SubnetSplit } from "./subnetMath";

type State =
  | "initial"
  | "invalid"
  | { subnets: SubnetSplit[]; total: number; truncated: boolean; prefix: number };

export default function SubnetSplitterPanel() {
  const [cidr, setCidr] = useState("192.168.1.0/24");
  const [newPrefix, setNewPrefix] = useState("26");
  const [result, setResult] = useState<State>("initial");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const info = parseCidr(cidr);
    const prefix = Number(newPrefix);
    if (!info || !Number.isInteger(prefix)) {
      setResult("invalid");
      return;
    }
    const split = splitSubnet(cidr, prefix);
    if (!split) {
      setResult("invalid");
      return;
    }
    setResult({ ...split, prefix });
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">
          Split a network into smaller subnets
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={cidr}
            onChange={(e) => setCidr(e.target.value)}
            placeholder="e.g. 192.168.1.0/24"
            autoComplete="off"
            className="flex-1 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
          />
          <span className="flex items-center text-muted">/</span>
          <input
            type="number"
            min={0}
            max={32}
            value={newPrefix}
            onChange={(e) => setNewPrefix(e.target.value)}
            className="w-20 rounded-lg border border-border bg-surface px-3 py-3 text-sm text-foreground focus:border-accent focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-background transition-opacity disabled:opacity-50"
        >
          Split
        </button>
        <p className="text-xs text-muted">
          New prefix must be equal to or larger than the original (smaller subnets).
        </p>
      </form>

      {result === "invalid" && (
        <ResultCard variant="danger" title="Enter a valid network and a prefix between the original and 32" />
      )}

      {typeof result === "object" && (
        <ResultCard
          variant="safe"
          title={`${result.total.toLocaleString()} subnet${result.total > 1 ? "s" : ""} of /${result.prefix}`}
        >
          {result.truncated && (
            <p className="mb-2 text-xs text-warn">
              Showing the first {result.subnets.length.toLocaleString()} of{" "}
              {result.total.toLocaleString()} subnets.
            </p>
          )}
          <div className="max-h-80 overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-muted">
                <tr>
                  <th className="pb-1 pr-2">Subnet</th>
                  <th className="pb-1 pr-2">Host range</th>
                  <th className="pb-1">Broadcast</th>
                </tr>
              </thead>
              <tbody className="font-mono text-foreground">
                {result.subnets.map((s) => (
                  <tr key={s.cidr} className="border-t border-border">
                    <td className="py-1 pr-2">{s.cidr}</td>
                    <td className="py-1 pr-2">
                      {s.firstHost} – {s.lastHost}
                    </td>
                    <td className="py-1">{s.broadcast}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ResultCard>
      )}

      {result === "initial" && (
        <div className="rounded-xl border border-border bg-surface p-4 text-sm text-muted">
          <p className="font-medium text-foreground">How it works</p>
          <p className="mt-2 text-xs">
            Enter a network and a larger prefix length to see every resulting subnet, its usable
            host range, and broadcast address.
          </p>
        </div>
      )}
    </div>
  );
}
