import "98.css";
import ButtonConnectWallet from "../components/ButtonConnectWallet";
import "./globals.css";
import styles from "./styles.module.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <ButtonConnectWallet className={styles.buttonWalletConnect} />
        {children}
        <footer>
          <p>Netproof is a Fotura, Inc. company</p>
          <p>© 1998 Fotura</p>
        </footer>
      </body>
    </html>
  );
}
