import React, { useState, useEffect } from 'react';
import './Demo.css';

const Demo = () => {
  const [language, setLanguage] = useState('cs');
  const [captchaType, setCaptchaType] = useState('image');
  const [widgetKey, setWidgetKey] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Přidejte logiku ověření CAPTCHA a odeslání formuláře zde, pokud je potřeba
  };

  // Při změně jazyka nebo typu CAPTCHA vynutíme remount widgetu
  useEffect(() => {
    setWidgetKey((prev) => prev + 1);
  }, [language, captchaType]);

  // Po změně widgetKey počkáme krátce, aby se nový element vykreslil, a zavoláme init
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.CaptchaWidget && typeof window.CaptchaWidget.init === 'function') {
        window.CaptchaWidget.init();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [widgetKey]);

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
              <input
                type="radio"
                name="language"
                id="lang-cs"
                checked={language === 'cs'}
                onChange={() => setLanguage('cs')}
              />
              <label htmlFor="lang-cs">Česky</label>
              <input
                type="radio"
                name="language"
                id="lang-en"
                checked={language === 'en'}
                onChange={() => setLanguage('en')}
              />
              <label htmlFor="lang-en">English</label>
            </div>
            <h4>Typ CAPTCHA</h4>
            <div className="settings">
              <input
                type="radio"
                name="captcha-type"
                id="textcaptcha"
                checked={captchaType === 'text'}
                onChange={() => setCaptchaType('text')}
              />
              <label htmlFor="textcaptcha">Textová</label>
              <input
                type="radio"
                name="captcha-type"
                id="audiocaptcha"
                checked={captchaType === 'audio'}
                onChange={() => setCaptchaType('audio')}
              />
              <label htmlFor="audiocaptcha">Zvuková</label>
              <input
                type="radio"
                name="captcha-type"
                id="imagecaptcha"
                checked={captchaType === 'image'}
                onChange={() => setCaptchaType('image')}
              />
              <label htmlFor="imagecaptcha">Obrázková</label>
              <input
                type="radio"
                name="captcha-type"
                id="nocaptcha"
                checked={captchaType === 'nocaptcha'}
                onChange={() => setCaptchaType('nocaptcha')}
              />
              <label htmlFor="nocaptcha">NoCaptcha</label>
            </div>
          </div>
        </div>
        <div className="right-box">
          <div className="header-box">
            <h3>CAPTCHA ukázka</h3>
            <p>Klikněte na tlačítko pro ověření</p>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-box">
              <input className="fakeInput" type="text" placeholder="johndoe69@gmail.com" disabled />
            </div>
            <div className="input-box">
              <input className="fakeInput" type="password" placeholder="**********" disabled />
            </div>
            <div id="captcha-container">
              <div
                key={widgetKey}
                data-captcha-widget
                data-api-key="891b0dfb35600e7350bc3f2d9579f326709c37e29c1215b0521063f43fd71226"
                data-lang={language}
                data-type={captchaType}
              ></div>
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
