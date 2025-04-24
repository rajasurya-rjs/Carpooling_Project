import React from 'react';
import './Help.css';

function Help() {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission (no page redirect)
    
    // Show the success alert
    alert('We have received your message. We will contact you within 24 hours.');
    
    // Allow the form to be submitted via Formsubmit
    const form = e.target;
    form.submit(); // This triggers the Formsubmit form action and sends the email
  };

  return (
    <>
      <div className="help-page">
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
                <li className="help-contact-item">Email: <a className="help-contact-link" href="mailto:rajasurya2006rjs@gmail.com">rajasurya2006rjs@gmail.com</a></li>
                <li className="help-contact-item">Phone: <a className="help-contact-link" href="tel:+918610536041">+91 8610536041</a></li>
                <li className="help-contact-item">47/11, Velankani Drive, Doddathogur Rd, opposite Velankani Tech park, next to SJR EQUINOX, Electronics City Phase 1, Electronic City, Bengaluru, Karnataka 560100</li>
              </ul>
            </section>

            <section className="help-form-section">
              <h2 className="help-section-title">Send Us a Message</h2>
              <form
                className="help-form"
                action="https://formsubmit.co/rajasurya2006rjs@gmail.com"
                method="POST"
                onSubmit={handleSubmit}
              >
                {/* Optional: Disable captcha */}
                <input type="hidden" name="_captcha" value="false" />

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
      </div>
    </>
  );
}

export default Help;
