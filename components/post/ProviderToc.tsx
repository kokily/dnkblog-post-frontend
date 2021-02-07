import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { parseHeader } from '../../libs/toc';

export type Toc = ReturnType<typeof parseHeader>;
type SetToc = {
  type: 'SET_TOC';
  payload: Toc;
};

type ProviderTocState = {
  toc: null | Toc;
};

type Action = SetToc;

const ProviderTocStateContext = createContext<ProviderTocState>(null);
const ProviderTocDispatchContext = createContext<Dispatch<Action>>(null);

function reducer(state: ProviderTocState, action: Action): ProviderTocState {
  switch (action.type) {
    case 'SET_TOC':
      return {
        ...state,
        toc: action.payload,
      };
    default:
      throw new Error('Action Type invalid');
  }
}

export function useProviderTocState() {
  const state = useContext(ProviderTocStateContext);

  if (!state) {
    throw new Error('Not wrapped with ProviderToc');
  }

  return state;
}

export function useProviderTocDispatch() {
  const dispatch = useContext(ProviderTocDispatchContext);

  if (!dispatch) {
    throw new Error('Not wrapped with ProviderToc');
  }

  return dispatch;
}

function ProviderToc({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    toc: null,
  });

  return (
    <ProviderTocStateContext.Provider value={state}>
      <ProviderTocDispatchContext.Provider value={dispatch} children={children} />
    </ProviderTocStateContext.Provider>
  );
}

export default ProviderToc;
