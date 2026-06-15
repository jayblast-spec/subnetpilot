"use client";

import { useState } from "react";
import ScanForm from "./ScanForm";
import ResultCard from "./ResultCard";
import { parseCidr, CidrInfo } from "./subnetMath";

type State = "initial" | "invalid" | CidrInfo;

export default function CidrCalculatorPanel() {
  const [result, setResult] = useState<State>("initial");

  function handleSubmit(value: string) {
    const info = parseCidr(value);
    setResult(info ?? "invalid");
  }

  return (
    <div className="flex flex-col gap-4">
      <ScanForm
        label="Enter an IP address with prefix"
        placeholder="e.g. 192.168.1.0/24"
        defaultValue="192.168.1.0/24"
        loading={false}
        buttonText="Calculate"
        helpText="Calculations run entirely in your browser — nothing is sent anywhere."
        onSubmit={handleSubmit}
      />

      {result === "invalid" && (
        <ResultCard variant="danger" title="Enter a valid CIDR, e.g. 10.0.0.0/24" />
      )}

      {typeof result === "object" && (
        <ResultCard variant="safe" title={`${result.network}/${result.prefix}`}>
          <dl className="grid grid-cols-2 gap-y-2 text-xs sm:text-sm">
            <dt className="text-muted">Network address</dt>
            <dd className="text-right font-mono text-foreground">{result.network}</dd>

            <dt className="text-muted">Broadcast address</dt>
            <dd className="text-right font-mono text-foreground">{result.broadcast}</dd>

            <dt className="text-muted">Subnet mask</dt>
            <dd className="text-right font-mono text-foreground">{result.netmask}</dd>

            <dt className="text-muted">Wildcard mask</dt>
            <dd className="text-right font-mono text-foreground">{result.wildcard}</dd>

            <dt className="text-muted">First usable host</dt>
            <dd className="text-right font-mono text-foreground">{result.firstHost}</dd>

            <dt className="text-muted">Last usable host</dt>
            <dd className="text-right font-mono text-foreground">{result.lastHost}</dd>

            <dt className="text-muted">Total addresses</dt>
            <dd className="text-right font-mono text-foreground">
              {result.totalHosts.toLocaleString()}
            </dd>

            <dt className="text-muted">Usable hosts</dt>
            <dd className="text-right font-mono text-foreground">
              {result.usableHosts.toLocaleString()}
            </dd>

            <dt className="text-muted">IP class</dt>
            <dd className="text-right font-mono text-foreground">{result.ipClass}</dd>
          </dl>
        </ResultCard>
      )}

      {result === "initial" && (
        <div className="rounded-xl border border-border bg-surface p-4 text-sm text-muted">
          <p className="font-medium text-foreground">What you get</p>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-xs">
            <li>Network and broadcast addresses</li>
            <li>Subnet mask and wildcard mask</li>
            <li>First/last usable host range</li>
            <li>Total vs. usable host counts</li>
          </ul>
        </div>
      )}
    </div>
  );
}
