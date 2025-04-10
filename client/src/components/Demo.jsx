import React, { useState, useEffect, useRef } from 'react';
import './Demo.css';

const Demo = () => {
  const [language, setLanguage] = useState('cs');
  const [captchaType, setCaptchaType] = useState('image');
  const containerRef = useRef(null);
  
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Event listener na globální událost, která vrací token po ověření CAPTCHA
  useEffect(() => {
    const onCaptchaVerified = (e) => {
      setCaptchaToken(e.detail.token);
      setCaptchaVerified(true);
    };
    window.addEventListener('captchaVerified', onCaptchaVerified);
    return () => window.removeEventListener('captchaVerified', onCaptchaVerified);
  }, []);

  // Při změně jazyka nebo typu CAPTCHA vymažeme kontejner a vložíme nový widgetový element
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      const widgetDiv = document.createElement("div");
      widgetDiv.setAttribute("data-captcha-widget", "");
      widgetDiv.setAttribute("data-api-key", "891b0dfb35600e7350bc3f2d9579f326709c37e29c1215b0521063f43fd71226");
      widgetDiv.setAttribute("data-lang", language);
      widgetDiv.setAttribute("data-type", captchaType);
      containerRef.current.appendChild(widgetDiv);
    }
    // Po krátkém zpoždění inicializujeme widget
    const timer = setTimeout(() => {
      if (window.CaptchaWidget && typeof window.CaptchaWidget.init === "function") {
        window.CaptchaWidget.init();
      } else {
        console.warn("CaptchaWidget není k dispozici.");
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [language, captchaType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tady můžete odeslat formulář spolu s captchaToken (captchaVerified === true)
    console.log("Email:", email, "Heslo:", password, "Captcha Token:", captchaToken);
  };

  return (
    <section className="demo-container">
      <div className="demo-card">
        <div className="header-box">
          <h3>CAPTCHA ukázka</h3>
          <p>Klikněte na tlačítko pro ověření</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="email"
              placeholder="johndoe69@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!captchaVerified}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!captchaVerified}
            />
          </div>
          <div id="captcha-container" ref={containerRef}></div>
          <button type="submit" className="login-button" disabled={!captchaVerified}>
            Přihlásit se
          </button>
        </form>
      </div>
    </section>
  );
};

export default Demo;
