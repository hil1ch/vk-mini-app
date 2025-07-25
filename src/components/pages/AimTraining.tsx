import React, { useState, useEffect, useCallback, useRef } from "react";
import { Trophy } from "lucide-react";
import {
  Button,
  Title,
  ButtonGroup,
  Paragraph,
  Headline,
} from "@vkontakte/vkui";
import { formatTime } from "../../utils";
import { Icon12ClockOutline } from "@vkontakte/icons";
import ClickSpark from "../ui/ClickSpark";
import Particles from "../ui/Particles";

interface Circle {
  id: number;
  x: number;
  y: number;
  size: number;
}

type GameScreen = "selectTime" | "game" | "result";

const AimTraining: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>("selectTime");
  const [selectedTime, setSelectedTime] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [nextCircleId, setNextCircleId] = useState<number>(1);

  const boardRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const selectTime = (time: number) => {
    setSelectedTime(time);
    setTimeLeft(time);
    setScore(0);
    setCircles([]);
    setCurrentScreen("game");
    setGameActive(true);
    startTimer();
  };

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          finishGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const finishGame = () => {
    setGameActive(false);
    setCircles([]);
    setCurrentScreen("result");

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const createRandomCircle = useCallback(() => {
    if (!boardRef.current || !gameActive) return;

    const board = boardRef.current;
    const boardRect = board.getBoundingClientRect();
    const size = Math.round(Math.random() * (65 - 10) + 10);
    const x = Math.round(Math.random() * (boardRect.width - size));
    const y = Math.round(Math.random() * (boardRect.height - size));

    const newCircle: Circle = {
      id: nextCircleId,
      x,
      y,
      size,
    };

    setCircles([newCircle]);
    setNextCircleId((prev) => prev + 1);
  }, [gameActive, nextCircleId]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCircleClick = (_id?: number) => {
    setScore((prev) => prev + 1);
    setCircles([]);
    createRandomCircle();
  };

  const resetGame = () => {
    setCurrentScreen("selectTime");
    setScore(0);
    setTimeLeft(0);
    setCircles([]);
    setGameActive(false);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (gameActive && boardRef.current && circles.length === 0) {
      createRandomCircle();
    }
  }, [gameActive, createRandomCircle, circles.length]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <ClickSpark>
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
          backgroundColor: "#2A2254",
        }}
      >
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
          }}
        >
          <div className="w-full mx-auto">
            {/* Time Selection Screen */}
            {currentScreen === "selectTime" && (
              <div style={{ textAlign: "center" }}>
                <Title
                  style={{
                    textAlign: "center",
                    marginBottom: "30px",
                    fontSize: "30px",
                    color: "#fff",
                  }}
                >
                  Выберите время
                </Title>

                <ButtonGroup
                  mode="horizontal"
                  gap="s"
                  style={{ margin: "0 auto" }}
                >
                  {[10, 20, 30].map((time) => (
                    <Button
                      key={time}
                      size="l"
                      hasActive={true}
                      before={<Icon12ClockOutline />}
                      onClick={() => selectTime(time)}
                    >
                      {time} сек
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
            )}

            {/* Game Screen */}
            {currentScreen === "game" && (
              <div style={{ color: "#fff" }}>
                <div style={{ textAlign: "center", marginBottom: "10px" }}>
                  <Title>
                    Осталось{" "}
                    <span className="text-game-primary">
                      {formatTime(timeLeft)}
                    </span>
                  </Title>
                </div>

                <div
                  ref={boardRef}
                  style={{
                    position: "relative",
                    width: "90%",
                    margin: "0 auto",
                    height: "24rem",
                    borderRadius: "0.5rem",
                    overflow: "hidden",
                    minHeight: "400px",
                    border: "2px solid #fff",
                    backgroundColor: "#1E1A40",
                  }}
                >
                  {circles.map((circle) => (
                    <div
                      key={circle.id}
                      style={{
                        position: "absolute",
                        background: "linear-gradient(90deg, #ff33cc, #5555ff)",
                        borderRadius: "9999px",
                        cursor: "pointer",
                        boxShadow: "0 0 15px rgba(255, 0, 204, 0.5) ",
                        transition: "all 200ms",
                        animation: "pop-in 200ms ease-out",
                        width: `${circle.size}px`,
                        height: `${circle.size}px`,
                        left: `${circle.x}px`,
                        top: `${circle.y}px`,
                      }}
                      onClick={() => handleCircleClick(circle.id)}
                    />
                  ))}
                </div>
                <div
                  style={{
                    textAlign: "center",
                    margin: "0 auto",
                    marginTop: "10px",
                  }}
                >
                  <Headline style={{ fontSize: "20px" }}>
                    Счет:{" "}
                    <span className="text-game-success font-bold">{score}</span>
                  </Headline>
                </div>
              </div>
            )}

            {/* Result Screen */}
            {currentScreen === "result" && (
              <div style={{ textAlign: "center", color: "#fff" }}>
                <Trophy
                  style={{
                    width: "50px",
                    height: "50px",
                    margin: "0 auto",
                    marginBottom: "10px",
                  }}
                />

                <Title style={{ fontSize: "30px", marginBottom: "25px" }}>
                  Игра окончена!
                </Title>

                <div
                  style={{
                    backgroundColor: "#1E1A40",
                    marginBottom: "25px",
                    border: "1px solid #fff",
                    borderRadius: "0.5rem",
                    padding: "2rem",
                    maxWidth: "28rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Title style={{marginBottom: '8px'}}>
                    Счет: {score}
                  </Title>
                  <Paragraph style={{marginBottom: '8px'}}>
                    Время: {selectedTime} секунд
                  </Paragraph>
                  <Paragraph>
                    Точность:{" "}
                    {selectedTime > 0 ? (score / selectedTime).toFixed(1) : "0"}{" "}
                    попаданий/сек
                  </Paragraph>
                </div>

                <div>
                  <Button size="l" onClick={resetGame}>
                    Играть снова
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ClickSpark>
  );
};

export default AimTraining;
