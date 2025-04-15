import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <>
      <section className="home" id="home">
        <div className="home-text">
          <h1>Ochrana před boty<br /> <span> jednoduchou integrací</span></h1>
          <h3>
            Tento systém nabízí různé typy CAPTCHA, které jsou navrženy tak, aby byly<br/>
            snadno integrovány a přizpůsobeny podle potřeb každého klienta.<br />
            Efektivní řešení pro zabezpečení vašich webových stránek proti automatickým útokům a botům.
          </h3>
          <a href="/api-key-gen" className="btn">Získat API →</a>
          <a href="https://captcha-3.gitbook.io/captcha-docs/" target="_blank" rel="noopener noreferrer" className="btn2">Zjístit více</a>
        </div>
      </section>

      <section className="trydemo" id="trydemo">
        <div className="main-text">
          <h2>Vyzkoušejte naši inteligentní CAPTCHA</h2>
        </div>
        <br />
        <div className="trydemo-content">
          <div className="box">
            <img src="/img/trydemo.png" alt="CAPTCHA" />
            <div className="box-content">
              <h3>Flexibilní CAPTCHA</h3>
              <h4>
                <span>Bezpečnost nikdy nebyla tak jednoduchá!</span>
              </h4>
              <br />
              <p>
                Nabízíme moderní, přizpůsobitelné řešení pro ochranu vašich webových stránek.
                Naše CAPTCHA je rychlá, flexibilní a uživatelsky přívětivá.
                Zkuste si ji sami a přesvědčte se o její efektivitě!
              </p>
              <a href="/demo" className="btn">Zkusit demo →</a>
              <a href="https://captcha-3.gitbook.io/captcha-docs/" target="_blank" rel="noopener noreferrer" className="btn2">Zjístit více</a>
            </div>
          </div>
        </div>
      </section>

      <section className="fraud">
        <div className="fraud_header">
          <h2>Proč je CAPTCHA důležitá?</h2>
        </div>
        <div className="fraud-container">
          <div className="threat-box">
            <div className="threat-title">
              <div className="threat-img">
                <img className="threat-icon" src="/img/credential-stuffing.png" alt="Credential Stuffing" />
              </div>
              <div className="threat-text">
                <h3>Krádež údajů</h3>
                <p>Zabraňte neoprávněnému přístupu k citlivým datům.</p>
              </div>
            </div>
          </div>

          <div className="threat-box">
            <div className="threat-title">
              <div className="threat-img">
                <img className="threat-icon" src="/img/ad-fraud.png" alt="Ad Fraud" />
              </div>
              <div className="threat-text">
                <h3>Reklamní podvod</h3>
                <p>Chraňte své reklamy před falešnými kliknutími.</p>
              </div>
            </div>
          </div>

          <div className="threat-box">
            <div className="threat-title">
              <div className="threat-img">
                <img className="threat-icon" src="/img/card-cracking.png" alt="Card Cracking" />
              </div>
              <div className="threat-text">
                <h3>Odhalení karty</h3>
                <p>Předcházejte finančním ztrátám a udržujte si důvěru zákazníků.</p>
              </div>
            </div>
          </div>

          <div className="threat-box">
            <div className="threat-title">
              <div className="threat-img">
                <img className="threat-icon" src="/img/denial-of-inventory.png" alt="Denial of Inventory" />
              </div>
              <div className="threat-text">
                <h3>Zatížení serverů</h3>
                <p>Omezte automatizované útoky, které vyčerpávají zásoby zboží nebo služeb.</p>
              </div>
            </div>
          </div>

          <div className="threat-box">
            <div className="threat-title">
              <div className="threat-img">
                <img className="threat-icon" src="/img/web-scraping.png" alt="Web Scraping" />
              </div>
              <div className="threat-text">
                <h3>Prolomení webu</h3>
                <p>Zabraňte krádeži cenného obsahu a citlivých dat.</p>
              </div>
            </div>
          </div>

          <div className="threat-box">
            <div className="threat-title">
              <div className="threat-img">
                <img className="threat-icon" src="/img/ticket-scalping.png" alt="Ticket Scalping" />
              </div>
              <div className="threat-text">
                <h3>Přeprodej lístků</h3>
                <p>Zabraňte scalperům vykrádat vstupenky a vydělávat na dalším prodeji.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;