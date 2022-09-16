import React, { useContext, useMemo, createContext, useCallback, useState } from 'react';
import {
  isMathOperation,
  getMathSymbol,
  getResult,
  isAfterGetResult,
  isANewOperation,
  removeLastNumber,
  operations,
} from '../helpers';

const CalculatorContext = createContext(null);

export function useCalculatorContext() {
  const context = useContext(CalculatorContext);

  if (!context) {
    throw new Error('CalculatorProvider must be present to use useCalculatorContext');
  }

  return context;
}

const INITIAL_STATE = {
  current: 0,
  previous: null,
  operation: null,
};

export function CalculatorProvider({ children }) {
  const [values, setValues] = useState(INITIAL_STATE);

  const handleOperation = (operation) => {
    //debugger;
    const mathOperation = isMathOperation(operation);
    if (mathOperation) {
      if (operation === 'percent') {
        return setValues((prev) => ({
          ...prev,
          current: operations.percent(prev.current),
        }));
      }
      //debugger;
      if (!values.previous) {
        return setValues({
          previous: values.current,
          current: 0,
          operation,
        });
      } else {
        //TODO: check resta sin previo
        return setValues((prev) => {
          //debugger;
          //TODO: refactor this
          return {
            previous: isNaN(prev.previous)
              ? prev.current
              : prev.operation !== operation
              ? getResult(prev.current, prev.previous, prev.operation)
              : getResult(prev.previous, prev.current, prev.operation),
            current: 0,
            operation,
          };
        });
      }
    }

    switch (operation) {
      case 'clean':
        setValues(INITIAL_STATE);
        break;
      case 'equal':
        setValues(({ previous, current, operation }) => ({
          previous: `${previous} ${getMathSymbol(operation)} ${current}`,
          current: getResult(current, previous, operation),
        }));
        break;
      case 'delete':
        setValues((prev) => ({
          ...prev,
          current: removeLastNumber(prev.current),
        }));
        break;
      default:
        console.log(operation);
        break;
    }
  };

  const doAction = useCallback(
    (key) => {
      if (isNaN(key.value)) {
        //Except on '.' '%'
        handleOperation(key.value);
        return;
      }

      setValues((v) => {
        //Is after get a  result
        if (isAfterGetResult(v)) return { ...INITIAL_STATE, current: key.value };
        //Is first value
        if (isANewOperation(v)) return { ...v, current: key.value };
        //Contains previous values inserted
        return { ...v, current: key.value + v.current * 10 };
      });

      console.log('key', key);
    },
    [values],
  );

  const value = useMemo(
    () => ({
      previous: values.previous,
      current: values.current,
      doAction,
    }),
    [values],
  );

  return <CalculatorContext.Provider value={value}>{children}</CalculatorContext.Provider>;
}
