import React, { useState } from 'react';
import axios from 'axios';
import { FiCopy, FiRefreshCw, FiCheck, FiLoader } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Api.css';

const Api = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    websiteUrl: ''
  });
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Normalizace URL
      let websiteUrl = formData.websiteUrl.trim();
      if (websiteUrl && !websiteUrl.startsWith('http')) {
        websiteUrl = `https://${websiteUrl}`;
      }

      const response = await axios.post(
        'http://localhost:3001/api/v1/auth/keys',
        {
          clientName: formData.clientName.trim(),
          clientEmail: formData.clientEmail.trim().toLowerCase(),
          websiteUrl
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 15000
        }
      );

      if (response.data?.success) {
        setApiKey(response.data.data.key);
        setIsSubmitted(true);
      }
    } catch (error) {
      const errorData = error.response?.data;
      const errorMap = {
        'NEVALIDNÍ_VSTUP': 'Chyba ve formuláři',
        'DUPLICITNÍ_ZÁZNAM': 'Tento email je již registrován',
        'INTERNÍ_CHYBA': 'Došlo k chybě serveru'
      };

      setError({
        message: errorMap[errorData?.error] || 'Došlo k chybě',
        details: errorData?.details || null
      });
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
    setFormData({
      clientName: '',
      clientEmail: '',
      websiteUrl: ''
    });
    setApiKey('');
    setError(null);
    setIsSubmitted(false);
  };

  return (
    <div className="api-container">
      <div className="api-card">
        <h2 className="api-title">Generování API Klíče</h2>

        {error && (
          <div className="error-message">
            <p><strong>⚠️ {error.message}</strong></p>
            {error.details && (
              <ul>
                {Object.entries(error.details).map(([field, msg]) => (
                  <li key={field}>
                    <strong>{{
                      clientName: 'Jméno',
                      clientEmail: 'Email',
                      websiteUrl: 'URL'
                    }[field]}</strong>: {{
                      'JMÉNO_POVINNÉ': 'Vyplňte toto pole',
                      'NEVALIDNÍ_EMAIL': 'Neplatný formát e-mailu',
                      'URL_POVINNÁ': 'Vyplňte URL',
                      'URL_MUSÍ_OBSAHOVAT_PROTOKOL': 'Musí začínat http:// nebo https://'
                    }[msg]}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <form className="api-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="clientName">Jméno klienta</label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              placeholder="Jan Novák"
              value={formData.clientName}
              onChange={handleChange}
              disabled={isSubmitted}
              autoComplete="organization"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="clientEmail">E-mail</label>
            <input
              type="email"
              id="clientEmail"
              name="clientEmail"
              placeholder="jan@example.com"
              value={formData.clientEmail}
              onChange={handleChange}
              disabled={isSubmitted}
              autoComplete="email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="websiteUrl">URL webu</label>
            <input
              type="text"
              id="websiteUrl"
              name="websiteUrl"
              placeholder="https://www.example.com"
              value={formData.websiteUrl}
              onChange={handleChange}
              disabled={isSubmitted}
              autoComplete="url"
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