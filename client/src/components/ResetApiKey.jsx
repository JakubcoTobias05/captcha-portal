import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FiCopy, FiCheckCircle, FiXCircle, FiLoader } from 'react-icons/fi';
import './ResetApiKey.css';

const ResetApiKey = () => {
  const [newApiKey, setNewApiKey] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); 

  const handleReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/auth/reset-key',
        { token } 
      );
      setNewApiKey(response.data.data.key);
      setMessage('Klíč byl úspěšně resetován');
    } catch (err) {
      setError(err.response?.data?.details || 'Neplatný resetovací odkaz');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(newApiKey);
    setMessage('Klíč zkopírován!');
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <button className="close-btn" onClick={() => navigate('/')}>
          <FiXCircle />
        </button>

        <h2>Resetování API klíče</h2>

        {error && (
          <div className="error-message">
            <FiXCircle /> {error}
          </div>
        )}

        {message && (
          <div className="success-message">
            <FiCheckCircle /> {message}
          </div>
        )}

        {newApiKey ? (
          <div className="key-container">
            <div className="key-display">
              <code>{newApiKey}</code>
              <button onClick={copyToClipboard} className="copy-btn">
                <FiCopy />
              </button>
            </div>
            <p className="info-text">Klíč byl uložen a odeslán na váš email</p>
          </div>
        ) : (
          <div className="reset-content">
            <p>Potvrďte vytvoření nového API klíče</p>
            <button 
              onClick={handleReset}
              className="primary-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FiLoader className="spin" />
                  Probíhá reset...
                </>
              ) : 'Vygenerovat nový klíč'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetApiKey;