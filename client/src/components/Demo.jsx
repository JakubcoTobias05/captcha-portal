import React, { useState, useEffect, useRef } from 'react';
import './Demo.css';

const loadCaptchaScript = () => {
  return new Promise((resolve, reject) => {
    if (window.CaptchaWidget) return resolve();
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/captcha-widget@1.0.8/dist/captcha-widget.umd.js";
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

const Demo = () => {
  const [language] = useState('cs');
  const [captchaType, setCaptchaType] = useState('image');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [popup, setPopup] = useState(null);
  
  const [email] = useState('johndoe@example.com');
  const [password] = useState('**********');
  
  const containerRef = useRef(null);

  useEffect(() => {
    const handleCaptchaVerified = () => {
      setCaptchaVerified(true);
    };
    window.addEventListener('captchaVerified', handleCaptchaVerified);
    return () => {
      window.removeEventListener('captchaVerified', handleCaptchaVerified);
    };
  }, []);

  useEffect(() => {
    loadCaptchaScript()
      .then(() => {
        setTimeout(() => {
          if (window.CaptchaWidget && typeof window.CaptchaWidget.init === "function") {
            window.CaptchaWidget.init();
          }
        }, 1000);
      })
      .catch((err) => console.error("Chyba při načítání skriptu:", err));

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      const widgetDiv = document.createElement("div");
      widgetDiv.setAttribute("data-captcha-widget", "");
      widgetDiv.setAttribute("data-api-key", "dc0c00d294fe9f152991367f778904b4bb6013d3835aee0615e5f83bb555d581");
      widgetDiv.setAttribute("data-lang", language);
      widgetDiv.setAttribute("data-type", captchaType);
      containerRef.current.appendChild(widgetDiv);
    }
  }, [language, captchaType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaVerified) {
      setPopup({ message: "Prosím ověřte, že nejste robot", type: "error" });
      setTimeout(() => setPopup(null), 5000);
      return;
    }
    setPopup({ message: "CAPTCHA ověřena, požadavek odeslán", type: "success" });
    setTimeout(() => setPopup(null), 5000);
    console.log("Formulář odeslán. CAPTCHA ověřena:", captchaVerified);
  };

  const handleCaptchaTypeChange = (newType) => {
    setCaptchaType(newType);
    setCaptchaVerified(false);
  };

  return (
    <section className="demo-container">
      <div className="demo-card">
        <div className="header-box">
          <h3>CAPTCHA ukázka</h3>
          <p>Klikněte na tlačítko a ověřte se pomocí CAPTCHA</p>
        </div>
        <div className="radio-group">
          <button
            type="button"
            className={`radio-button ${captchaType === 'image' ? 'active' : ''}`}
            onClick={() => handleCaptchaTypeChange('image')}
          >
            Image
          </button>
          <button
            type="button"
            className={`radio-button ${captchaType === 'text' ? 'active' : ''}`}
            onClick={() => handleCaptchaTypeChange('text')}
          >
            Text
          </button>
          <button
            type="button"
            className={`radio-button ${captchaType === 'audio' ? 'active' : ''}`}
            onClick={() => handleCaptchaTypeChange('audio')}
          >
            Audio
          </button>
          <button
            type="button"
            className={`radio-button ${captchaType === 'nocaptcha' ? 'active' : ''}`}
            onClick={() => handleCaptchaTypeChange('nocaptcha')}
          >
            NoCaptcha
          </button>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="email"
              id="email"
              placeholder="johndoe@example.com"
              value={email}
              disabled={true}
              className="large-input"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              placeholder="**********"
              value={password}
              disabled={true}
              className="large-input"
            />
          </div>
          <div className="my-captcha-container" id="captcha-container" ref={containerRef}></div>
          <button 
            type="submit" 
            className="login-button"
          >
            Přihlásit se
          </button>
        </form>
        {popup && (
          <div className={`popup-message ${popup.type}`}>
            {popup.message}
          </div>
        )}
      </div>
    </section>
  );
};

export default Demo;
