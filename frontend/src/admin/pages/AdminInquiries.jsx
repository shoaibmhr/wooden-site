import { useEffect, useState, useMemo } from "react";
import {
  MessageSquareText,
  Mail,
  Phone,
  Calendar,
  Search,
  Eye,
  X,
  User,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import {
  fetchContactInquiries,
  updateContactInquiryStatus,
} from "../../services/api";

const INQUIRY_STATUSES = ["new", "read", "resolved", "archived"];

function formatDate(value) {
  return new Date(value).toLocaleString("en-PK", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  useEffect(() => {
    fetchContactInquiries()
      .then((data) => {
        setInquiries(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load messages");
        setIsLoading(false);
      });
  }, []);

  const handleStatusChange = async (inquiryId, status) => {
    try {
      setUpdatingId(inquiryId);

      const updatedInquiry = await updateContactInquiryStatus(
        inquiryId,
        status,
      );

      setInquiries((currentInquiries) =>
        currentInquiries.map((inquiry) =>
          inquiry.id === updatedInquiry.id ? updatedInquiry : inquiry,
        ),
      );

      if (selectedInquiry && selectedInquiry.id === inquiryId) {
        setSelectedInquiry(updatedInquiry);
      }
    } catch (err) {
      alert(err.message || "Failed to update message status");
    } finally {
      setUpdatingId(null);
    }
  };

  // Filtered Inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(q);
        const matchEmail = item.email.toLowerCase().includes(q);
        const matchPhone = (item.phone || "").toLowerCase().includes(q);
        const matchMsg = item.message.toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchPhone && !matchMsg) return false;
      }

      // 2. Status Filter
      if (statusFilter !== "all" && item.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [inquiries, searchQuery, statusFilter]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "new":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "read":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "resolved":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "archived":
      default:
        return "bg-stone-800 text-stone-400 border-stone-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-stone-800/80 pb-5">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-stone-100 sm:text-2xl">
            Contact Inquiries
          </h1>
          <p className="mt-1 text-xs text-stone-400">
            Messages and custom woodwork inquiries sent by customers through the website.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-3">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setStatusFilter("all")}
            className={`rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
              statusFilter === "all"
                ? "bg-[#5c1f1f] text-white shadow-md border border-amber-500/30"
                : "bg-[#1e1a18] text-stone-400 hover:bg-[#282321] hover:text-stone-200 border border-stone-800"
            }`}
          >
            All Messages ({inquiries.length})
          </button>

          {INQUIRY_STATUSES.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                statusFilter === status
                  ? "bg-[#5c1f1f] text-white shadow-md border border-amber-500/30"
                  : "bg-[#1e1a18] text-stone-400 hover:bg-[#282321] hover:text-stone-200 border border-stone-800"
              }`}
            >
              {status} ({inquiries.filter((i) => i.status === status).length})
            </button>
          ))}
        </div>

        {/* Search Input Bar */}
        <div className="relative bg-[#1e1a18] p-3 rounded-2xl border border-stone-800/80 shadow-md">
          <Search className="absolute left-6 top-5 h-4 w-4 text-stone-500" />
          <input
            type="text"
            placeholder="Search messages by sender name, email, phone, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-stone-700/80 bg-stone-900/90 py-2.5 pl-11 pr-4 text-xs text-stone-100 placeholder-stone-500 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
          />
        </div>
      </div>

      {/* Main Inquiries Table */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-stone-800 bg-[#1e1a18]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
          <p className="mt-3 text-xs text-stone-400">Loading messages...</p>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-rose-900/60 bg-rose-950/40 p-4 text-xs text-rose-300 text-center">
          {error}
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-dashed border-stone-800 bg-[#1e1a18] text-center">
          <MessageSquareText className="h-12 w-12 text-stone-600 mb-3" />
          <h3 className="text-sm font-bold text-stone-200">No inquiries found</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm">
            {inquiries.length === 0
              ? "Messages sent through the website contact form will appear here."
              : "No messages matched your search or status filter."}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-stone-800/90 bg-[#1e1a18] shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-xs text-stone-300">
              <thead className="border-b border-stone-800 bg-stone-900/70 uppercase text-[10px] tracking-wider text-stone-400">
                <tr>
                  <th className="px-4 py-3.5">Sender</th>
                  <th className="px-4 py-3.5">Message Snippet</th>
                  <th className="px-4 py-3.5">Received Date</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-800/80">
                {filteredInquiries.map((inquiry) => (
                  <tr
                    key={inquiry.id}
                    className="hover:bg-[#26211f] transition-colors group"
                  >
                    {/* Sender */}
                    <td className="px-4 py-3.5">
                      <p className="font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                        {inquiry.name}
                      </p>
                      <p className="text-[11px] text-stone-400">
                        {inquiry.email}
                      </p>
                      {inquiry.phone && (
                        <p className="text-[10px] text-stone-500">
                          {inquiry.phone}
                        </p>
                      )}
                    </td>

                    {/* Message */}
                    <td className="max-w-md px-4 py-3.5">
                      <p className="line-clamp-2 text-stone-300 leading-relaxed">
                        {inquiry.message}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3.5 text-[11px] text-stone-400 whitespace-nowrap">
                      {formatDate(inquiry.created_at)}
                    </td>

                    {/* Status Dropdown */}
                    <td className="px-4 py-3.5">
                      <select
                        value={inquiry.status}
                        disabled={updatingId === inquiry.id}
                        onChange={(event) =>
                          handleStatusChange(inquiry.id, event.target.value)
                        }
                        className={`rounded-lg border px-2.5 py-1.5 text-xs font-bold capitalize outline-none transition-colors disabled:opacity-50 ${getStatusBadgeClass(
                          inquiry.status,
                        )} bg-stone-900/90`}
                      >
                        {INQUIRY_STATUSES.map((status) => (
                          <option key={status} value={status} className="bg-stone-900 text-stone-200">
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Action View */}
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={() => setSelectedInquiry(inquiry)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-stone-800 px-3 py-1.5 text-xs font-semibold text-stone-200 hover:bg-[#5c1f1f] hover:text-white transition-colors"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Read</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================
          INQUIRY FULL MESSAGE MODAL
      ========================================================== */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-stone-800/90 bg-[#1e1a18] p-6 shadow-2xl text-stone-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-stone-800/80 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500">
                  Customer Message
                </span>
                <h2 className="text-base font-bold text-stone-100">
                  {selectedInquiry.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="rounded-xl p-1.5 text-stone-400 hover:bg-stone-800 hover:text-stone-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Sender Details Box */}
            <div className="mt-4 rounded-2xl border border-stone-800 bg-stone-900/60 p-4 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-stone-400">Email:</span>
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="font-semibold text-amber-400 hover:underline flex items-center gap-1"
                >
                  <Mail className="h-3 w-3" />
                  {selectedInquiry.email}
                </a>
              </div>
              {selectedInquiry.phone && (
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Phone:</span>
                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    className="font-semibold text-stone-200 hover:text-amber-400 flex items-center gap-1"
                  >
                    <Phone className="h-3 w-3" />
                    {selectedInquiry.phone}
                  </a>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-stone-400">Received Date:</span>
                <span className="text-stone-300 font-mono">
                  {formatDate(selectedInquiry.created_at)}
                </span>
              </div>
            </div>

            {/* Full Message Body */}
            <div className="mt-5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-amber-500">
                Message Content
              </label>
              <div className="mt-2 rounded-2xl border border-stone-800 bg-stone-950/70 p-4 text-xs text-stone-200 leading-relaxed whitespace-pre-wrap">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Quick Status Change */}
            <div className="mt-5 flex items-center justify-between border-t border-stone-800/80 pt-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400">Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) =>
                    handleStatusChange(selectedInquiry.id, e.target.value)
                  }
                  className="rounded-lg border border-stone-700 bg-stone-900 px-3 py-1.5 text-xs font-bold capitalize text-stone-200 outline-none focus:border-amber-500"
                >
                  {INQUIRY_STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <a
                href={`mailto:${selectedInquiry.email}?subject=Re: Ashtech Wooden Inquiry`}
                className="flex items-center gap-1.5 rounded-xl bg-[#5c1f1f] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#732929] transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Reply via Email</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

