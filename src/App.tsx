import React from "react";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import ListarEmpresas from "./pages/ListarEmpresas";
import CadastrarEmpresas from "./pages/CadastrarEmpresas";
import Header from "./components/Header";
import { GlobalStorage } from "./Context";
import EditarEmpresa from "./pages/EditarEmpresa";

function App() {
  return (
    <GlobalStorage>
      <BrowserRouter>
        <CssBaseline />
        <Header />
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/listar" component={ListarEmpresas} />
            <Route path="/cadastrar" component={CadastrarEmpresas} />
            <Route path="/edit/:id" component={EditarEmpresa} />
          </Switch>
        </main>
      </BrowserRouter>
    </GlobalStorage>
    // <ThemeProvider theme={Theme}>

    // </ThemeProvider>
  );
}

export default App;
