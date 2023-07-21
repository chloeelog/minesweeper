import { Provider } from "react-redux";
import { store } from "@store";

import { Board } from "@components/Board";

import * as S from "./App.style";

function App() {
  return (
    <Provider store={store}>
      <S.Page>
        <Board />
      </S.Page>
    </Provider>
  );
}

export default App;
