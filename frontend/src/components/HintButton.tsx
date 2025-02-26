import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useHint } from '../hooks/useHint';

interface HintButtonProps {
  userId: string;
}

export const HintButton: React.FC<HintButtonProps> = ({ userId }) => {
  const { hint, loading, error, fetchHint } = useHint();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    // Fetch the hint and then open the dialog
    fetchHint({ userId });
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!loading && hint || error) {
      setOpen(true);
    }
  }, [hint, loading, error]);

  return (
    <>
      <Button variant="contained" onClick={handleClick} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Get Hint'}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Hint</DialogTitle>
        <DialogContent>
          {hint || error || 'No hint available.'}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};