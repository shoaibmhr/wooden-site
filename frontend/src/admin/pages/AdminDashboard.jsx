export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="border-b border-stone-800 pb-4">
        <h1 className="text-xl font-bold uppercase tracking-wider text-stone-100 sm:text-2xl">
          Overview
        </h1>
        <p className="mt-1 text-xs text-stone-400">
          Manage your products, view store statistics, and manage system
          operations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-stone-800 bg-[#262220] p-5 shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-500">
            System Status
          </p>
          <p className="mt-2 text-2xl font-bold text-stone-100">Operational</p>
        </div>
      </div>
    </div>
  );
}
