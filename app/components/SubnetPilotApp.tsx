"use client";

import { useState } from "react";
import ToolTabs, { TabId } from "./ToolTabs";
import CidrCalculatorPanel from "./CidrCalculatorPanel";
import SubnetSplitterPanel from "./SubnetSplitterPanel";
import CrossPromoFooter from "./CrossPromoFooter";

export default function SubnetPilotApp() {
  const [activeTab, setActiveTab] = useState<TabId>("calculator");

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-8 sm:py-12">
      <header className="mb-6">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-lg text-accent">
            ◧
          </span>
          <h1 className="text-xl font-bold text-foreground">SubnetPilot</h1>
        </div>
        <p className="mt-2 text-sm text-muted">
          Subnet & CIDR calculator — free, instant, runs entirely in your browser.
        </p>
      </header>

      <ToolTabs active={activeTab} onChange={setActiveTab} />

      <div className="mt-4">
        {activeTab === "calculator" && <CidrCalculatorPanel />}
        {activeTab === "splitter" && <SubnetSplitterPanel />}
      </div>

      <CrossPromoFooter />
    </main>
  );
}
