import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, Vote, TrendingUp } from 'lucide-react';
import { useEffect } from 'react';

export const AdminStats = () => {
  const { data: stats, refetch } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [initiativesRes, votesRes, profilesRes] = await Promise.all([
        supabase.from('initiatives').select('id, status', { count: 'exact' }),
        supabase.from('votes').select('id', { count: 'exact' }),
        supabase.from('profiles').select('id', { count: 'exact' })
      ]);

      const activeInitiatives = initiativesRes.data?.filter(i => i.status === 'active').length || 0;

      return {
        totalInitiatives: initiativesRes.count || 0,
        activeInitiatives,
        totalVotes: votesRes.count || 0,
        totalUsers: profilesRes.count || 0
      };
    },
    refetchInterval: 5000 // Refresh every 5 seconds for real-time updates
  });

  useEffect(() => {
    const channel = supabase
      .channel('admin-stats-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'initiatives'
        },
        () => refetch()
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'votes'
        },
        () => refetch()
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        () => refetch()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Inițiative</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.totalInitiatives || 0}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {stats?.activeInitiatives || 0} active
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Voturi</CardTitle>
          <Vote className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.totalVotes || 0}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Toate inițiativele
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Utilizatori</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Înregistrați
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Participare</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats?.totalUsers && stats?.totalVotes
              ? ((stats.totalVotes / stats.totalUsers) * 100).toFixed(1)
              : 0}%
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Rată de vot
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
