import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiArrowLeft, FiLoader } from 'react-icons/fi';
import './ForgotApiKey.css';

const ForgotApiKey = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || cooldown > 0) return;
    setIsSubmitting(true);
    
    try {
      await axios.post('http://localhost:3001/api/v1/auth/forgot-key', { clientEmail: email });
      setMessage('Odkaz byl odeslán na váš email');
      setError('');
      setCooldown(60);
    } catch (err) {
      setError(err.response?.data?.details || 'Došlo k chybě');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft /> Zpět
        </button>

        <h2><FiMail /> Obnovení API klíče</h2>
        
        {message && (
          <div className="success-message">
            <p>{message}</p>
            <p>Můžete zkusit znovu za {cooldown}s</p>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Zadejte registrovaný email"
              required
              disabled={isSubmitting || cooldown > 0}
            />
          </div>
          
          <button 
            type="submit" 
            className="primary-btn"
            disabled={isSubmitting || cooldown > 0}
          >
            {isSubmitting ? <><FiLoader className="spin" /> Odesílání...</> : 
              cooldown > 0 ? `Čekejte ${cooldown}s` : 'Odeslat resetovací odkaz'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotApiKey;