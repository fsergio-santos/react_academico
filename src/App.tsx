import Layout from "./components/layout/Layout";
import Lista from "./views/cidade/Lista";

function App() {
  return (
    <div>
      {/*
        Componente pai  - Layout
        Componente filho - Lista
      */}
      <Layout>
        <Lista /> {/* Lista - children */}
      </Layout>
    </div>
  );
}

export default App;
