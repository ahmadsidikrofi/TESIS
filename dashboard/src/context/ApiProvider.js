'use client'

import React, { createContext, useContext } from 'react';
import NetWorkError from '@/libs/api-libs';

const ErrorContext = createContext();

export const ApiProvider = ({ children }) => {
  return (
    <ErrorContext.Provider value={{ axios: NetWorkError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useFlowbeatApi = () => {
  return useContext(ErrorContext);
};
