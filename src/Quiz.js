/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Map from "./Map";
import { apiCall } from "./util/apiCall";
import { useScore } from "./util/score-context";

const wrapper = css`
  margin: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 100px 100px 1fr;
  grid-template-areas: "hint1 hint2 hint3" "hint4 hint5 hint6" "map map map";
  grid-gap: 1rem;
`;
const hint = css`
  display: flex;
  align-items: center;
  > h3 {
    margin: 0 20px;
  }
`;
const hint1 = css`
  ${hint};
  grid-area: hint1;
`;
const hint2 = css`
  ${hint};
  grid-area: hint2;
`;
const hint3 = css`
  ${hint};
  grid-area: hint3;
`;
const hint4 = css`
  ${hint};
  grid-area: hint4;
`;
const hint5 = css`
  ${hint};
  grid-area: hint5;
`;
const hint6 = css`
  ${hint};
  grid-area: hint6;
`;

const Quiz = () => {
  const [selectedCountry, setSelected] = useState({});
  const { dispatch } = useScore();
  const [confetti, showConfetti] = useState(false);

  useEffect(() => {
    apiCall("randomCountry").then(setSelected);
  }, []);

  const onSelect = (_, code) => {
    if (code === selectedCountry.alpha2Code) {
        // correct
      showConfetti(true);
      dispatch({ type: "add", score: 1, code: selectedCountry.alpha2Code });
      setTimeout(() => {
        showConfetti(false);
        apiCall("randomCountry").then(setSelected);
      }, 1500);
    } else {
        // wrong
      dispatch({ type: "add", score: 0, code: selectedCountry.alpha2Code });
      apiCall("randomCountry").then(setSelected);
    }
  };

  return (
    <main css={wrapper}>
      <div css={hint1}>
        <h3>Navn</h3>
        {selectedCountry.name}
      </div>
      <div css={hint2}>
        <h3>Hovedstad</h3>
        {selectedCountry.capital}
      </div>
      <div css={hint3}>
        <h3>Antall innbyggere</h3>
        {selectedCountry.population}
      </div>
      <div css={hint4}>
        <h3>Flagg</h3>
        <img src={selectedCountry.flag} alt="flagg" width="auto" height={100} />
      </div>
      <div css={hint5}>
        <h3>Hovedspråk</h3>
        {selectedCountry.languages?.[0].name}
      </div>
      <div css={hint6}>
        <h3>Areal</h3>
        {selectedCountry.area}
      </div>
      <Map onSelect={onSelect} />
      {confetti && (
        <Confetti
          gravity={1}
          recycle={false}
          height={(window.innerHeight / 4) * 3}
          confettiSource={{ x: window.innerWidth / 4, y: 100, w: window.innerWidth / 2, h: 10 }}
          numberOfPieces={200}
          initialVelocityY={{ min: 30, max: 100 }}
        />
      )}
    </main>
  );
};

export default Quiz;
