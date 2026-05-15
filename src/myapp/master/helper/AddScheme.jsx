import { Drawer, Box, Card, CardContent, Typography, IconButton, TextField, Button, Autocomplete } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useSchemeManager from './useSchmeManager';

function AddScheme({ open, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: ''
  });

  const { createScheme } = useSchemeManager();

  const handleSubmit = async () => {
    try {
      const res = await createScheme(form);
      if (res?.statuscode === 'TXN') {
        toast.success(res.message);
        setForm({
          name: ''
        });
        onSuccess && onSuccess();
        onClose();
      } else {
        toast.error(res?.message);
      }
    } catch (e) {
      console.log(e);
      toast.error('Something went wrong');
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, height: '100%' }}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            {/* 🔹 Header */}
            <Box position="relative" mb={3}>
              <Typography fontWeight={700} fontSize={18}>
                Add Scheme
              </Typography>

              <IconButton
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* 🔹 Form */}
            <Box display="flex" flexDirection="column" gap={2}>
              {/* Name */}
              <TextField label="Scheme Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

              {/* Submit */}
              <Button variant="contained" sx={{ mt: 1, height: 45 }} onClick={handleSubmit}>
                Add Scheme
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Drawer>
  );
}

export default AddScheme;
