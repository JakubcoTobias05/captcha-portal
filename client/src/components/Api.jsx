import React, { useState } from 'react';
import axios from 'axios';
import { FiCopy, FiRefreshCw, FiCheck, FiLoader } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Api.css';

const Api = () => {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/auth/keys',
        { clientName, clientEmail, websiteUrl }
      );
      setApiKey(response.data.data.key);
      setError('');
      setIsSubmitted(true);
    } catch (error) {
      setError(error.response?.data?.details || 'Chyba serveru');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const resetForm = () => {
    setClientName('');
    setClientEmail('');
    setWebsiteUrl('');
    setApiKey('');
    setError('');
    setIsSubmitted(false);
  };

  return (
    <div className="api-container">
      <div className="api-card">
        <h2 className="api-title">Generování API Klíče</h2>
        
        <form className="api-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Jméno klienta"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              disabled={isSubmitted}
              required
            />
          </div>
          
          <div className="input-group">
            <input
              type="email"
              placeholder="Emailová adresa"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              disabled={isSubmitted}
              required
            />
          </div>
          
          <div className="input-group">
            <input
              type="url"
              placeholder="URL webové stránky"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              disabled={isSubmitted}
              required
            />
          </div>

          <div className="button-group">
            <button 
              type="submit" 
              className={`primary-btn ${isLoading ? 'loading' : ''}`}
              disabled={isSubmitted || isLoading}
            >
              {isLoading ? (
                <>
                  <FiLoader className="spin" />
                  Generování...
                </>
              ) : isSubmitted ? 'Klíč vygenerován' : 'Vygenerovat klíč'}
            </button>
            
            {isSubmitted && (
              <button
                type="button"
                onClick={resetForm}
                className="secondary-btn"
                title="Vygenerovat nový klíč"
              >
                <FiRefreshCw />
              </button>
            )}
          </div>
        </form>

        {error && <div className="error-message">{error}</div>}

        {apiKey && (
          <div className="key-container">
            <div className="key-display">
              <code>{apiKey}</code>
              <button 
                onClick={copyToClipboard} 
                className="copy-btn"
                aria-label="Kopírovat"
              >
                {isCopied ? <FiCheck /> : <FiCopy />}
              </button>
            </div>
            <p className="key-warning">⚠️ Uložte si klíč na bezpečné místo</p>
          </div>
        )}

        <div className="footer-link">
          <Link to="/forgot-api-key">Zapomněli jste svůj API klíč?</Link>
        </div>
      </div>
    </div>
  );
};

export default Api;