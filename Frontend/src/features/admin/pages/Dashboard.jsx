import { useEffect, useState } from "react";
import { FileText, Clock3, CheckCircle2, XCircle } from "lucide-react";

import DashboardHeader from "../components/DashboardHeader";
import StatsCard from "../components/StatsCard";
import RecentPending from "../components/RecentPending";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  const { handleDashboardStats } = useAdmin();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const data = await handleDashboardStats();

    if (data) {
      setStats(data);
    }
  };

  return (
    <div className="space-y-8">
      <DashboardHeader />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Articles"
          value={stats?.totalArticles || 0}
          icon={<FileText className="text-white" />}
          color="bg-blue-600"
        />

        <StatsCard
          title="Pending"
          value={stats?.pendingArticles || 0}
          icon={<Clock3 className="text-white" />}
          color="bg-yellow-500"
        />

        <StatsCard
          title="Approved"
          value={stats?.approvedArticles || 0}
          icon={<CheckCircle2 className="text-white" />}
          color="bg-green-600"
        />

        <StatsCard
          title="Rejected"
          value={stats?.rejectedArticles || 0}
          icon={<XCircle className="text-white" />}
          color="bg-red-600"
        />
      </div>

      <RecentPending />
    </div>
  );
};

export default Dashboard;
