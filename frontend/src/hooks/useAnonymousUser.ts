// packages/frontend/src/hooks/useAnonymousUser.ts
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useAnonymousUser = () => {
  const [userId] = useState<string>(() => {
    let storedUserId = localStorage.getItem('userId');
    
    if (!storedUserId) {
      storedUserId = uuidv4();
      localStorage.setItem('userId', storedUserId);
    }

    return storedUserId;
  });

  return userId;
};

export default useAnonymousUser;