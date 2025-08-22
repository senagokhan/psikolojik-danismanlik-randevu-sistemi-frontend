import React, { useState, useEffect } from 'react';
import therapistService from '../services/therapistService';
import api from '../services/api';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const HOURS = Array.from({ length: 10 }, (_, i) => {
  const hour = 9 + i;
  return `${hour.toString().padStart(2, "0")}:00`;
});

function formatDate(date) {
  // yyyy-mm-dd (UTC)
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  return d.toISOString().split('T')[0];
}

const TherapistAvailabilities = () => {
  // Form state
  const [startDate, setStartDate] = useState("");
  const [startHour, setStartHour] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endHour, setEndHour] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Calendar state
  const [availabilities, setAvailabilities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarLoading, setCalendarLoading] = useState(true);
  const [therapistId, setTherapistId] = useState(null);

  // When a day is selected in the calendar, auto-fill the dates in the form
  useEffect(() => {
    if (selectedDate) {
      const dateStr = formatDate(selectedDate);
      setStartDate(dateStr);
      setEndDate(dateStr);
    }
  }, [selectedDate]);

  // Fetch therapistId
  useEffect(() => {
    const fetchTherapistId = async () => {
      try {
        const res = await api.get('/therapists/me');
        setTherapistId(res.data.id);
      } catch (err) {
        setError('Therapist ID could not be retrieved.');
      }
    };
    fetchTherapistId();
  }, []);

  // Fetch availabilities
  useEffect(() => {
    if (!therapistId) return;
    const fetchAvailabilities = async () => {
      setCalendarLoading(true);
      try {
        const res = await api.get(`/therapists/${therapistId}/availabilities`);
        setAvailabilities(res.data.content || res.data);
      } catch (err) {
        // ignore takvim hatası
      } finally {
        setCalendarLoading(false);
      }
    };
    fetchAvailabilities();
  }, [therapistId, success]);

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    if (!startDate || !startHour || !endDate || !endHour) {
      setError("Start and end time are required.");
      return;
    }
    const startTime = `${startDate}T${startHour}`;
    const endTime = `${endDate}T${endHour}`;
    if (new Date(startTime) >= new Date(endTime)) {
      setError("Start time must be before end time.");
      return;
    }
    setLoading(true);
    try {
      if (!therapistId) throw new Error('Therapist ID could not be retrieved.');
      await api.post(`/therapists/${therapistId}/availabilities`, { startTime, endTime });
      setSuccess('Availability added successfully!');
      setStartDate(""); setStartHour(""); setEndDate(""); setEndHour("");
    } catch (err) {
      setError('Failed to add availability.');
    } finally {
      setLoading(false);
    }
  };

  // Days to mark on calendar (UTC comparison)
  const availableDates = Array.from(new Set(availabilities.map(a => a.startTime.split('T')[0])));

  // Time slots for the selected day (UTC comparison)
  const slotsForSelectedDate = selectedDate
    ? availabilities.filter(a => {
        const slotDate = new Date(a.startTime);
        const selected = new Date(Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()));
        return slotDate.getUTCFullYear() === selected.getUTCFullYear() &&
               slotDate.getUTCMonth() === selected.getUTCMonth() &&
               slotDate.getUTCDate() === selected.getUTCDate();
      })
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#f1f8e9] to-[#e3f2fd] py-12 flex flex-col md:flex-row gap-8 items-start justify-center">
      {/* Left Panel: Form */}
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-8 mb-8 md:mb-0">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#234e52]">Add Availability</h2>
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition"
              required
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Start Hour</label>
            <select
              value={startHour}
              onChange={e => setStartHour(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition"
              required
            >
              <option value="">Select hour...</option>
              {HOURS.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition"
              required
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">End Hour</label>
            <select
              value={endHour}
              onChange={e => setEndHour(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition"
              required
            >
              <option value="">Select hour...</option>
              {HOURS.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-teal-300 transition"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Availability'}
          </button>
        </form>
      </div>
      {/* Right Panel: Calendar */}
      <div className="w-full max-w-xl bg-white/90 rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4 text-[#234e52]">Availability Calendar</h2>
        {calendarLoading ? (
          <div className="text-center text-gray-500">Loading calendar...</div>
        ) : (
          <>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileClassName={({ date, view }) =>
                view === 'month' && availableDates.includes(formatDate(date))
                  ? 'bg-teal-200 text-teal-900 font-bold rounded-full' : null
              }
              tileContent={({ date, view }) =>
                view === 'month' && availableDates.includes(formatDate(date)) ? (
                  <div className="flex justify-center items-center mt-1">
                    <span className="inline-block w-2 h-2 bg-teal-500 rounded-full"></span>
                  </div>
                ) : null
              }
            />
            {selectedDate && (
              <div className="mt-6 w-full">
                <h3 className="text-lg font-semibold mb-2 text-[#234e52]">Availabilities for {formatDate(selectedDate)}:</h3>
                {slotsForSelectedDate.length === 0 ? (
                  <div className="text-gray-500">No availability added for this day.</div>
                ) : (
                  <ul className="space-y-2">
                    {slotsForSelectedDate.map(slot => (
                      <li key={slot.id} className="bg-teal-50 border border-teal-100 rounded px-4 py-2 flex justify-between items-center">
                        <span>
                          {new Date(slot.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          {' - '}
                          {new Date(slot.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {/* Delete/edit buttons can be added */}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TherapistAvailabilities; 