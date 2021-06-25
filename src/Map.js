/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useRef, useState } from "react";
import { VectorMap } from "react-jvectormap";

import { useScore } from "./util/score-context";

const wrapperStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  height: 60vh;
  grid-area: map;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 20px;
  box-shadow: -10px 10px 10px #cccccc;
  position: relative;
`;
const countryNum = css`
  position: absolute;
  top: 0;
  right: 0;
`;

const Map = ({ onSelect }) => {
  const [excluded, setExcluded] = useState([]);
  const ref = useRef(null);
  const { state } = useScore();
  const nonErrorCountries = state.countries.filter((c) => !excluded.find((e) => e === c));

  useEffect(() => {
    if (ref.current !== "null") {
      try {
        const map = ref.current.getMapObject();
        map.setSelectedRegions(nonErrorCountries);
      } catch (e) {
        console.log(e);
        setExcluded([...excluded, state.countries[state.countries.length - 1]]);
      }
    }
  }, [nonErrorCountries]);

  return (
    <div css={wrapperStyle}>
      <VectorMap
        map={"world_mill"}
        backgroundColor="#3b96ce"
        containerStyle={{
          width: "100%",
          height: "100%",
        }}
        ref={ref}
        containerClassName="map"
        onRegionClick={onSelect}
        onRegionTipShow={(e) => e.preventDefault()}
      />
      <div css={countryNum}>{`(${state.countries.length} / 250)`}</div>
    </div>
  );
};

export default Map;
