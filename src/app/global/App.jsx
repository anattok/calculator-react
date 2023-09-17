import React from "react";
import "./styles/global.css";
import { Input } from "../../components/Input/Input";
import { Container } from "../../layout/Container/Container";

function App() {
  return (
    <div className="App">
      <Container>
        <h1>Кредитный калькулятор</h1>
        <form className="form" action="#">
          <div className="wrapper">
            <div className="wrapper__top">
              <Input initialValue="10000" label="Ставка" type="text" />
            </div>
            <div className="wrapper__bottom"></div>
          </div>
          <div className="calculation"></div>
        </form>
      </Container>
    </div>
  );
}

export default App;
