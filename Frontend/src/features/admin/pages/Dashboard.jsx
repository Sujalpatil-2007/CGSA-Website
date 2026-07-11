import DashboardHeader from "../components/DashboardHeader";
import StatsCard from "../components/StatsCard";
import RecentPending from "../components/RecentPending";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("/admin/dashboard");

      setStats(res.data.stats);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-8">
      <DashboardHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <StatsCard title="Users" value={stats?.totalUsers || 0} />

        <StatsCard title="Articles" value={stats?.totalArticles || 0} />

        <StatsCard title="Pending" value={stats?.pendingArticles || 0} />

        <StatsCard title="Published" value={stats?.publishedArticles || 0} />

        <StatsCard title="Rejected" value={stats?.rejectedArticles || 0} />

        <StatsCard
          title="Changes Requested"
          value={stats?.changesRequestedArticles || 0}
        />
      </div>

      <RecentPending />
    </div>
  );
};

export default Dashboard;
