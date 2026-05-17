class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer__grid">
            <div>
              <p class="footer__brand-name">Grace &amp; Truth Chapel</p>
              <p class="footer__brand-desc">A community of faith rooted in the grace and truth of Jesus Christ. All are welcome at the table.</p>
            </div>
            <div>
              <p class="footer__heading">Quick Links</p>
              <ul class="footer__links">
                <li><a href="./index.html">Home</a></li>
                <li><a href="./about.html">About</a></li>
                <li><a href="./what-to-expect.html">What to Expect</a></li>
                <li><a href="./contact.html">Contact</a></li>
              </ul>
            </div>
            <div>
              <p class="footer__heading">Contact</p>
              <div class="footer__contact-item">
                <span class="footer__contact-icon">📍</span>
                <span>4677 Ohio St, San Diego, CA 92116</span>
              </div>
              <div class="footer__contact-item">
                <span class="footer__contact-icon">📞</span>
                <span>(555) 000-0000</span>
              </div>
              <div class="footer__contact-item">
                <span class="footer__contact-icon">✉️</span>
                <span>info@graceandtruthchapel.org</span>
              </div>
            </div>
          </div>
          <hr class="footer__divider" />
          <div class="footer__bottom">
            <span>&copy; 2026 Grace and Truth Chapel. All rights reserved.</span>
            <span>Built with love for the community.</span>
          </div>
        </div>
      </footer>
    `
  }
}

customElements.define('site-footer', SiteFooter)
