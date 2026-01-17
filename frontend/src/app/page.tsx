"use client";

import React, { useMemo,useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation.js";
import { useAdmin } from "@/contexts/AdminContext";
import StatCard from "@/components/admin/StatCard";
import AdminLayout from "@/components/admin/AdminLayout";
import { FileEdit, MessageSquareQuote, Users, Clock, AlertCircle, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils"; // --- IMPORT ADDED HERE ---

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {Provider} from "react-redux"
import store from "../contextapi/store.js"
import {login} from "../contextapi/authSlice.js"
import { getCurrentUser } from "@/services/user.api.js";
type PieDatum = { name: string; value: number };

type PieLabelArgs = {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
};

const safeDate = (s?: string) => {
  if (!s) return null;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
};

const monthKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
const monthLabel = (d: Date) =>
  d.toLocaleString(undefined, { month: "short" }) + " " + String(d.getFullYear()).slice(2);

const buildLastNMonths = (end: Date, n: number) => {
  const months: Date[] = [];
  const cursor = new Date(end.getFullYear(), end.getMonth(), 1);
  for (let i = 0; i < n; i++) {
    months.unshift(new Date(cursor.getFullYear(), cursor.getMonth() - i, 1));
  }
  return months;
};

const sumTotal = (data: PieDatum[]) => data.reduce((acc, d) => acc + (d.value || 0), 0);

const makePieTooltip =
  (total: number) =>
  ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const item = payload[0];
    const name = item?.name ?? "";
    const value = item?.value ?? 0;
    const pct = total ? Math.round((value / total) * 100) : 0;

    return (
      <div className="rounded-xl border border-border bg-background/95 px-3 py-2 shadow-sm">
        <div className="text-sm font-medium">{String(name)}</div>
        <div className="text-xs text-muted-foreground">
          {value} ({pct}%)
        </div>
      </div>
    );
  };

const renderPieLabel = (args: PieLabelArgs) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = args;

  if (
    cx == null ||
    cy == null ||
    midAngle == null ||
    innerRadius == null ||
    outerRadius == null ||
    percent == null
  ) {
    return null;
  }

  if (percent < 0.06) return null; // hide <6% to avoid clutter

  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="fill-foreground text-[11px] font-medium opacity-80"
    >
      {`${Math.round(percent * 100)}%`}
    </text>
  );
};

const PIE_COLORS = ["#0EA5E9", "#F59E0B", "#10B981", "#64748B", "#F43F5E"];

const Dashboard: React.FC = () => {
  const { contentSections, testimonials, clients } = useAdmin();

  const pendingTestimonials = testimonials.filter((t) => t.status === "pending").length;
  const newClients = clients.filter((c) => c.status === "new").length;

  const recentClients = [...clients]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const recentTestimonials = [...testimonials]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const statusColors: Record<string, string> = {
    new: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20",
    "in-progress": "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
    completed: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
    archived: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20",
    pending: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
    approved: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
    rejected: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20",
  };

  // Pie data
  const clientStatusData: PieDatum[] = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of clients) map.set(c.status, (map.get(c.status) || 0) + 1);
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [clients]);

  const testimonialStatusData: PieDatum[] = useMemo(() => {
    const map = new Map<string, number>();
    for (const t of testimonials) map.set(t.status, (map.get(t.status) || 0) + 1);
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [testimonials]);

  const clientPieTotal = useMemo(() => sumTotal(clientStatusData), [clientStatusData]);
  const testimonialPieTotal = useMemo(() => sumTotal(testimonialStatusData), [testimonialStatusData]);

  // Bar chart: last 6 months activity (clients vs testimonials)
  const activityData = useMemo(() => {
    const allDates: Date[] = [
      ...clients.map((c) => safeDate(c.createdAt)).filter(Boolean),
      ...testimonials.map((t) => safeDate(t.createdAt)).filter(Boolean),
    ] as Date[];

    const end = allDates.length ? new Date(Math.max(...allDates.map((d) => d.getTime()))) : new Date();
    const months = buildLastNMonths(end, 6);

    const buckets = new Map<string, { month: string; clients: number; testimonials: number }>();
    for (const m of months) {
      buckets.set(monthKey(m), { month: monthLabel(m), clients: 0, testimonials: 0 });
    }

    for (const c of clients) {
      const d = safeDate(c.createdAt);
      if (!d) continue;
      const key = monthKey(new Date(d.getFullYear(), d.getMonth(), 1));
      if (buckets.has(key)) buckets.get(key)!.clients += 1;
    }

    for (const t of testimonials) {
      const d = safeDate(t.createdAt);
      if (!d) continue;
      const key = monthKey(new Date(d.getFullYear(), d.getMonth(), 1));
      if (buckets.has(key)) buckets.get(key)!.testimonials += 1;
    }

    return Array.from(buckets.values());
  }, [clients, testimonials]);

    const router=useRouter()
    const dispatch=useDispatch();
    useEffect(() => {
    const getuser = async () => {
        try {
            // 1. Attempt to fetch user
            const user = await getCurrentUser();

            // 2. Check if user data exists
            if (user) {
                dispatch(login(user?.data.data));
                console.log("user logged in");
            } else {
                // If API returns success but no user, force an error to trigger catch
                throw new Error("No user found");
            }
        } catch (error) {
            // 3. Handle ANY failure (API error or missing user) here
            console.log("user not logged in or fetch failed", error);
            router.push("/register");
        }
    };

    getuser();
}, [dispatch, router]); // Add dependencies for best practice

  return (
    <div className="space-y-8 bg-gradient-to-b from-background via-background to-muted/40">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Overview
          </div>

          <h1 className="mt-3 text-3xl md:text-4xl font-heading font-semibold tracking-tight">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Welcome back to Bloom Branding Admin</p>

          <div className="mt-3 h-[2px] w-44 rounded-full bg-gradient-to-r from-sky-500/70 via-emerald-500/50 to-transparent" />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Badge className="rounded-full border bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20">
            {newClients} new clients
          </Badge>
          <Badge className="rounded-full border bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20">
            {pendingTestimonials} pending testimonials
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur shadow-sm p-5">
          <StatCard title="Content Sections" value={contentSections.length} icon={FileEdit} iconColor="text-sky-600" />
        </div>

        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur shadow-sm p-5">
          <StatCard
            title="Testimonials"
            value={testimonials.length}
            icon={MessageSquareQuote}
            trend={{ value: 12, isPositive: true }}
            iconColor="text-emerald-600"
          />
        </div>

        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur shadow-sm p-5">
          <StatCard title="Total Clients" value={clients.length} icon={Users} trend={{ value: 8, isPositive: true }} iconColor="text-sky-600" />
        </div>

        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur shadow-sm p-5">
          <StatCard title="Pending Actions" value={pendingTestimonials + newClients} icon={Clock} iconColor="text-amber-600" />
        </div>
      </div>

      {/* Pie charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur shadow-sm">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-heading font-semibold">Clients by Status</h2>
              <Badge variant="outline" className="rounded-full">Total: {clients.length}</Badge>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={clientStatusData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={2}
                    labelLine={false}
                    label={renderPieLabel}
                  >
                    {clientStatusData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={makePieTooltip(clientPieTotal)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {clientStatusData.length === 0 && (
              <p className="text-sm text-muted-foreground">No client data yet.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur shadow-sm">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-heading font-semibold">Testimonials by Status</h2>
              <Badge variant="outline" className="rounded-full">Total: {testimonials.length}</Badge>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={testimonialStatusData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={2}
                    labelLine={false}
                    label={renderPieLabel}
                  >
                    {testimonialStatusData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={makePieTooltip(testimonialPieTotal)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {testimonialStatusData.length === 0 && (
              <p className="text-sm text-muted-foreground">No testimonial data yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="rounded-2xl border border-border bg-card/60 backdrop-blur shadow-sm">
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-heading font-semibold">Activity (Last 6 Months)</h2>
            <Badge variant="outline" className="rounded-full">Clients vs Testimonials</Badge>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="clients" name="Clients" fill="#0EA5E9" radius={[6, 6, 0, 0]} />
                <Bar dataKey="testimonials" name="Testimonials" fill="#10B981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {activityData.length === 0 && (
            <p className="text-sm text-muted-foreground">No activity data yet.</p>
          )}
        </div>
      </div>

      {/* Recent Lists */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Clients */}
        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur shadow-sm overflow-hidden">
          <div className="p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-heading font-semibold">Recent Clients</h2>
              <Badge variant="outline" className="gap-1 rounded-full">
                <AlertCircle className="w-3.5 h-3.5" />
                {newClients} new
              </Badge>
            </div>

            <div className="space-y-3">
              {recentClients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-4 py-3 hover:bg-muted/40 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="font-medium truncate">{client.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{client.company}</p>
                  </div>

                  <div className="text-right">
                    {/* --- FIX START: Uses cn() and variant="outline" --- */}
                    <Badge 
                      variant="outline"
                      className={cn(
                        "rounded-full px-3 py-1", 
                        statusColors[client.status]
                      )}
                    >
                      {client.status.replace("-", " ")}
                    </Badge>
                    {/* --- FIX END --- */}
                    <p className="text-xs text-muted-foreground mt-1">{client.createdAt}</p>
                  </div>
                </div>
              ))}
            </div>

            {recentClients.length === 0 && (
              <p className="text-sm text-muted-foreground">No clients yet.</p>
            )}
          </div>
        </div>

        {/* Recent Testimonials */}
        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur shadow-sm overflow-hidden">
          <div className="p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-heading font-semibold">Recent Testimonials</h2>
              <Badge variant="outline" className="gap-1 rounded-full">
                <Clock className="w-3.5 h-3.5" />
                {pendingTestimonials} pending
              </Badge>
            </div>

            <div className="space-y-3">
              {recentTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="rounded-xl border border-border bg-background/60 px-4 py-3 hover:bg-muted/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="min-w-0">
                      <p className="font-medium truncate">{testimonial.clientName}</p>
                      <p className="text-xs text-muted-foreground truncate">{testimonial.clientCompany}</p>
                    </div>

                    {/* --- FIX START: Uses cn() and variant="outline" --- */}
                    <Badge 
                      variant="outline"
                      className={cn(
                        "rounded-full px-3 py-1", 
                        statusColors[testimonial.status]
                      )}
                    >
                      {testimonial.status}
                    </Badge>
                    {/* --- FIX END --- */}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {testimonial.content}
                  </p>
                </div>
              ))}
            </div>

            {recentTestimonials.length === 0 && (
              <p className="text-sm text-muted-foreground">No testimonials yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  );
}