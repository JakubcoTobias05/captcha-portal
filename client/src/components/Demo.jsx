import React, { useState, useEffect } from 'react';
import './Demo.css';

const Demo = () => {
  const [language, setLanguage] = useState('cs');
  const [animation, setAnimation] = useState('popup');
  const [captchaType, setCaptchaType] = useState('image'); // výchozí např. obrázková

  const handleSubmit = (e) => {
    e.preventDefault();
    // Sem přidejte logiku ověření CAPTCHA a odeslání formuláře
  };

  useEffect(() => {
    if (window.CaptchaWidget && typeof window.CaptchaWidget.init === 'function') {
      window.CaptchaWidget.init();
    }
  }, [language, captchaType, animation]);

  return (
    <section className="main-container" id="main-container">
      <div className="main-text">
        <h4>Adaptivní CAPTCHA ukázky</h4>
        <p>Flexibilní v ochraně proti botům, různé typy variací</p>
      </div>
      <div className="captcha-example">
        <div className="left-box">
          <div className="header-box">
            <h3>Nastavení CAPTCHA</h3>
            <p>Vyberte si z možností</p>
          </div>
          <div className="settings-body">
            <h4>Jazyk</h4>
            <div className="settings">
              <input type="radio" name="language" id="lang-cs" checked={language === 'cs'} onChange={() => setLanguage('cs')} />
              <label htmlFor="lang-cs">Česky</label>
              <input type="radio" name="language" id="lang-en" checked={language === 'en'} onChange={() => setLanguage('en')} />
              <label htmlFor="lang-en">English</label>
            </div>
            <h4>Typ CAPTCHA</h4>
            <div className="settings">
              <input type="radio" name="captcha-type" id="textcaptcha" checked={captchaType === 'text'} onChange={() => setCaptchaType('text')} />
              <label htmlFor="textcaptcha">Textová</label>
              <input type="radio" name="captcha-type" id="audiocaptcha" checked={captchaType === 'audio'} onChange={() => setCaptchaType('audio')} />
              <label htmlFor="audiocaptcha">Zvuková</label>
              <input type="radio" name="captcha-type" id="imagecaptcha" checked={captchaType === 'image'} onChange={() => setCaptchaType('image')} />
              <label htmlFor="imagecaptcha">Obrázková</label>
              <input type="radio" name="captcha-type" id="nocaptcha" checked={captchaType === 'nocaptcha'} onChange={() => setCaptchaType('nocaptcha')} />
              <label htmlFor="nocaptcha">NoCaptcha</label>
            </div>
          </div>
        </div>
        <div className="right-box">
          <div className="header-box">
            <h3>CAPTCHA ukázka</h3>
            <p>Klikněte na tlačítko pro ověření</p>
          </div>
          <div id="captcha-container">
            <div
              data-captcha-widget
              data-api-key="f918feaea1668ba3d760d9924e2d527f4bc65e221a08012f9fc13e5103ec672c"
              data-lang={language}
              data-type={captchaType}
            ></div>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-box">
              <input type="text" placeholder="johndoe69@gmail.com" disabled />
            </div>
            <div className="input-box">
              <input type="password" placeholder="**********" disabled />
            </div>
            <button type="submit" className="login-button" disabled>
              Přihlásit se
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Demo;
