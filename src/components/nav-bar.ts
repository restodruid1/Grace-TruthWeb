class NavBar extends HTMLElement {
  connectedCallback() {
    const filename = window.location.pathname.split('/').pop() || 'index.html'

    const active = (page: string) =>
      filename === page || (page === 'index.html' && filename === '') ? 'active' : ''

    this.innerHTML = `
      <nav class="nav">
        <div class="nav__inner">
          <a href="./index.html" class="nav__logo">
            <span class="nav__logo-name">Grace &amp; Truth Chapel</span>
            <span class="nav__logo-tagline">San Diego, CA</span>
          </a>
          <button class="nav__hamburger" aria-label="Toggle navigation menu">
            <span></span><span></span><span></span>
          </button>
          <ul class="nav__links">
            <li><a href="./index.html"          class="${active('index.html')}">Home</a></li>
            <li><a href="./about.html"          class="${active('about.html')}">About</a></li>
            <li><a href="./what-to-expect.html" class="${active('what-to-expect.html')}">What to Expect</a></li>
            <li><a href="./contact.html"        class="nav__cta ${active('contact.html')}">Contact Us</a></li>
          </ul>
        </div>
      </nav>
    `

    const hamburger = this.querySelector<HTMLButtonElement>('.nav__hamburger')
    const navLinks  = this.querySelector<HTMLElement>('.nav__links')

    hamburger?.addEventListener('click', () => {
      hamburger.classList.toggle('open')
      navLinks?.classList.toggle('open')
    })

    navLinks?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger?.classList.remove('open')
        navLinks.classList.remove('open')
      })
    })
  }
}

customElements.define('nav-bar', NavBar)
