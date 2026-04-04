'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return 'A valid email is required.';
    if (!formData.password || formData.password.length < 6)
      return 'Password must be at least 6 characters.';
    return null;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFeedback({ type: '', message: '' });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) { setFeedback({ type: 'error', message: error }); return; }
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setFeedback({ type: 'success', message: `Registration successful! Your User ID is ${data.userId}` });
        setFormData({ name: '', email: '', password: '' });
      } else {
        setFeedback({ type: 'error', message: data.error || 'Registration failed' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Unable to connect to the server.' });
    } finally {
      setIsLoading(false);
    }
  };

  const pwStrength = formData.password.length > 8 ? 3 : formData.password.length > 5 ? 2 : formData.password.length > 2 ? 1 : 0;
  const pwLabel = ['', 'Weak', 'Medium', 'Strong'][pwStrength];
  const pwColor = ['', '#EF4444', '#F59E0B', '#16A34A'][pwStrength];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        .page-wrap { font-family: 'Inter', sans-serif; }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes floatUpDelay {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
        @keyframes shimmer {
          from { transform: translateX(-100%) rotate(45deg); }
          to { transform: translateX(400%) rotate(45deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .left-gradient {
          background: linear-gradient(135deg, #0a0f1e 0%, #0d2060 40%, #1a3aab 70%, #1a56c4 100%);
          background-size: 300% 300%;
          animation: gradientShift 12s ease infinite;
        }
        .card-float { animation: floatUp 5s ease-in-out infinite; }
        .card-float-delay { animation: floatUpDelay 5s ease-in-out 2.5s infinite; }
        .pulse-dot { animation: pulseDot 2s ease-in-out infinite; }
        .btn-shine::after {
          content: '';
          position: absolute;
          top: -50%; left: -60%;
          width: 40%; height: 200%;
          background: rgba(255,255,255,0.25);
          transform: rotate(20deg);
          transition: left 0.6s ease;
        }
        .btn-shine:hover::after { left: 130%; }
        .feedback-enter { animation: fadeIn 0.3s ease; }
        .input-field {
          width: 100%;
          padding: 14px 48px 14px 16px;
          border-radius: 12px;
          border: 2px solid #E5E7EB;
          background: #FAFAFA;
          color: #111827;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: all 0.2s ease;
        }
        .input-field::placeholder { color: #9CA3AF; }
        .input-field:focus {
          border-color: #2563EB;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }
        .input-field.focused {
          border-color: #2563EB;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }
      `}</style>

      <div className="page-wrap min-h-screen flex" style={{ background: '#F0F4FF' }}>

        {/* ── LEFT PANE ── */}
        <div className="left-gradient hidden lg:flex lg:w-[45%] flex-col justify-between p-12 relative overflow-hidden">

          {/* Decorative blobs */}
          <div style={{
            position: 'absolute', top: '-80px', left: '-80px',
            width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,179,237,0.15) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute', bottom: '-60px', right: '-60px',
            width: '350px', height: '350px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative', zIndex: 10 }}>
            <div style={{
              width: 48, height: 48, position: 'relative',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 14, border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(12px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0
            }}>
              <Image src="/logo.png" alt="DataLoop" fill style={{ objectFit: 'contain', padding: 8 }} />
            </div>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 22, letterSpacing: '-0.3px' }}>DataLoop</span>
          </div>

          {/* Floating stat cards */}
          <div className="card-float" style={{
            position: 'absolute', top: '22%', right: 40, zIndex: 10,
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 18, padding: '14px 18px',
            display: 'flex', alignItems: 'center', gap: 14,
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(22,163,74,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <div className="pulse-dot" style={{ width: 12, height: 12, borderRadius: '50%', background: '#16A34A' }} />
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>Data Quality</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, marginTop: 2 }}>99.8% Validated</div>
            </div>
          </div>

          <div className="card-float-delay" style={{
            position: 'absolute', top: '44%', right: 40, zIndex: 10,
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 18, padding: '14px 18px',
            display: 'flex', alignItems: 'center', gap: 14,
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(245,158,11,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <div className="pulse-dot" style={{ width: 12, height: 12, borderRadius: '50%', background: '#F59E0B', animationDelay: '1s' }} />
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>Respondents</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, marginTop: 2 }}>10,000+ Reached</div>
            </div>
          </div>

          {/* Slogan */}
          <div style={{ position: 'relative', zIndex: 10, maxWidth: 380 }}>
            <h1 style={{
              color: '#fff', fontSize: 46, fontWeight: 900,
              lineHeight: 1.1, letterSpacing: '-1px', marginBottom: 20
            }}>
              Respond Smarter.{' '}
              <span style={{
                background: 'linear-gradient(90deg, #93C5FD, #60A5FA, #BFDBFE)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Research Better.
              </span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, lineHeight: 1.75, fontWeight: 400 }}>
              The professional standard for modern researchers. Precision data, engaging forms, and actionable insights — all in one place.
            </p>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: 10, marginTop: 32, flexWrap: 'wrap' }}>
              {['🔒 Secure & Encrypted', '⚡ Lightning Fast', '📊 Smart Analytics'].map((badge) => (
                <span key={badge} style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 999, padding: '6px 14px',
                  color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 500
                }}>{badge}</span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, position: 'relative', zIndex: 10 }}>
            © {new Date().getFullYear()} DataLoop Inc. All rights reserved.
          </div>
        </div>

        {/* ── RIGHT PANE ── */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center',
          padding: '40px 24px',
          background: 'linear-gradient(160deg, #EFF6FF 0%, #FFFFFF 50%, #F0F4FF 100%)',
          overflowY: 'auto'
        }}>
          <div style={{
            width: '100%', maxWidth: 440,
            background: '#ffffff',
            borderRadius: 24,
            padding: '40px',
            boxShadow: '0 4px 6px -1px rgba(37,99,235,0.05), 0 20px 60px -10px rgba(37,99,235,0.12)',
            border: '1px solid rgba(37,99,235,0.08)',
            position: 'relative'
          }}>

            {/* Accent glow top */}
            <div style={{
              position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
              width: '60%', height: 2,
              background: 'linear-gradient(90deg, transparent, #2563EB, #60A5FA, transparent)',
              borderRadius: 999
            }} />

            {/* Mobile logo */}
            <div className="lg:hidden" style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
              <div style={{
                width: 56, height: 56, position: 'relative',
                background: '#EFF6FF', borderRadius: 16,
                border: '1px solid #BFDBFE', padding: 10
              }}>
                <Image src="/logo.png" alt="DataLoop" fill style={{ objectFit: 'contain', padding: 8 }} />
              </div>
            </div>

            {/* Header */}
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: '#111827', letterSpacing: '-0.5px', marginBottom: 6 }}>
                Create your account
              </h2>
              <p style={{ color: '#6B7280', fontSize: 14, fontWeight: 400 }}>
                Start your journey with DataLoop today.
              </p>
            </div>

            {/* Feedback */}
            {feedback.message && (
              <div className="feedback-enter" style={{
                padding: '12px 16px',
                borderRadius: 12,
                marginBottom: 20,
                fontSize: 13,
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: feedback.type === 'error' ? '#FEF2F2' : '#F0FDF4',
                border: `1px solid ${feedback.type === 'error' ? '#FECACA' : '#BBF7D0'}`,
                color: feedback.type === 'error' ? '#DC2626' : '#16A34A',
              }}>
                <span>{feedback.type === 'error' ? '⚠️' : '✅'}</span>
                {feedback.message}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Full Name */}
              <div>
                <label htmlFor="name" style={{
                  display: 'block', fontSize: 12, fontWeight: 700,
                  color: '#2563EB', marginBottom: 8,
                  textTransform: 'uppercase', letterSpacing: '0.06em'
                }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="name" name="name" type="text"
                    autoComplete="name" required
                    className={`input-field ${focused === 'name' ? 'focused' : ''}`}
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                  />
                  <svg style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: focused === 'name' ? '#2563EB' : '#D1D5DB', transition: 'color 0.2s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" style={{
                  display: 'block', fontSize: 12, fontWeight: 700,
                  color: '#2563EB', marginBottom: 8,
                  textTransform: 'uppercase', letterSpacing: '0.06em'
                }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="email" name="email" type="email"
                    autoComplete="email" required
                    className={`input-field ${focused === 'email' ? 'focused' : ''}`}
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                  />
                  <svg style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: focused === 'email' ? '#2563EB' : '#D1D5DB', transition: 'color 0.2s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" style={{
                  display: 'block', fontSize: 12, fontWeight: 700,
                  color: '#2563EB', marginBottom: 8,
                  textTransform: 'uppercase', letterSpacing: '0.06em'
                }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="password" name="password" type="password"
                    autoComplete="new-password" required
                    className={`input-field ${focused === 'password' ? 'focused' : ''}`}
                    placeholder="Min. 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused(null)}
                  />
                  <svg style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: focused === 'password' ? '#2563EB' : '#D1D5DB', transition: 'color 0.2s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>

                {/* Password strength */}
                {formData.password.length > 0 && (
                  <div className="feedback-enter" style={{ marginTop: 10 }}>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
                      {[1, 2, 3].map((level) => (
                        <div key={level} style={{
                          flex: 1, height: 4, borderRadius: 4,
                          background: pwStrength >= level ? pwColor : '#E5E7EB',
                          transition: 'background 0.3s ease'
                        }} />
                      ))}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: pwColor }}>{pwLabel} password</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-shine"
                style={{
                  position: 'relative', overflow: 'hidden',
                  width: '100%', padding: '15px 24px',
                  borderRadius: 14, border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer',
                  background: isLoading ? '#93C5FD' : 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 50%, #1a45c4 100%)',
                  color: '#fff', fontSize: 15, fontWeight: 700,
                  letterSpacing: '0.02em',
                  boxShadow: isLoading ? 'none' : '0 8px 24px rgba(37, 99, 235, 0.35)',
                  transform: 'translateY(0)',
                  transition: 'all 0.25s ease',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  marginTop: 8,
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 14px 32px rgba(37, 99, 235, 0.45)';
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 24px rgba(37, 99, 235, 0.35)';
                }}
              >
                {isLoading ? (
                  <svg style={{ width: 20, height: 20, animation: 'spin 1s linear infinite' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <svg style={{ width: 18, height: 18 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                )}
                {isLoading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            {/* Sign in link */}
            <p style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: '#6B7280' }}>
              Already have an account?{' '}
              <a href="#" style={{
                color: '#2563EB', fontWeight: 700, textDecoration: 'none',
                borderBottom: '2px solid transparent', paddingBottom: 1,
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#2563EB')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'transparent')}
              >Sign in</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
