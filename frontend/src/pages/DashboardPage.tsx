import MarketTicker from "@components/dashboard/MarketTicker";
import MarketLineChart from "@components/dashboard/MarketLineChart";
import StockExchangeSummary from "@components/dashboard/StockExchangeSummary";
import StrengthMeter from "@components/dashboard/StrengthMeter";
import TopValueTable from "@components/dashboard/TopValueTable";
import SectorDistribution from "@components/dashboard/SectorDistribution";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Market Ticker Strip */}
      <section>
        <MarketTicker />
      </section>

      {/* Primary Dashboard Grid - 3 columns */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. Market Line Chart */}
        <div className="lg:col-span-1">
          <MarketLineChart />
        </div>

        {/* 2. Stock Exchange Summary */}
        <div className="lg:col-span-1">
          <StockExchangeSummary />
        </div>

        {/* 3. Strength Meter */}
        <div className="lg:col-span-1">
          <StrengthMeter />
        </div>
      </section>

      {/* Secondary Section - Data & Distribution */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* A. Top Value List Table - Takes 2 columns */}
        <div className="lg:col-span-2">
          <TopValueTable />
        </div>

        {/* B. Today's Value by Sector - Takes 1 column */}
        <div className="lg:col-span-1">
          <SectorDistribution />
        </div>
      </section>
    </div>
  );
}
