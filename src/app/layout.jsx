import React from "react";
import Image from "next/image";
import Script from "next/script";

import congratulations from "../assets/congratulations.png";
import { HomePage } from "../components/home-page";
import { MiroSDKInit } from "../components/SDKInit";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Script
          src="https://miro.com/app/static/sdk/v2/miro.js"
          strategy="beforeInteractive"
        />
        <MiroSDKInit />
        <div id="root">
          <div className="grid">
              {children}
          </div>
        </div>
      </body>
    </html>
  );
}
