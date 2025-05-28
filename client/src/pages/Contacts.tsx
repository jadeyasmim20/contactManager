import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/contacts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(response.data);
    } catch (err) {
      setError('Failed to fetch contacts');
      navigate('/login');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3000/contacts',
        { name, email, phone },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setName('');
      setEmail('');
      setPhone('');
      fetchContacts();
    } catch (err) {
      setError('Failed to create contact');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/contacts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchContacts();
    } catch (err) {
      setError('Failed to delete contact');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Contacts</h2>
          <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
            Logout
          </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
            Add Contact
          </button>
        </form>
        <div className="bg-white rounded shadow-md">
          {contacts.length === 0 ? (
            <p className="p-4">No contacts found.</p>
          ) : (
            contacts.map((contact) => (
              <div key={contact.id} className="p-4 border-b flex justify-between items-center">
                <div>
                  <p className="font-bold">{contact.name}</p>
                  <p>{contact.email}</p>
                  <p>{contact.phone}</p>
                </div>
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
