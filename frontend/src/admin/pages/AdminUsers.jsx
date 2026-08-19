import { useEffect, useState, useMemo } from "react";
import { Users, Shield, UserCheck, UserX, Search, Mail, Phone, Calendar } from "lucide-react";
import { fetchAdminUsers, updateUserStatus } from "../../services/api";

function formatDate(value) {
  return new Date(value).toLocaleString("en-PK", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all, active, inactive, admin

  useEffect(() => {
    fetchAdminUsers()
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load users");
        setIsLoading(false);
      });
  }, []);

  const handleToggleStatus = async (user) => {
    const nextStatus = !user.is_active;
    const actionText = nextStatus ? "activate" : "deactivate";

    if (
      !window.confirm(
        `Are you sure you want to ${actionText} user "${user.full_name || user.email}"?`,
      )
    ) {
      return;
    }

    try {
      setUpdatingId(user.id);
      const updatedUser = await updateUserStatus(user.id, nextStatus);

      setUsers((currentUsers) =>
        currentUsers.map((item) =>
          item.id === updatedUser.id ? updatedUser : item,
        ),
      );
    } catch (err) {
      alert(err.message || "Failed to update user status");
    } finally {
      setUpdatingId(null);
    }
  };

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = (user.full_name || "").toLowerCase().includes(q);
        const matchEmail = (user.email || "").toLowerCase().includes(q);
        const matchPhone = (user.phone || "").toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchPhone) return false;
      }

      // 2. Status Filter
      if (statusFilter === "active" && !user.is_active) return false;
      if (statusFilter === "inactive" && user.is_active) return false;
      if (statusFilter === "admin" && !user.is_superuser && user.role !== "admin") {
        return false;
      }

      return true;
    });
  }, [users, searchQuery, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-stone-800/80 pb-5">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-stone-100 sm:text-2xl">
            User Accounts
          </h1>
          <p className="mt-1 text-xs text-stone-400">
            Registered customer accounts, administrators, and profile permissions.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-3">
        {/* Status Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setStatusFilter("all")}
            className={`rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
              statusFilter === "all"
                ? "bg-[#5c1f1f] text-white shadow-md border border-amber-500/30"
                : "bg-[#1e1a18] text-stone-400 hover:bg-[#282321] hover:text-stone-200 border border-stone-800"
            }`}
          >
            All Accounts ({users.length})
          </button>

          <button
            onClick={() => setStatusFilter("active")}
            className={`rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
              statusFilter === "active"
                ? "bg-[#5c1f1f] text-white shadow-md border border-amber-500/30"
                : "bg-[#1e1a18] text-stone-400 hover:bg-[#282321] hover:text-stone-200 border border-stone-800"
            }`}
          >
            Active ({users.filter((u) => u.is_active).length})
          </button>

          <button
            onClick={() => setStatusFilter("inactive")}
            className={`rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
              statusFilter === "inactive"
                ? "bg-[#5c1f1f] text-white shadow-md border border-amber-500/30"
                : "bg-[#1e1a18] text-stone-400 hover:bg-[#282321] hover:text-stone-200 border border-stone-800"
            }`}
          >
            Inactive ({users.filter((u) => !u.is_active).length})
          </button>

          <button
            onClick={() => setStatusFilter("admin")}
            className={`rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
              statusFilter === "admin"
                ? "bg-[#5c1f1f] text-white shadow-md border border-amber-500/30"
                : "bg-[#1e1a18] text-stone-400 hover:bg-[#282321] hover:text-stone-200 border border-stone-800"
            }`}
          >
            Admins ({users.filter((u) => u.is_superuser || u.role === "admin").length})
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="relative bg-[#1e1a18] p-3 rounded-2xl border border-stone-800/80 shadow-md">
          <Search className="absolute left-6 top-5 h-4 w-4 text-stone-500" />
          <input
            type="text"
            placeholder="Search by full name, email address, or phone number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-stone-700/80 bg-stone-900/90 py-2.5 pl-11 pr-4 text-xs text-stone-100 placeholder-stone-500 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
          />
        </div>
      </div>

      {/* Main Users Table */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-stone-800 bg-[#1e1a18]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
          <p className="mt-3 text-xs text-stone-400">Loading user accounts...</p>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-rose-900/60 bg-rose-950/40 p-4 text-xs text-rose-300 text-center">
          {error}
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-dashed border-stone-800 bg-[#1e1a18] text-center">
          <Users className="h-12 w-12 text-stone-600 mb-3" />
          <h3 className="text-sm font-bold text-stone-200">No users found</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm">
            {users.length === 0
              ? "Registered user accounts will be listed here."
              : "No user accounts matched your search or filters."}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-stone-800/90 bg-[#1e1a18] shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-xs text-stone-300">
              <thead className="border-b border-stone-800 bg-stone-900/70 uppercase text-[10px] tracking-wider text-stone-400">
                <tr>
                  <th className="px-4 py-3.5">User</th>
                  <th className="px-4 py-3.5">Role</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Joined Date</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-800/80">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-[#26211f] transition-colors group"
                  >
                    {/* User Info */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#5c1f1f] to-[#3a1313] text-amber-300 font-bold border border-amber-500/20">
                          {(user.full_name || user.email || "U")
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                            {user.full_name || "Unnamed User"}
                          </p>
                          <p className="text-[11px] text-stone-400">
                            {user.email}
                          </p>
                          {user.phone && (
                            <p className="text-[10px] text-stone-500">
                              {user.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-4 py-3.5">
                      {user.is_superuser || user.role === "admin" ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                          <Shield className="h-3 w-3" /> Admin
                        </span>
                      ) : (
                        <span className="rounded-md bg-stone-800 px-2.5 py-1 text-[10px] font-medium text-stone-400">
                          Customer
                        </span>
                      )}
                    </td>

                    {/* Active Status Badge */}
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                          user.is_active
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        }`}
                      >
                        {user.is_active ? "Active" : "Suspended"}
                      </span>
                    </td>

                    {/* Joined Date */}
                    <td className="px-4 py-3.5 text-[11px] text-stone-400">
                      {formatDate(user.created_at)}
                    </td>

                    {/* Actions Toggle */}
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={() => handleToggleStatus(user)}
                        disabled={updatingId === user.id}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all disabled:opacity-50 ${
                          user.is_active
                            ? "bg-rose-950/40 text-rose-300 border border-rose-900/40 hover:bg-rose-900/60"
                            : "bg-emerald-950/40 text-emerald-300 border border-emerald-900/40 hover:bg-emerald-900/60"
                        }`}
                      >
                        {user.is_active ? (
                          <>
                            <UserX className="h-3.5 w-3.5" />
                            <span>Deactivate</span>
                          </>
                        ) : (
                          <>
                            <UserCheck className="h-3.5 w-3.5" />
                            <span>Activate</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
