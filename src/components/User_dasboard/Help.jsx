import React from 'react';
import './Help.css';

function Help() {
  return (
    <div className="help-page-container">
      <header className="help-header">
        <h1 className="help-title">Need Assistance? We're Here to Help!</h1>
        <p className="help-subtitle">Reach out to us for any queries or support.</p>
      </header>

      <main className="help-main-content">
        <section className="help-contact-section">
          <h2 className="help-section-title">Contact Information</h2>
          <p className="help-text">Feel free to contact us through the following channels:</p>
          <ul className="help-contact-list">
            <li className="help-contact-item">Email: <a className="help-contact-link" href="rajasurya2006rjs@gmail.com">rajasurya2006rjs@gmail.com</a></li>
            <li className="help-contact-item">Phone: <a className="help-contact-link" href="tel:+91 8610536041">+91 8610536041</a></li>
            <li className="help-contact-item">47/11, Velankani Drive, Doddathogur Rd, opposite Velankani Tech park, next to SJR EQUINOX, Electronics City Phase 1, Electronic City, Bengaluru, Karnataka 560100</li>
          </ul>
        </section>

        <section className="help-form-section">
          <h2 className="help-section-title">Send Us a Message</h2>
          <form className="help-form">
            <div className="help-form-group">
              <label className="help-label" htmlFor="name">Name</label>
              <input className="help-input" type="text" id="name" name="name" placeholder="Your Name" required />
            </div>
            <div className="help-form-group">
              <label className="help-label" htmlFor="email">Email</label>
              <input className="help-input" type="email" id="email" name="email" placeholder="Your Email" required />
            </div>
            <div className="help-form-group">
              <label className="help-label" htmlFor="message">Message</label>
              <textarea className="help-textarea" id="message" name="message" placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button className="help-submit-button" type="submit">Submit</button>
          </form>
        </section>
      </main>

    </div>
  );
}

export default Help;