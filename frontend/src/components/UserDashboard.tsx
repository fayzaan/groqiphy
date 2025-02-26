import { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Card, CardContent, Button, Box } from '@mui/material';
import useGameState from '../hooks/useGameState'; // Hook that listens for stage & timer updates
import useUserState from '../hooks/useUserState'; // Hook for overall user state (optional)
import { useSocketContext } from '../context/SocketContext';
import { Timer } from './Timer';
import { HintButton } from './HintButton';

const UserDashboard: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const { currentStage: stage } = useGameState();
  const userState = useUserState(); // If you want to display additional user info
  const socket = useSocketContext();

  const handleOptionClick = (optionId: string) => {
    // Emit the chosen option to the server
    socket.emit("userAction", { optionId });
  };

  const startGame = () => {
    socket.emit("startGame");
    setIsStarted(true);
  };

  console.log("stage", stage);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Data Lockdown Simulation</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Card variant="outlined">
          <CardContent>
            {
              isStarted ? (
                <>
                  <Typography variant="h5">
                    {stage ? stage.title : "Loading Stage..."}
                  </Typography>
                  <Typography variant="body1" sx={{ my: 2 }}>
                    {stage ? stage.description : "Please wait..."}
                  </Typography>
                  {
                    stage && stage.id !== "complete" && stage.id !== "failure" ? (
                      userState && userState.userId && <HintButton userId={userState.userId} />
                    ) : null
                  }
                  {
                    stage && stage.id !== "complete" && stage.id !== "failure" ? (
                      <Typography variant="h6" color="error">
                        Time Left: <Timer />
                      </Typography>
                    ) : null
                  }
                </>
              ) : null
            }
            {
              !isStarted ? (
                <>
                  <Typography variant="h5">
                    Welcome to the Data Lockdown Simulation
                  </Typography>
                  <Typography variant="body1" sx={{ my: 2 }}>
                    Please click the button below to start the simulation.
                  </Typography>
                  <Button variant="contained" onClick={startGame}>
                    Start
                  </Button>
                </>
              ) : null
            }
            <Box sx={{ mt: 3 }}>
              {stage && stage.options && stage.options.map((option) => (
                <Button
                  key={option.id}
                  variant="contained"
                  sx={{ mr: 2, mb: 1 }}
                  onClick={() => handleOptionClick(option.id)}
                >
                  {option.text}
                </Button>
              ))}
            </Box>
          </CardContent>
        </Card>
        {/* Optionally, display user state information */}
        {userState && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="body2">
              User ID: {userState.userId} | Current Stage: {userState.currentStage}
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
};

export default UserDashboard;