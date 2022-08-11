import React from "react";
import footer from "./Footer.module.css"

function Footer() {
  const date = new Date().getFullYear();
  return(
    <footer className={footer.footer}>
      <p className={footer.copyright}>{date} &#169; Все права и планеты защищены</p>
    </footer>
  )
}

export default Footer;