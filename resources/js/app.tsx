import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ThemeProvider } from "@/Providers/ThemeProvider";
import { StrictMode } from "react";

const appName = import.meta.env.VITE_APP_NAME || "Blog";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob("./Pages/**/*.tsx"),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <StrictMode>
        <ThemeProvider>
          <App {...props} />
        </ThemeProvider>
      </StrictMode>,
    );
  },
  progress: {
    color: "#4B5563",
  },
});
