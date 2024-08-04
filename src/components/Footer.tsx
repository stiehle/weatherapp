import "./Footer.scss";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer__links">
          <a href="#">Impressum</a>
          <a href="#">Datenschutzerklärung</a>
          <a href="#">www.stiehle.de</a>
        </div>
        <div className="footer__copyright">
          <p>&copy;2024 www.stiehle.de</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
