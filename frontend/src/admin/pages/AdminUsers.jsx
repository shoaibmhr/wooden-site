import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { fetchUsers, updateUserStatus } from "../../services/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load users");
        setIsLoading(false);
      });
  }, []);

  const handleStatusChange = async (user) => {
    try {
      setUpdatingId(user.id);

      const updatedUser = await updateUserStatus(user.id, !user.is_active);

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

  const formatDate = (value) => new Date(value).toLocaleDateString("en-PK");

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-800 pb-4">
        <h1 className="text-xl font-bold uppercase tracking-wider text-stone-100 sm:text-2xl">
          Users
        </h1>
        <p className="mt-1 text-xs text-stone-400">
          View registered customers and control their account status.
        </p>
      </div>

      {isLoading ? (
        <div className="rounded-xl border border-stone-800 bg-[#262220] p-6 text-sm text-stone-400">
          Loading users...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-rose-900/50 bg-rose-950/40 p-4 text-sm text-rose-300">
          {error}
        </div>
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-stone-800 bg-[#262220] py-14">
          <Users className="mb-3 h-10 w-10 text-stone-600" />
          <p className="text-sm font-medium text-stone-300">No users found</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-stone-800 bg-[#262220]">
          <table className="w-full min-w-[750px] text-left text-xs text-stone-300">
            <thead className="border-b border-stone-800 bg-stone-900/50 uppercase text-[10px] tracking-wider text-stone-400">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-800">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="transition-colors hover:bg-stone-800/40"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-stone-100">
                      {user.full_name}
                    </p>
                    <p className="mt-0.5 text-[11px] text-stone-500">
                      {user.email}
                    </p>
                  </td>

                  <td className="px-4 py-3">
                    <span className="rounded-full bg-amber-950/50 px-2.5 py-1 text-[10px] font-semibold uppercase text-amber-400">
                      {user.role}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-stone-400">
                    {formatDate(user.created_at)}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${
                        user.is_active
                          ? "bg-emerald-950/50 text-emerald-400"
                          : "bg-rose-950/50 text-rose-400"
                      }`}
                    >
                      {user.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right">
                    {user.role === "customer" ? (
                      <button
                        onClick={() => handleStatusChange(user)}
                        disabled={updatingId === user.id}
                        className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-colors disabled:opacity-50 ${
                          user.is_active
                            ? "bg-rose-950/50 text-rose-400 hover:bg-rose-950"
                            : "bg-emerald-950/50 text-emerald-400 hover:bg-emerald-950"
                        }`}
                      >
                        {updatingId === user.id
                          ? "Updating..."
                          : user.is_active
                            ? "Deactivate"
                            : "Activate"}
                      </button>
                    ) : (
                      <span className="text-[11px] text-stone-600">
                        Protected
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
