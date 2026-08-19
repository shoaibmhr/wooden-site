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
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "read":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "resolved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "archived":
      default:
        return "bg-stone-100 text-stone-600 border-stone-200";
    }
  };

  return (
    <div className="space-y-6 min-w-0">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-stone-200 pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl">
            Contact Inquiries
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-500">
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
                ? "bg-amber-900 text-white shadow-xs"
                : "bg-white text-stone-600 hover:bg-[#faf6ee] hover:text-stone-900 border border-stone-200 shadow-xs"
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
                  ? "bg-amber-900 text-white shadow-xs"
                  : "bg-white text-stone-600 hover:bg-[#faf6ee] hover:text-stone-900 border border-stone-200 shadow-xs"
              }`}
            >
              {status} ({inquiries.filter((i) => i.status === status).length})
            </button>
          ))}
        </div>

        {/* Search Input Bar */}
        <div className="relative bg-white p-3 rounded-2xl border border-stone-200/90 shadow-xs">
          <Search className="absolute left-6 top-5 h-4 w-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search messages by sender name, email, phone, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-stone-300 bg-stone-50/60 py-2.5 pl-11 pr-4 text-xs text-stone-900 placeholder-stone-400 outline-none focus:bg-white focus:border-amber-800 focus:ring-2 focus:ring-amber-800/10 transition-all"
          />
        </div>
      </div>

      {/* Main Inquiries Table */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-stone-200 bg-white shadow-xs">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-800 border-t-transparent" />
          <p className="mt-3 text-xs text-stone-500">Loading messages...</p>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700 text-center">
          {error}
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-dashed border-stone-300 bg-white text-center shadow-xs">
          <MessageSquareText className="h-12 w-12 text-stone-300 mb-3" />
          <h3 className="text-sm font-bold text-stone-800">No inquiries found</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm">
            {inquiries.length === 0
              ? "Messages sent through the website contact form will appear here."
              : "No messages matched your search or status filter."}
          </p>
        </div>
      ) : (
        <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-xs text-stone-700">
              <thead className="border-b border-stone-200 bg-stone-50/80 uppercase text-[11px] font-semibold tracking-wider text-stone-500">
                <tr>
                  <th className="px-4 py-3.5">Sender</th>
                  <th className="px-4 py-3.5">Message Snippet</th>
                  <th className="px-4 py-3.5">Received Date</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-100">
                {filteredInquiries.map((inquiry) => (
                  <tr
                    key={inquiry.id}
                    className="hover:bg-[#faf7f2] transition-colors group"
                  >
                    {/* Sender */}
                    <td className="px-4 py-3.5">
                      <div className="min-w-0 max-w-[180px]">
                        <p className="font-bold text-stone-900 group-hover:text-amber-900 transition-colors truncate">
                          {inquiry.name}
                        </p>
                        <p className="text-[11px] text-stone-500 truncate">
                          {inquiry.email}
                        </p>
                        {inquiry.phone && (
                          <p className="text-[10px] text-stone-400 truncate">
                            {inquiry.phone}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Message */}
                    <td className="max-w-md px-4 py-3.5">
                      <p className="line-clamp-2 text-stone-600 leading-relaxed break-words">
                        {inquiry.message}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3.5 text-[11px] text-stone-500 whitespace-nowrap">
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
                        className={`rounded-lg border px-2.5 py-1 text-xs font-semibold capitalize outline-none transition-colors disabled:opacity-50 ${getStatusBadgeClass(
                          inquiry.status,
                        )} bg-white`}
                      >
                        {INQUIRY_STATUSES.map((status) => (
                          <option key={status} value={status} className="bg-white text-stone-800">
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Action View */}
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={() => setSelectedInquiry(inquiry)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-stone-100 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:bg-amber-900 hover:text-white transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/50 p-4 backdrop-blur-xs">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-stone-200 bg-white p-6 shadow-2xl text-stone-800">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800">
                  Customer Message
                </span>
                <h2 className="text-base font-bold text-stone-900">
                  {selectedInquiry.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="rounded-xl p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Sender Details Box */}
            <div className="mt-4 rounded-2xl border border-amber-900/10 bg-[#faf6ee] p-4 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Email:</span>
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="font-semibold text-amber-900 hover:underline flex items-center gap-1"
                >
                  <Mail className="h-3 w-3" />
                  {selectedInquiry.email}
                </a>
              </div>
              {selectedInquiry.phone && (
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Phone:</span>
                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    className="font-semibold text-stone-800 hover:text-amber-900 flex items-center gap-1"
                  >
                    <Phone className="h-3 w-3" />
                    {selectedInquiry.phone}
                  </a>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Received Date:</span>
                <span className="text-stone-800 font-mono">
                  {formatDate(selectedInquiry.created_at)}
                </span>
              </div>
            </div>

            {/* Full Message Body */}
            <div className="mt-5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-amber-900">
                Message Content
              </label>
              <div className="mt-2 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-xs text-stone-800 leading-relaxed whitespace-pre-wrap">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Quick Status Change */}
            <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500">Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) =>
                    handleStatusChange(selectedInquiry.id, e.target.value)
                  }
                  className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold capitalize text-stone-800 outline-none focus:border-amber-800"
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
                className="flex items-center gap-1.5 rounded-xl bg-amber-900 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-amber-950 transition-colors shadow-xs"
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


