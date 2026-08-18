import { useEffect, useState } from "react";
import { MessageSquareText } from "lucide-react";
import {
  fetchContactInquiries,
  updateContactInquiryStatus,
} from "../../services/api";

const INQUIRY_STATUSES = ["new", "read", "resolved", "archived"];

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

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
    } catch (err) {
      alert(err.message || "Failed to update message status");
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (value) => new Date(value).toLocaleString("en-PK");

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-800 pb-4">
        <h1 className="text-xl font-bold uppercase tracking-wider text-stone-100 sm:text-2xl">
          Contact Messages
        </h1>
        <p className="mt-1 text-xs text-stone-400">
          Review customer inquiries and track their resolution status.
        </p>
      </div>

      {isLoading ? (
        <div className="rounded-xl border border-stone-800 bg-[#262220] p-6 text-sm text-stone-400">
          Loading messages...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-rose-900/50 bg-rose-950/40 p-4 text-sm text-rose-300">
          {error}
        </div>
      ) : inquiries.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-stone-800 bg-[#262220] py-14">
          <MessageSquareText className="mb-3 h-10 w-10 text-stone-600" />
          <p className="text-sm font-medium text-stone-300">
            No messages found
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-stone-800 bg-[#262220]">
          <table className="w-full min-w-[900px] text-left text-xs text-stone-300">
            <thead className="border-b border-stone-800 bg-stone-900/50 uppercase text-[10px] tracking-wider text-stone-400">
              <tr>
                <th className="px-4 py-3">Sender</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Received</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-800">
              {inquiries.map((inquiry) => (
                <tr
                  key={inquiry.id}
                  className="transition-colors hover:bg-stone-800/40"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-stone-100">{inquiry.name}</p>
                    <p className="mt-0.5 text-[11px] text-stone-500">
                      {inquiry.email}
                    </p>
                    {inquiry.phone && (
                      <p className="mt-0.5 text-[11px] text-stone-500">
                        {inquiry.phone}
                      </p>
                    )}
                  </td>

                  <td className="max-w-md px-4 py-3 text-stone-400">
                    {inquiry.message}
                  </td>

                  <td className="px-4 py-3 text-stone-400">
                    {formatDate(inquiry.created_at)}
                  </td>

                  <td className="px-4 py-3">
                    <select
                      value={inquiry.status}
                      disabled={updatingId === inquiry.id}
                      onChange={(event) =>
                        handleStatusChange(inquiry.id, event.target.value)
                      }
                      className="rounded-lg border border-stone-700 bg-stone-900 px-2 py-1.5 text-xs capitalize text-stone-200 outline-none focus:border-amber-500 disabled:opacity-50"
                    >
                      {INQUIRY_STATUSES.map((inquiryStatus) => (
                        <option key={inquiryStatus} value={inquiryStatus}>
                          {inquiryStatus}
                        </option>
                      ))}
                    </select>
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
