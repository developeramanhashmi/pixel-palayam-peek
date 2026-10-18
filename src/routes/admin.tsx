import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import {
  Phone,
  Search,
  RefreshCw,
  LogOut,
  Lock,
  CheckCircle2,
  Clock,
  XCircle,
  Users,
  BedDouble,
  Calendar,
  Sparkles,
  MapPin,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

type EnquiryRow = {
  id: string;
  guest_name: string;
  contact_number: string;
  address: string;
  room_type: string;
  number_of_rooms: number;
  total_guests: number;
  additional_requirements: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

// Default Admin Passcode (Client can change this PIN anytime)
const ADMIN_PASSCODE = "8428338999";

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);

  const [enquiries, setEnquiries] = useState<EnquiryRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "NEW" | "CONFIRMED" | "CANCELLED">("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Check persistent session
  useEffect(() => {
    const saved = sessionStorage.getItem("vph_admin_auth");
    if (saved === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem("vph_admin_auth", "true");
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("vph_admin_auth");
    setPasscode("");
  };

  // Fetch enquiries
  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Error fetching enquiries:", error);
      } else if (data) {
        setEnquiries(data as EnquiryRow[]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchEnquiries();
    }
  }, [isAuthenticated]);

  // Update status
  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const { error } = await supabase
        .from("enquiries")
        .update({ status: newStatus })
        .eq("id", id);

      if (!error) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      } else {
        alert("Status update failed: " + error.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Filtered list
  const filtered = useMemo(() => {
    return enquiries.filter((item) => {
      const matchesSearch =
        item.guest_name.toLowerCase().includes(search.toLowerCase()) ||
        item.contact_number.includes(search) ||
        item.address.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" ? true : item.status.toUpperCase() === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [enquiries, search, statusFilter]);

  const stats = useMemo(() => {
    const total = enquiries.length;
    const newCount = enquiries.filter((e) => e.status.toUpperCase() === "NEW").length;
    const confirmedCount = enquiries.filter((e) => e.status.toUpperCase() === "CONFIRMED").length;
    const cancelledCount = enquiries.filter((e) => e.status.toUpperCase() === "CANCELLED").length;
    return { total, newCount, confirmedCount, cancelledCount };
  }, [enquiries]);

  // If not logged in, show Passcode Screen
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[85vh] items-center justify-center px-4 py-16 bg-background">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold border border-gold/30">
              <Lock className="h-7 w-7" />
            </div>
            <h1 className="mt-4 font-serif text-2xl font-bold tracking-tight text-foreground">
              Reception Admin Portal
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Veerapandiyaar Guest House, Periyapalayam
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Enter Admin Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setPasscodeError(false);
                }}
                placeholder="Enter passcode"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-center text-lg tracking-widest outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/20"
                autoFocus
              />
              {passcodeError && (
                <p className="mt-2 text-center text-xs font-medium text-destructive">
                  Invalid Passcode. Please try again.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gold py-3 text-sm font-bold uppercase tracking-wider text-ink shadow-md transition-all hover:bg-gold-light hover:shadow-lg active:scale-98"
            >
              Unlock Dashboard
            </button>
          </form>

          <p className="mt-6 text-center text-[0.7rem] text-muted-foreground/75">
            Default passcode is the reception phone number: <strong className="text-foreground">8428338999</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30 pb-20 pt-24 sm:pt-28">
      <div className="container-x max-w-7xl">
        {/* Top Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-gold border border-gold/30">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Manager Access</span>
              </span>
              <span className="text-xs text-muted-foreground">Live Booking System</span>
            </div>
            <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-foreground">
              Guest Bookings & Enquiries
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={fetchEnquiries}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground shadow-sm transition-all hover:border-gold hover:text-gold active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin text-gold")} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-destructive/30 bg-card px-4 py-2.5 text-xs font-semibold text-destructive shadow-sm transition-all hover:bg-destructive hover:text-destructive-foreground active:scale-95"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <span className="text-xs font-medium text-muted-foreground">Total Bookings</span>
            <p className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-foreground">
              {stats.total}
            </p>
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 shadow-sm">
            <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
              New / Pending
            </span>
            <p className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-amber-700 dark:text-amber-300">
              {stats.newCount}
            </p>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 shadow-sm">
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              Confirmed
            </span>
            <p className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-emerald-700 dark:text-emerald-300">
              {stats.confirmedCount}
            </p>
          </div>

          <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4 shadow-sm">
            <span className="text-xs font-medium text-destructive">Cancelled</span>
            <p className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-destructive">
              {stats.cancelledCount}
            </p>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by guest name, phone number, address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-xs sm:text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-gold focus:ring-2 focus:ring-gold/20"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {(["ALL", "NEW", "CONFIRMED", "CANCELLED"] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all",
                  statusFilter === st
                    ? "bg-gold text-ink shadow-sm"
                    : "border border-border bg-background text-muted-foreground hover:text-foreground"
                )}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List / Table */}
        <div className="mt-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <RefreshCw className="h-8 w-8 animate-spin text-gold" />
              <p className="mt-3 text-sm text-muted-foreground">Loading bookings from database...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-12 text-center shadow-sm">
              <p className="text-base font-medium text-foreground">No bookings found</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {search ? "No bookings match your search query." : "No enquiries submitted yet."}
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filtered.map((item) => {
                const isAc = item.room_type.toUpperCase() === "AC";
                const dateStr = new Date(item.created_at).toLocaleString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                });

                const cleanPhone = item.contact_number.replace(/\D/g, "");
                const waMessage = `Hello ${item.guest_name}, this is Veerapandiyaar Guest House reception, Periyapalayam. Regarding your booking enquiry for ${item.number_of_rooms} ${isAc ? "AC" : "Non-AC"} room(s) for ${item.total_guests} guests — how can we assist you?`;
                const waUrl = `https://wa.me/91${cleanPhone.replace(/^91/, "")}?text=${encodeURIComponent(waMessage)}`;

                return (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm transition-all hover:border-gold/50 hover:shadow-md md:flex-row md:items-center md:justify-between"
                  >
                    {/* Left details */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-serif text-lg sm:text-xl font-bold text-foreground">
                          {item.guest_name}
                        </span>

                        <span
                          className={cn(
                            "rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider",
                            isAc
                              ? "bg-gold/20 text-gold border border-gold/40"
                              : "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30"
                          )}
                        >
                          {isAc ? "Deluxe AC" : "Standard Non-AC"}
                        </span>

                        <span
                          className={cn(
                            "rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider",
                            item.status.toUpperCase() === "CONFIRMED"
                              ? "bg-emerald-500/15 text-emerald-600 border border-emerald-500/30"
                              : item.status.toUpperCase() === "CANCELLED"
                              ? "bg-destructive/15 text-destructive border border-destructive/30"
                              : "bg-amber-500/15 text-amber-600 border border-amber-500/30"
                          )}
                        >
                          {item.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1 text-foreground font-medium">
                          <Phone className="h-3.5 w-3.5 text-gold" />
                          <span>{item.contact_number}</span>
                        </span>

                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{item.address}</span>
                        </span>

                        <span className="inline-flex items-center gap-1">
                          <BedDouble className="h-3.5 w-3.5 text-gold" />
                          <span>{item.number_of_rooms} Room(s)</span>
                        </span>

                        <span className="inline-flex items-center gap-1">
                          <Users className="h-3.5 w-3.5 text-gold" />
                          <span>{item.total_guests} Guests</span>
                        </span>

                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{dateStr}</span>
                        </span>
                      </div>

                      {item.additional_requirements && (
                        <div className="rounded-lg bg-secondary/50 p-2.5 text-xs text-foreground/90 border border-border/60">
                          <strong className="text-gold">Details / Notes: </strong>
                          {item.additional_requirements}
                        </div>
                      )}
                    </div>

                    {/* Right Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0 border-t border-border/60 md:border-t-0">
                      <a
                        href={`tel:${item.contact_number}`}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all active:scale-95"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        <span>Call</span>
                      </a>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-3.5 py-2 text-xs font-bold text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all active:scale-95"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>WhatsApp</span>
                      </a>

                      {/* Status Dropdown */}
                      <select
                        value={item.status.toUpperCase()}
                        disabled={updatingId === item.id}
                        onChange={(e) => updateStatus(item.id, e.target.value)}
                        className="rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold outline-none focus:border-gold"
                      >
                        <option value="NEW">Pending / New</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
