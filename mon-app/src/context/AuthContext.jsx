import { createContext, useContext, useReducer } from 'react';

const AuthStateContext = createContext(null);
const AuthDispatchContext = createContext(null);

const initialState = {
  user: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (user) => dispatch({ type: 'LOGIN', payload: user });
  const logout = () => dispatch({ type: 'LOGOUT' });

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={{ login, logout }}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

export function useAuth() {
  const state = useContext(AuthStateContext);
  const actions = useContext(AuthDispatchContext);

  if (state === undefined || actions === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return { ...state, ...actions };
}
