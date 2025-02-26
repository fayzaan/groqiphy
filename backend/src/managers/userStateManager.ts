export type UserState = {
  userId: string;
  currentStage: string;
  timer: number;
  history: string[];
  // Add additional properties as needed (e.g., score, progress, etc.)
};

const userStates = new Map<string, UserState>();

export const getUserState = (userId: string): UserState | undefined => {
  return userStates.get(userId);
};

export const createUserState = (userId: string): UserState => {
  const initialState: UserState = {
    userId,
    currentStage: "stage1",
    timer: 0,
    history: [],
  };
  userStates.set(userId, initialState);
  return initialState;
};

export const getOrCreateUserState = (userId: string): UserState => {
  let state = userStates.get(userId);

  if (!state) {
    state = createUserState(userId);
  }
  
  return state;
};

export const updateUserState = (userId: string, newState: Partial<UserState>): boolean => {
  const currentState = userStates.get(userId);
  if (!currentState) return false;

  const updatedState = { ...currentState, ...newState };
  userStates.set(userId, updatedState);
  return true;
};

export const removeUserState = (userId: string): boolean => {
  return userStates.delete(userId);
};

export const updateUserHistory = (userId: string, action: string): boolean => {
  const currentState = userStates.get(userId);
  if (!currentState) return false;

  currentState.history.push(action);

  console.log('updateUserHistory', currentState.history);

  userStates.set(userId, currentState);
  return true;
};