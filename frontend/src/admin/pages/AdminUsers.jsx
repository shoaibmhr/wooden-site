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
    <div className="space-y-6 min-w-0">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-stone-200 pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl">
            User Accounts
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-500">
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
                ? "bg-amber-900 text-white shadow-xs"
                : "bg-white text-stone-600 hover:bg-[#faf6ee] hover:text-stone-900 border border-stone-200 shadow-xs"
            }`}
          >
            All Accounts ({users.length})
          </button>

          <button
            onClick={() => setStatusFilter("active")}
            className={`rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
              statusFilter === "active"
                ? "bg-amber-900 text-white shadow-xs"
                : "bg-white text-stone-600 hover:bg-[#faf6ee] hover:text-stone-900 border border-stone-200 shadow-xs"
            }`}
          >
            Active ({users.filter((u) => u.is_active).length})
          </button>

          <button
            onClick={() => setStatusFilter("inactive")}
            className={`rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
              statusFilter === "inactive"
                ? "bg-amber-900 text-white shadow-xs"
                : "bg-white text-stone-600 hover:bg-[#faf6ee] hover:text-stone-900 border border-stone-200 shadow-xs"
            }`}
          >
            Inactive ({users.filter((u) => !u.is_active).length})
          </button>

          <button
            onClick={() => setStatusFilter("admin")}
            className={`rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
              statusFilter === "admin"
                ? "bg-amber-900 text-white shadow-xs"
                : "bg-white text-stone-600 hover:bg-[#faf6ee] hover:text-stone-900 border border-stone-200 shadow-xs"
            }`}
          >
            Admins ({users.filter((u) => u.is_superuser || u.role === "admin").length})
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="relative bg-white p-3 rounded-2xl border border-stone-200/90 shadow-xs">
          <Search className="absolute left-6 top-5 h-4 w-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search by full name, email address, or phone number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-stone-300 bg-stone-50/60 py-2.5 pl-11 pr-4 text-xs text-stone-900 placeholder-stone-400 outline-none focus:bg-white focus:border-amber-800 focus:ring-2 focus:ring-amber-800/10 transition-all"
          />
        </div>
      </div>

      {/* Main Users Table */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-stone-200 bg-white shadow-xs">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-800 border-t-transparent" />
          <p className="mt-3 text-xs text-stone-500">Loading user accounts...</p>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700 text-center">
          {error}
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-dashed border-stone-300 bg-white text-center shadow-xs">
          <Users className="h-12 w-12 text-stone-300 mb-3" />
          <h3 className="text-sm font-bold text-stone-800">No users found</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm">
            {users.length === 0
              ? "Registered user accounts will be listed here."
              : "No user accounts matched your search or filters."}
          </p>
        </div>
      ) : (
        <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-xs text-stone-700">
              <thead className="border-b border-stone-200 bg-stone-50/80 uppercase text-[11px] font-semibold tracking-wider text-stone-500">
                <tr>
                  <th className="px-4 py-3.5">User</th>
                  <th className="px-4 py-3.5">Role</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Joined Date</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-100">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-[#faf7f2] transition-colors group"
                  >
                    {/* User Info */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-900 to-amber-950 text-amber-300 font-bold border border-amber-800/30 shrink-0">
                          {(user.full_name || user.email || "U")
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                        <div className="min-w-0 max-w-[180px]">
                          <p className="font-bold text-stone-900 group-hover:text-amber-900 transition-colors truncate">
                            {user.full_name || "Unnamed User"}
                          </p>
                          <p className="text-[11px] text-stone-500 truncate">
                            {user.email}
                          </p>
                          {user.phone && (
                            <p className="text-[10px] text-stone-400 truncate">
                              {user.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-4 py-3.5">
                      {user.is_superuser || user.role === "admin" ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 border border-amber-200/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-900">
                          <Shield className="h-3 w-3 text-amber-800" /> Admin
                        </span>
                      ) : (
                        <span className="inline-block rounded-md bg-stone-100 px-2.5 py-1 text-[10px] font-medium text-stone-600">
                          Customer
                        </span>
                      )}
                    </td>

                    {/* Active Status Badge */}
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                          user.is_active
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {user.is_active ? "Active" : "Suspended"}
                      </span>
                    </td>

                    {/* Joined Date */}
                    <td className="px-4 py-3.5 text-[11px] text-stone-500 whitespace-nowrap">
                      {formatDate(user.created_at)}
                    </td>

                    {/* Actions Toggle */}
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={() => handleToggleStatus(user)}
                        disabled={updatingId === user.id}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all disabled:opacity-50 ${
                          user.is_active
                            ? "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
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
