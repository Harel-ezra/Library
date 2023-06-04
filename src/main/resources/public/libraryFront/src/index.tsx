import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { CacheProvider } from "@emotion/react";
import store from "./store";
import createCache from "@emotion/cache";

import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <CacheProvider value={cacheRtl}>
        <App />
     </CacheProvider> 
   </Provider>
);
