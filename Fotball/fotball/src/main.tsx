// (START) main.tsx – rotfil som starter React-appen

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Global CSS + Tailwind-import

// Lager en "root" for hele React-appen og render App-komponenten inni.
// Dette er standard oppsett fra Vite + React-malen.
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // React.StrictMode brukes mest for å oppdage feil under utvikling.
  // Det er ikke noe vi har jobbet mye med i pensum, men det kommer fra malen.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// (SLUTT) main.tsx
