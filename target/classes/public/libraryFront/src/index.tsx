import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { CacheProvider } from "@emotion/react";
import store, { persistor } from "./store";
import createCache from "@emotion/cache";
import { PersistGate } from "redux-persist/integration/react";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import LibraryTheme from "./LibraryTheme.tsx";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <CacheProvider value={cacheRtl}>
      <PersistGate loading={null} persistor={persistor}>
        <LibraryTheme />
      </PersistGate>
    </CacheProvider>
  </Provider>
);
