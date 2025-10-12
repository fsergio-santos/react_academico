import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AlertProvider from "./contexto/AlertContexto";
import { routes } from "./services/router/Routes";

const router = createBrowserRouter(routes);

function App() {
  return (
    <div>
      <AlertProvider>
        <RouterProvider router={router} />
      </AlertProvider>
    </div>
  );
}

export default App;
