import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@store";
import { Row } from "@design-system";

export const Timer = () => {
  const [time, setTime] = useState(0);
  const { gameState, startsAt } = useSelector(
    (state: RootState) => state.gameSlice
  );

  const displayTime = formatSeconds(time);

  useEffect(() => {
    if (gameState === "ready") {
      setTime(0);
      return;
    }

    if (gameState !== "playing" || !startsAt) {
      return;
    }

    const interval = setInterval(() => {
      const diff = Date.now() - startsAt;
      const diffInSeconds = Math.floor(diff / 1000);

      setTime(diffInSeconds);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [gameState, startsAt]);

  return (
    <Row gap="0.25rem">
      <span role="img" aria-label="timer">
        ⏰
      </span>
      {displayTime}
    </Row>
  );
};

function formatSeconds(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const restSeconds = seconds - hours * 3600 - minutes * 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${restSeconds
      .toString()
      .padStart(2, "0")}`;
  }
  return `${minutes.toString().padStart(2, "0")}:${restSeconds
    .toString()
    .padStart(2, "0")}`;
}
