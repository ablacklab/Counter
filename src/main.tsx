import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/styles.css";
import AppRoutes from "./Routes/Routes.tsx";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>
);
