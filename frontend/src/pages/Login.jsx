import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const usernameRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        username: form.username,
        password: form.password
      });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user || res.data);
      navigate('/courses');
    } catch (err) {
      setError('Нэвтрэх нэр эсвэл нууц үг буруу байна');
      setSubmitting(false);
      usernameRef.current?.focus();
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6' }}>
      <div style={{ width: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#1e1b4b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            LMS SICT
          </div>
          <p style={{ marginTop: 6, fontSize: 14, color: '#6b7280' }}>Системд нэвтрэх</p>
        </div>
        <div className="form-card">
          {error && (
            <div style={{ background: '#fee2e2', color: '#dc2626', padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Нэвтрэх нэр</label>
              <input
                ref={usernameRef}
                className="form-input"
                required
                placeholder="username"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Нууц үг</label>
              <input
                className="form-input"
                type="password"
                required
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '10px' }} disabled={submitting}>
              {submitting ? 'Нэвтэрч байна...' : 'Нэвтрэх'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;