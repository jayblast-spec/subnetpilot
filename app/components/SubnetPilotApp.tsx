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
        <div className="flex items-center gap-3">
          <span className="icon-3d">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="8" height="8" rx="1.5" stroke="white" strokeWidth="1.8" />
              <rect x="13" y="4" width="8" height="8" rx="1.5" stroke="white" strokeWidth="1.8" opacity="0.55" />
              <rect x="3" y="14" width="8" height="6" rx="1.5" stroke="white" strokeWidth="1.8" opacity="0.55" />
              <rect x="13" y="14" width="8" height="6" rx="1.5" stroke="white" strokeWidth="1.8" opacity="0.85" />
            </svg>
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
