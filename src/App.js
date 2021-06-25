/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Footer from "./Footer";
import Header from "./Header";
import Quiz from "./Quiz";
import { ScoreProvider } from "./util/score-context";

const wrapperStyle = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function App() {
  return (
    <ScoreProvider>
      <div css={wrapperStyle}>
        <Header />
        <Quiz />
        <Footer />
      </div>
    </ScoreProvider>
  );
}

export default App;
