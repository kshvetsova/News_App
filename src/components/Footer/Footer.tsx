import './Footer.scss';

export const Footer = () => (
  <footer className="Footer">
    <p className="Footer-Copyright">
      <strong>News App</strong>
      &nbsp;2024 copyright all rights reserved
    </p>
    <div className="Footer-Socials">
      <a href="http://insagram.com" className="Footer-Instagram socials">
        {}
      </a>
      <a href="http://twitter.com" className="Footer-Twitter socials">{}</a>
      <a href="http://linkedin.com" className="Footer-LinkedIn socials">{}</a>
    </div>
  </footer>
)