import React, { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Plus, Search, MapPin, Calendar, Clock } from "lucide-react";

// Single-file React dashboard component. Tailwind CSS is used for styling.
// NPM packages required: react, react-dom, recharts, lucide-react, tailwindcss

export default function Dashboard() {
  // --- Mock data and persistence ---
  const initialQuotes = () => {
    try {
      const raw = localStorage.getItem("quotes_v1");
      return raw ? JSON.parse(raw) : sampleQuotes();
    } catch (e) {
      return sampleQuotes();
    }
  };

  const initialMeetings = () => {
    try {
      const raw = localStorage.getItem("meetings_v1");
      return raw ? JSON.parse(raw) : sampleMeetings();
    } catch (e) {
      return sampleMeetings();
    }
  };

  const [quotes, setQuotes] = useState(initialQuotes);
  const [meetings, setMeetings] = useState(initialMeetings);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateQuote, setShowCreateQuote] = useState(false);
  const [newQuote, setNewQuote] = useState({ title: "", amount: 0, client: "" });
  const [selectedDate, setSelectedDate] = useState(null);
  const [filterRange, setFilterRange] = useState("7m"); // 7 months

  useEffect(() => {
    localStorage.setItem("quotes_v1", JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem("meetings_v1", JSON.stringify(meetings));
  }, [meetings]);

  // --- Derived stats ---
  const totalProjectDeal = useMemo(() => {
    // sum of project deals (mock from quotes)
    return quotes.reduce((s, q) => s + Number(q.amount || 0), 0);
  }, [quotes]);

  const totalClients = useMemo(() => {
    const clients = new Set(quotes.map((q) => q.client));
    return clients.size;
  }, [quotes]);

  const totalQuotes = quotes.length;

  // ---- Charts data ----
  const projectDealsByMonth = useMemo(() => {
    // generate monthly sums for last 7 months
    const months = generateRecentMonths(7);
    const byMonth = months.map((m) => ({ month: m.label, value: 0 }));

    quotes.forEach((q) => {
      const d = new Date(q.date || Date.now());
      const label = `${d.toLocaleString(undefined, { month: "short" })} ${d.getFullYear()}`;
      const idx = byMonth.findIndex((b) => b.month === label);
      if (idx >= 0) byMonth[idx].value += Number(q.amount || 0);
    });

    return byMonth;
  }, [quotes]);

  // Meeting schedule: group by day-of-month
  const meetingsByDate = useMemo(() => {
    const map = {};
    meetings.forEach((m) => {
      const d = new Date(m.datetime).toDateString();
      if (!map[d]) map[d] = [];
      map[d].push(m);
    });
    return map;
  }, [meetings]);

  // search filtered quotes
  const filteredQuotes = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return quotes;
    return quotes.filter((item) => {
      return (
        (item.title || "").toLowerCase().includes(q) ||
        (item.client || "").toLowerCase().includes(q)
      );
    });
  }, [searchTerm, quotes]);

  // --- Actions ---
  function createQuote() {
    const id = Date.now();
    setQuotes((s) => [
      ...s,
      { id, ...newQuote, amount: Number(newQuote.amount), date: new Date().toISOString() },
    ]);
    setNewQuote({ title: "", amount: 0, client: "" });
    setShowCreateQuote(false);
  }

  function createMeeting(m) {
    setMeetings((s) => [...s, { id: Date.now(), ...m }]);
  }

  function removeQuote(id) {
    setQuotes((s) => s.filter((q) => q.id !== id));
  }

  // --- Simple small components for clarity ---
  const StatCard = ({ title, value, subtitle }) => (
    <div className="bg-white rounded-2xl p-4 shadow-sm border">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Top header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold">Search something...</div>
            <div className="relative">
              <input
                className="pl-10 pr-4 py-2 rounded-lg border w-80 bg-white"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            </div>
          </div>

          <div className="flex gap-4">
            <StatCard title="Total Project Deal" value={`$${formatNumber(totalProjectDeal)}`} />
            <StatCard title="Total Clients" value={totalClients} />
            <StatCard title="Total Quotes" value={totalQuotes} />
          </div>
        </div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Left column (big) */}
          <div className="col-span-8 space-y-4">
            {/* Integrations / Gauge */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Integrations Tools</div>
                <div className="flex items-center gap-6 mt-3">
                  <div className="w-56">
                    <div className="text-xs text-gray-400">Avg Response Time</div>
                    <div className="text-3xl font-semibold">368 <span className="text-sm text-gray-400">ms</span></div>
                    <div className="h-3 bg-gray-100 rounded-full mt-3 overflow-hidden">
                      <div className="h-3 rounded-full" style={{ width: "60%", background: 'linear-gradient(90deg,#ff7a18,#ffb199)' }}></div>
                    </div>
                    <div className="flex gap-2 mt-3 text-xs text-gray-500">
                      <div className="inline-flex items-center gap-1">● Slack</div>
                      <div className="inline-flex items-center gap-1">● API</div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="text-sm text-gray-500">Project Deals</div>
                    <div className="h-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={projectDealsByMonth}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-48 text-right">
                <div className="text-sm text-gray-500">Manage Quotes</div>
                <div className="mt-3 bg-orange-500 text-white inline-flex items-center gap-2 px-4 py-2 rounded-2xl cursor-pointer justify-center"
                  onClick={() => setShowCreateQuote(true)}>
                  <Plus size={14} /> Create New
                </div>
                <div className="mt-4 text-3xl font-bold">{quotes.length}</div>
                <div className="text-xs text-gray-400">average in month</div>
              </div>
            </div>

            {/* Meeting schedule / heatmap-ish */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500">Meeting Schedule</div>
                  <div className="text-lg font-semibold">This Week</div>
                </div>
                <div className="flex gap-3 items-center">
                  <Calendar size={16} />
                  <select
                    className="border rounded-lg p-2"
                    value={filterRange}
                    onChange={(e) => setFilterRange(e.target.value)}
                  >
                    <option value="7m">Last 7 months</option>
                    <option value="3m">Last 3 months</option>
                    <option value="1m">Last month</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-7 gap-2">
                {generateWeekDays().map((d) => {
                  const dateKey = d.toDateString();
                  const has = meetingsByDate[dateKey] && meetingsByDate[dateKey].length > 0;
                  return (
                    <div
                      key={dateKey}
                      className={`p-3 rounded-lg border ${has ? "bg-orange-50" : "bg-white"} cursor-pointer`}
                      onClick={() => setSelectedDate(d)}
                    >
                      <div className="text-xs text-gray-500">{d.toLocaleString(undefined, { weekday: "short" })}</div>
                      <div className="text-lg font-semibold">{d.getDate()}</div>
                      {has && <div className="text-xs text-orange-600 mt-2">{meetingsByDate[dateKey].length} meeting(s)</div>}
                    </div>
                  );
                })}
              </div>

              {selectedDate && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-500">Upcoming</div>
                      <div className="font-semibold">{selectedDate.toDateString()}</div>
                    </div>
                    <div>
                      <button
                        className="px-3 py-1 rounded-lg border"
                        onClick={() => setSelectedDate(null)}
                      >
                        Close
                      </button>
                    </div>
                  </div>

                  <div className="mt-3">
                    {(meetingsByDate[selectedDate.toDateString()] || []).map((m) => (
                      <div key={m.id} className="p-3 bg-white rounded-lg mt-2 border">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold">{m.title}</div>
                            <div className="text-xs text-gray-500">{m.client}</div>
                          </div>
                          <div className="text-sm text-gray-600">{new Date(m.datetime).toLocaleTimeString()}</div>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{m.notes}</div>
                      </div>
                    ))}
                    <div className="mt-3">
                      <AddMeetingForm onAdd={(m) => createMeeting(m)} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Meeting Notes & Quotes list */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-4 shadow-sm border">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Meeting Notes</div>
                  <div className="text-xs text-gray-400">Recent</div>
                </div>

                <div className="mt-3 space-y-2">
                  {meetings.slice(-3).reverse().map((m) => (
                    <div key={m.id} className="p-2 border rounded-lg bg-gray-50">
                      <div className="font-semibold">{m.title}</div>
                      <div className="text-xs text-gray-500">{m.client} • {new Date(m.datetime).toLocaleString()}</div>
                      <div className="text-sm text-gray-600 mt-1">{m.notes}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Quotes (filtered)</div>
                  <div className="text-xs text-gray-400">{filteredQuotes.length}</div>
                </div>

                <div className="mt-3 space-y-2 max-h-48 overflow-auto">
                  {filteredQuotes.map((q) => (
                    <div key={q.id} className="p-2 border rounded-lg bg-gray-50 flex justify-between items-center">
                      <div>
                        <div className="font-semibold">{q.title}</div>
                        <div className="text-xs text-gray-500">{q.client}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${q.amount}</div>
                        <div className="text-xs text-gray-400">{new Date(q.date).toLocaleDateString()}</div>
                        <div className="mt-1">
                          <button className="text-xs text-red-500" onClick={() => removeQuote(q.id)}>Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="col-span-4 space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm border">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">Most Clients by Country</div>
                <div className="text-xs text-gray-400">Top</div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">🇺🇸</div>
                    <div>
                      <div className="font-semibold">United States</div>
                      <div className="text-xs text-gray-500">48 clients</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">37%</div>
                </div>

                <div className="mt-4 h-36">
                  {/* miniature map placeholder */}
                  <div className="w-full h-full rounded-lg bg-gradient-to-br from-gray-100 to-white border flex items-center justify-center text-gray-400">Map</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm border">
              <div className="text-sm text-gray-500">Quick Actions</div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button className="p-3 rounded-lg border text-sm">New Quote</button>
                <button className="p-3 rounded-lg border text-sm">New Project</button>
                <button className="p-3 rounded-lg border text-sm">Import</button>
                <button className="p-3 rounded-lg border text-sm">Reports</button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm border">
              <div className="text-sm text-gray-500">Upcoming</div>
              <div className="mt-3 space-y-2">
                {meetings.slice(0,3).map(m => (
                  <div key={m.id} className="p-2 border rounded-lg bg-gray-50 flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{m.title}</div>
                      <div className="text-xs text-gray-500">{m.client}</div>
                    </div>
                    <div className="text-xs text-gray-600">{new Date(m.datetime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Create Quote Modal */}
        {showCreateQuote && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[420px] shadow-lg">
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">Create Quote</div>
                <button onClick={() => setShowCreateQuote(false)}>✕</button>
              </div>

              <div className="mt-4 space-y-3">
                <input className="w-full p-2 border rounded" placeholder="Title" value={newQuote.title}
                  onChange={(e) => setNewQuote((s) => ({ ...s, title: e.target.value }))} />
                <input className="w-full p-2 border rounded" placeholder="Client" value={newQuote.client}
                  onChange={(e) => setNewQuote((s) => ({ ...s, client: e.target.value }))} />
                <input type="number" className="w-full p-2 border rounded" placeholder="Amount" value={newQuote.amount}
                  onChange={(e) => setNewQuote((s) => ({ ...s, amount: e.target.value }))} />

                <div className="flex justify-end gap-2">
                  <button className="px-4 py-2 rounded border" onClick={() => setShowCreateQuote(false)}>Cancel</button>
                  <button className="px-4 py-2 rounded bg-orange-500 text-white" onClick={createQuote}>Create</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


// --- Subcomponents & helpers ---
function AddMeetingForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [datetime, setDatetime] = useState(new Date().toISOString().slice(0,16));
  const [notes, setNotes] = useState("");

  function submit() {
    onAdd({ title, client, datetime: new Date(datetime).toISOString(), notes });
    setTitle(""); setClient(""); setNotes("");
  }

  return (
    <div className="p-3 border rounded-lg bg-white">
      <div className="text-sm font-semibold">Add Meeting</div>
      <div className="mt-2 space-y-2">
        <input className="w-full p-2 border rounded" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Client" value={client} onChange={(e) => setClient(e.target.value)} />
        <input type="datetime-local" className="w-full p-2 border rounded" value={datetime} onChange={(e) => setDatetime(e.target.value)} />
        <textarea className="w-full p-2 border rounded" placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
        <div className="flex justify-end">
          <button className="px-3 py-1 rounded bg-orange-500 text-white" onClick={submit}>Add</button>
        </div>
      </div>
    </div>
  );
}

function generateWeekDays() {
  // return 7 days starting today
  const now = new Date();
  const arr = [];
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    arr.push(d);
  }
  return arr;
}

function generateRecentMonths(n) {
  const out = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    out.push({ label: `${d.toLocaleString(undefined, { month: "short" })} ${d.getFullYear()}` });
  }
  return out;
}

function formatNumber(n) {
  return n.toLocaleString();
}

function sampleQuotes() {
  return [
    { id: 1, title: "Website Redesign", client: "Acme Corp", amount: 12000, date: new Date().toISOString() },
    { id: 2, title: "Mobile App", client: "Beta LLC", amount: 18000, date: new Date().toISOString() },
    { id: 3, title: "API Integration", client: "Acme Corp", amount: 4800, date: new Date().toISOString() },
  ];
}

function sampleMeetings() {
  const now = new Date();
  return [
    { id: 1, title: "Brainstorming", client: "Acme Corp", datetime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 0).toISOString(), notes: "Ideas for product dev" },
    { id: 2, title: "Sprint Planning", client: "Beta LLC", datetime: new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 9, 30).toISOString(), notes: "Plan next sprint" },
    { id: 3, title: "Demo", client: "Gamma Inc", datetime: new Date(now.getFullYear(), now.getMonth(), now.getDate()+2, 14, 0).toISOString(), notes: "Show progress" },
  ];
}
