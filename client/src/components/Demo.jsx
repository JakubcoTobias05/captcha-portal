import React, { useState } from 'react';
import './Demo.css';

const Demo = () => {
  const [language, setLanguage] = useState('cs');
  const [animation, setAnimation] = useState('popup');
  const [captchaType, setCaptchaType] = useState('textcaptcha');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ověření CAPTCHA a odeslání formuláře
  };

  return (
    <section className="main-container" id="main-container">
      <div className="main-text">
        <h4>Adaptivní CAPTCHA ukázky</h4>
        <p>Flexibilní v ochraně proti botům, Různé typy variací</p>
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
            <h4>Animace</h4>
            <div className="settings">
              <input type="radio" name="animation" id="animation-popup" checked={animation === 'popup'} onChange={() => setAnimation('popup')} />
              <label htmlFor="animation-popup">Pop-up</label>
              <input type="radio" name="animation" id="animation-float" checked={animation === 'float'} onChange={() => setAnimation('float')} />
              <label htmlFor="animation-float">Vynoření</label>
              <input type="radio" name="animation" id="animation-bind" checked={animation === 'bind'} onChange={() => setAnimation('bind')} />
              <label htmlFor="animation-bind">Na tlačítku</label>
            </div>
            <h4>Typy CAPTCHA</h4>
            <div className="settings">
              <input type="radio" name="captcha-type" id="textcaptcha" checked={captchaType === 'textcaptcha'} onChange={() => setCaptchaType('textcaptcha')} />
              <label htmlFor="textcaptcha">Textová</label>
              <input type="radio" name="captcha-type" id="type-audiocaptcha" checked={captchaType === 'audiocaptcha'} onChange={() => setCaptchaType('audiocaptcha')} />
              <label htmlFor="type-audiocaptcha">Zvuková</label>
              <input type="radio" name="captcha-type" id="type-imgcatpcha" checked={captchaType === 'imgcatpcha'} onChange={() => setCaptchaType('imgcatpcha')} />
              <label htmlFor="type-imgcatpcha">Obrázková</label>
              <input type="radio" name="captcha-type" id="type-nocatpcha" checked={captchaType === 'nocatpcha'} onChange={() => setCaptchaType('nocatpcha')} />
              <label htmlFor="type-nocatpcha">NoCaptcha</label>
            </div>
          </div>
        </div>
        <div className="right-box">
          <div className="header-box">
            <h3>CAPTCHA ukázka</h3>
            <p>Klikněte na tlačítko dole pro ověření</p>
          </div>
          <div id="captcha-container" data-type={captchaType} data-animation={animation} data-language={language}>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-box">
              <input type="text" placeholder="johndoe69@gmail.com" disabled />
            </div>
            <div className="input-box">
              <input type="password" placeholder="**********" disabled />
            </div>
            <button type="submit" className="login-button" disabled>Přihlásit se</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Demo;