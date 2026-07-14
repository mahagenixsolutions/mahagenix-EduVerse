import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Home, Coffee, Users, Search, AlertCircle, Calendar, ShieldCheck, MapPin } from 'lucide-react';

interface AdditionalServicesModuleProps {
  onBack: () => void;
  defaultSubService: string;
}

export const AdditionalServicesModule: React.FC<AdditionalServicesModuleProps> = ({ onBack, defaultSubService }) => {
  const [subService, setSubService] = useState(defaultSubService);

  // PTM States
  const [ptmBookings, setPtmBookings] = useState([
    { id: 1, teacher: 'Mrs. Davis (Physics Coordinator)', date: '2026-07-15', time: '04:00 PM', status: 'Confirmed' }
  ]);
  const [ptmTeacher, setPtmTeacher] = useState('Mrs. Davis (Physics Coordinator)');
  const [ptmDate, setPtmDate] = useState('');
  const [ptmTime, setPtmTime] = useState('04:00 PM');

  // Lost & Found States
  const [lostItems, setLostItems] = useState([
    { id: 101, name: 'Scientific Calculator (Casio)', location: 'Physics Lab 3', date: '08 Jul 2026', status: 'Claimed' },
    { id: 102, name: 'Blue Hydro Flask Bottle', location: 'Sports Arena Bleachers', date: '09 Jul 2026', status: 'Unclaimed' },
    { id: 103, name: 'Geometry Box set', location: 'Classroom 105 desk', date: '10 Jul 2026', status: 'Unclaimed' }
  ]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemLocation, setNewItemLocation] = useState('');

  const handleBookPTM = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ptmDate) return;
    const id = Math.floor(Math.random() * 100);
    setPtmBookings(prev => [
      ...prev,
      { id, teacher: ptmTeacher, date: ptmDate, time: ptmTime, status: 'Confirmed' }
    ]);
    setPtmDate('');
    alert(`PTM meeting scheduled successfully with ${ptmTeacher}!`);
  };

  const handleReportLost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || !newItemLocation.trim()) return;
    const id = Math.floor(Math.random() * 100) + 100;
    setLostItems(prev => [
      { id, name: newItemName, location: newItemLocation, date: 'Today', status: 'Unclaimed' },
      ...prev
    ]);
    setNewItemName('');
    setNewItemLocation('');
    alert(`Reported "${newItemName}" as lost. Admin desk notified.`);
  };

  const handleClaim = (id: number) => {
    setLostItems(prev => prev.map(item => item.id === id ? { ...item, status: 'Claimed' } : item));
    alert('Claim request registered! Please verify ownership at school front desk.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <button 
            onClick={onBack} 
            style={{ 
              background: 'none', border: 'none', color: '#10B981', fontWeight: 600, 
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: 0, marginBottom: '8px'
            }}
          >
            ← Back to Services
          </button>
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>
            ERP Sub-Services Portal
          </h2>
        </div>

        {/* Sub-Service switcher list */}
        <select 
          value={subService} 
          onChange={e => setSubService(e.target.value)}
          style={{ padding: '8px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '0.82rem', background: 'white' }}
        >
          <option>Hostel</option>
          <option>Mess Menu</option>
          <option>PTM Booking</option>
          <option>Lost & Found</option>
        </select>
      </div>

      {/* Hostel Details */}
      {subService === 'Hostel' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '20px' }}>
          <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Home size={18} color="var(--primary-color)" /> Hostel Room Allocation
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}>
                <span>Hostel Block:</span>
                <strong>Block-C, Green Valley wing</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}>
                <span>Room Number:</span>
                <strong>Room 304-B (Triple Occupancy)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}>
                <span>Warden Contact:</span>
                <strong>Mr. Harold Vance (+91 98765 43233)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
                <span>Hostel Fees Status:</span>
                <span style={{ color: '#10B981', fontWeight: 700 }}>Cleared ✓</span>
              </div>
            </div>
            
            <button 
              onClick={() => alert('Room change requests are currently disabled. Please contact warden Office.')}
              style={{
                background: 'none', border: '1px solid var(--border-color)', borderRadius: '12px',
                padding: '10px 0', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', color: 'var(--text-light)'
              }}
            >
              Request Room Relocation
            </button>
          </Card>

          <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--bg-secondary)' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={16} color="var(--primary-color)" /> Roommates
            </h3>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.8rem', color: 'var(--text-light)', lineHeight: 1.8 }}>
              <li><strong>Alan Walker</strong> (Grade 10-C, Roll 02)</li>
              <li><strong>John Cooper</strong> (Grade 10-A, Roll 14)</li>
            </ul>
          </Card>
        </div>
      )}

      {/* Mess Menu Details */}
      {subService === 'Mess Menu' && (
        <Card style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Coffee size={18} color="#F59E0B" /> Weekly Cafeteria & Mess Menu
          </h3>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-light)' }}>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Day</th>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Breakfast (07:30 - 08:30)</th>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Lunch (12:30 - 01:30)</th>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Dinner (07:30 - 08:30)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { day: 'Monday', bf: 'Cornflakes, Toast, Eggs, Milk', ln: 'Steamed Rice, Lentil soup, Paneer, Salad', dn: 'Chapati, Mixed Veg, Dal, Curd' },
                { day: 'Tuesday', bf: 'Pancakes, Fruit salad, Juice', ln: 'Veg Fried Rice, Manchurian Gravy, Soup', dn: 'Steamed Rice, Chicken Curry/Aloo Dum, Dal' },
                { day: 'Wednesday', bf: 'Oatmeal, Banana, Tea/Coffee', ln: 'Pasta Alfredo, Garlic Bread, Juice', dn: 'Chapati, Gobi Masala, Lentil soup' },
                { day: 'Thursday', bf: 'French Toast, Scrambled eggs, Milk', ln: 'Jeera Rice, Chole Masala, Curd', dn: 'Chapati, Bhindi Fry, Dal Tadka' },
                { day: 'Friday', bf: 'Waffles, Strawberries, Juice', ln: 'Veg Biryani, Raita, Gulab Jamun', dn: 'Noodles, Chilli Paneer/Chicken, Soup' }
              ].map(menu => (
                <tr key={menu.day} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px 8px', fontWeight: 700, color: 'var(--text-main)' }}>{menu.day}</td>
                  <td style={{ padding: '14px 8px', color: 'var(--text-light)' }}>{menu.bf}</td>
                  <td style={{ padding: '14px 8px', color: 'var(--text-light)' }}>{menu.ln}</td>
                  <td style={{ padding: '14px 8px', color: 'var(--text-light)' }}>{menu.dn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {/* PTM Booking Details */}
      {subService === 'PTM Booking' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1.4fr', gap: '20px' }}>
          <Card style={{ padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 700 }}>Schedule PTM Meeting Slot</h3>
            
            <form onSubmit={handleBookPTM} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>Select Subject Teacher</label>
                <select 
                  value={ptmTeacher}
                  onChange={e => setPtmTeacher(e.target.value)}
                  style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', background: 'white' }}
                >
                  <option>Mrs. Davis (Physics Coordinator)</option>
                  <option>Mr. Smith (Math Department Head)</option>
                  <option>Mr. Wilson (English Faculty)</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>Select Date</label>
                  <input 
                    type="date" 
                    value={ptmDate}
                    onChange={e => setPtmDate(e.target.value)}
                    style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', outline: 'none' }}
                    required
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>Select Slot Time</label>
                  <select 
                    value={ptmTime}
                    onChange={e => setPtmTime(e.target.value)}
                    style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.82rem', background: 'white' }}
                  >
                    <option>04:00 PM</option>
                    <option>04:30 PM</option>
                    <option>05:00 PM</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                style={{
                  background: '#10B981', color: 'white', border: 'none', borderRadius: '12px',
                  padding: '12px 0', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(16,185,129,0.1)'
                }}
              >
                Schedule PTM Slot
              </button>
            </form>
          </Card>

          {/* Booked list */}
          <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>PTM Schedule Tracker</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {ptmBookings.map(b => (
                <div key={b.id} style={{
                  padding: '12px', border: '1px solid var(--border-color)', borderRadius: '12px',
                  background: 'var(--surface-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <div>
                    <h4 style={{ margin: '0 0 2px 0', fontSize: '0.85rem', fontWeight: 700 }}>{b.teacher}</h4>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>{b.date} • {b.time}</span>
                  </div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: 'rgba(16,185,129,0.08)', color: '#10B981' }}>
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Lost & Found Details */}
      {subService === 'Lost & Found' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '20px' }}>
          {/* List items directory */}
          <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Lost & Found Directory</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {lostItems.map(item => (
                <div key={item.id} style={{
                  padding: '16px', borderRadius: '16px', border: '1px solid var(--border-color)',
                  background: 'var(--surface-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <div>
                    <h4 style={{ margin: '0 0 2px 0', fontSize: '0.9rem', fontWeight: 700 }}>{item.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Lost at: {item.location} • Logged: {item.date}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {item.status === 'Unclaimed' ? (
                      <button 
                        onClick={() => handleClaim(item.id)}
                        style={{
                          background: '#10B981', color: 'white', border: 'none', borderRadius: '8px',
                          padding: '6px 12px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer'
                        }}
                      >
                        Claim Item
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 600 }}>
                        Claimed ✓
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Form to report lost item */}
          <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Report Lost Item</h3>
            
            <form onSubmit={handleReportLost} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Item Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Red geometry compass case" 
                  value={newItemName}
                  onChange={e => setNewItemName(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.82rem', outline: 'none' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Possible Location</label>
                <input 
                  type="text" 
                  placeholder="e.g. Cafeteria seating row 3" 
                  value={newItemLocation}
                  onChange={e => setNewItemLocation(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.82rem', outline: 'none' }}
                  required
                />
              </div>

              <button 
                type="submit"
                style={{
                  background: '#EF4444', color: 'white', border: 'none', borderRadius: '8px',
                  padding: '10px 0', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer'
                }}
              >
                Log Lost Report
              </button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};
