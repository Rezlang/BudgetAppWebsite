import React, { useEffect, useMemo, useRef, useState } from "react";

function Icon({ children }) {
  return <div className="icon">{children}</div>;
}

const APP_STORE_URL = "https://apps.apple.com/app/id000000000";

function useTheme() {
  const [theme, setTheme] = useState(() => {
    // default to light
    const saved = typeof window !== "undefined" ? localStorage.getItem("tb-theme") : null;
    return saved === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("tb-theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  return { theme, toggle };
}

export default function App() {
  const { theme, toggle } = useTheme();

  // Screenshot upload for device
  const [screenSrc, setScreenSrc] = useState(null);
  const fileRef = useRef(null);

  const onPickScreenshot = () => fileRef.current?.click();
  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setScreenSrc(url);
  };

  // Download behavior
  const downloadSectionRef = useRef(null);
  const goToStore = (origin = "default") => {
    // Header "Download": scroll first, then redirect
    if (origin === "header") {
      downloadSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      // small delay so users see the scroll before redirect
      setTimeout(() => {
        window.location.href = APP_STORE_URL;
      }, 600);
      return;
    }
    // Everyone else: immediate redirect
    window.location.href = APP_STORE_URL;
  };

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="page">
      {/* Header */}
      <header className="header">
        <div className="brand">
          <div className="logo">TB</div>
          <div className="brand-text">
            <span className="brand-title">Total Budget</span>
            <span className="brand-sub">Budgeting for iOS</span>
          </div>
        </div>
        <nav className="nav">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#faq">FAQ</a>

          {/* Header Download: scroll then redirect */}
          <button
            className="btn btn-ghost"
            onClick={() => goToStore("header")}
            aria-label="Download on the App Store"
          >
            Download
          </button>

          {/* Theme toggle */}
          <button className="btn btn-secondary theme-toggle" onClick={toggle} aria-pressed={theme === "dark"}>
            <span className="sun" aria-hidden="true">☀️</span>
            <span className="moon" aria-hidden="true">🌙</span>
            <span className="sr-only">{theme === "dark" ? "Switch to light" : "Switch to dark"}</span>
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section className="hero" ref={downloadSectionRef} id="download">
        <div className="hero-copy">
          <h1>Budgeting that fits your life.</h1>
          <p className="lead">
            Total Budget helps you stay on top of spending on your iPhone.
            Link your accounts with Plaid, import transaction screenshots,
            and let AI organize your budget categories—so you can focus on
            what matters.
          </p>
          <div className="cta-row">
            {/* Hero Download: immediate redirect */}
            <a
              className="btn btn-primary"
              href={APP_STORE_URL}
              onClick={(e) => { e.preventDefault(); goToStore("hero"); }}
              rel="noreferrer"
            >
              Download on the App&nbsp;Store
            </a>
            <a className="btn btn-secondary" href="#features">See how it helps</a>
          </div>
          <div className="social-proof">
            <span className="stars" aria-hidden="true">★★★★★</span>
            <span className="muted">4.9 average from 1 user</span>
          </div>
        </div>

        <div className="hero-art">
          {/* Click to upload a screenshot to replace the phone screen */}
          <div className="device" onClick={onPickScreenshot} title="Click to replace screen with your screenshot">
            <div className="notch" />
            <div className="screen">
              {screenSrc ? (
                <img className="screen-img" src={screenSrc} alt="Uploaded app screenshot" />
              ) : (
                <>
                  <div className="screen-header">
                    <span>Total Budget</span>
                    <span className="pill">iOS</span>
                  </div>
                  <div className="screen-list">
                    <div className="row">
                      <span>Whole Foods Market</span>
                      <strong>-$62.18</strong>
                    </div>
                    <div className="row">
                      <span>Uber Trip</span>
                      <strong>-$18.90</strong>
                    </div>
                    <div className="row">
                      <span>Rent Payment</span>
                      <strong>-$1,450.00</strong>
                    </div>
                    <div className="row">
                      <span>Spotify</span>
                      <strong>-$9.99</strong>
                    </div>
                    <div className="row">
                      <span>Direct Deposit</span>
                      <strong className="pos">+$2,500.00</strong>
                    </div>
                  </div>
                  <div className="screen-footer">
                    <span>This month</span>
                    <strong>$3,126.07</strong>
                  </div>
                </>
              )}
            </div>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={onFileChange}
          />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section">
        <h2>Why Total Budget</h2>
        <p className="section-lead">
          A clear view of your money with zero clutter. Built for iPhone from day one.
        </p>
        <div className="grid">
          <div className="card">
            <Icon>
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M3 5h18v14H3z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="8" cy="13" r="1.25" fill="currentColor"/>
                <circle cx="12" cy="13" r="1.25" fill="currentColor"/>
                <circle cx="16" cy="13" r="1.25" fill="currentColor"/>
              </svg>
            </Icon>
            <h3>Link accounts with Plaid</h3>
            <p>Connect major banks securely and see all transactions in one place.</p>
          </div>

          <div className="card">
            <Icon>
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M4 4h16v16H4z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M7 9h10M7 13h7" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </Icon>
            <h3>Import screenshots</h3>
            <p>Snap or upload transaction screenshots and get them organized fast.</p>
          </div>

          <div className="card">
            <Icon>
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </Icon>
            <h3>AI categories</h3>
            <p>Automatic labeling of spending into clear, customizable categories.</p>
          </div>

          <div className="card">
            <Icon>
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M4 7h16v10H4z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M10 11l2 2 4-4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </Icon>
            <h3>Designed for iOS</h3>
            <p>Fast, private, and native—made for the iPhone you already love.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="section">
        <h2>How it works</h2>
        <div className="steps">
          <div className="step">
            <span className="step-num">1</span>
            <div>
              <h4>Download</h4>
              <p>Install Total Budget from the App Store and sign in with Apple.</p>
            </div>
          </div>
          <div className="step">
            <span className="step-num">2</span>
            <div>
              <h4>Connect or import</h4>
              <p>Link accounts with Plaid or import screenshots to get your history.</p>
            </div>
          </div>
          <div className="step">
            <span className="step-num">3</span>
            <div>
              <h4>Let AI sort it</h4>
              <p>AI assigns categories so your budget is ready—no spreadsheets.</p>
            </div>
          </div>
        </div>

        {/* Centered CTA box */}
        <div className="center-wrap">
          <a
            className="btn btn-primary"
            href={APP_STORE_URL}
            onClick={(e) => { e.preventDefault(); goToStore("how"); }}
            rel="noreferrer"
          >
            Get the app
          </a>
        </div>
      </section>

      {/* Trust */}
      <section className="section trust">
        <div className="trust-grid">
          <div>
            <h3>Private by default</h3>
            <p className="muted">
              Your data stays yours. We use secure connections and give you clear controls
              to export or delete anytime.
            </p>
          </div>
          <div>
            <h3>Bank-grade security</h3>
            <p className="muted">
              Connections are powered by trusted providers and encrypted end-to-end.
            </p>
          </div>
          <div>
            <h3>Made for speed</h3>
            <p className="muted">
              Built for iOS performance—fast launch, smooth scrolling, tiny footprint.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section">
        <h2>FAQ</h2>
        <div className="faq">
          <details>
            <summary>Does Total Budget connect to my bank?</summary>
            <p>Yes. You can securely link accounts via Plaid within the iOS app.</p>
          </details>
          <details>
            <summary>Can I import past spending?</summary>
            <p>Yes. You can import screenshots and let AI assign categories.</p>
          </details>
          <details>
            <summary>Is my data private?</summary>
            <p>Yes. We prioritize privacy and provide export/delete options.</p>
          </details>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="brand small">
            <div className="logo">TB</div>
            <div className="brand-text">
              <span className="brand-title">Total Budget</span>
              <span className="brand-sub">for iOS</span>
            </div>
          </div>
          <div className="links">
            <a
              href={APP_STORE_URL}
              onClick={(e) => { e.preventDefault(); goToStore("footer"); }}
              rel="noreferrer"
            >
              Download
            </a>
            <a href="#features">Features</a>
            <a href="#faq">FAQ</a>
            <a href="privacy.html">Privacy</a>
          </div>
          <div className="copy muted">© {year} Total Budget</div>
        </div>
      </footer>
    </div>
  );
}
