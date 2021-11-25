import React, { useState, useEffect, useRef } from 'react';
import { Observable, fromEvent, interval } from 'rxjs';
import { map, buffer, debounceTime, filter } from 'rxjs/operators';

import Stopwatch from './Stopwatch';

import { GlobalStyles } from '../GlobalStyles';
import { StyledApp, StyledButtonsContainer, StyledButton } from './AppStyles';

import { setTimeFormat } from '../utils/helpers';

function App() {
  const buttonWaitRef = useRef();
  const [isStarted, setIsStarted] = useState(false);
  const [isReseted, setIsReseted] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (isReseted) {
      setIsReseted((prev) => !prev);
    }

    let stopwatchSubscription = new Observable().subscribe();
    let doubleClickSubscription = new Observable().subscribe();

    if (isStarted) {
      const mouse$ = fromEvent(buttonWaitRef.current, 'click');
      const buff$ = mouse$.pipe(debounceTime(300));
      const click$ = mouse$.pipe(
        buffer(buff$),
        map((list) => list.length),
        filter((x) => x === 2)
      );

      doubleClickSubscription = click$.subscribe(() =>
        setIsStarted((prev) => !prev)
      );

      stopwatchSubscription = interval(1000).subscribe(() =>
        setSeconds((prev) => prev + 1)
      );
    }

    return () => {
      stopwatchSubscription.unsubscribe();
      doubleClickSubscription.unsubscribe();
    };
  }, [isStarted, isReseted]);

  const startHandler = () => {
    setIsStarted(true);
  };

  const stopHandler = () => {
    setIsStarted(false);
    setSeconds(0);
  };

  const resetHandler = () => {
    setIsReseted(true);
    setSeconds(0);
  };

  return (
    <React.Fragment>
      <GlobalStyles />
      <StyledApp>
        <Stopwatch seconds={setTimeFormat(seconds)} />
        <StyledButtonsContainer>
          {!isStarted ? (
            <StyledButton onClick={startHandler} color="green">
              Start
            </StyledButton>
          ) : (
            <StyledButton onClick={stopHandler} color="red">
              Stop
            </StyledButton>
          )}
          <StyledButton ref={buttonWaitRef} color="orange">
            Wait
          </StyledButton>
          <StyledButton onClick={resetHandler}>Reset</StyledButton>
        </StyledButtonsContainer>
      </StyledApp>
    </React.Fragment>
  );
}

export default App;
