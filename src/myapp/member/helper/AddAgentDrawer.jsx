import { Drawer, Box, Card, CardContent, Typography, IconButton, TextField, Button, Autocomplete } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { createAgent } from './memberApi';

function AddAgentDrawer({ open, onClose, agentCode, states }) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    mobile: '',
    state: '',
    city: '',
    role_id: ''
  });

useEffect(() => {
  if (agentCode) {
    setForm((prev) => ({
      ...prev,
      role_id: agentCode
    }));
  }
}, [agentCode]);

  const handleSubmit = async () => {
    try {
      console.log(form, agentCode);
      const res = await createAgent(form);
      console.log(res);

      if (res?.statuscode === 'TXN') {
        toast.success(res.message);
        setForm({
          name: '',
          company: '',
          email: '',
          mobile: '',
          state: '',
          city: ''
        });
        onClose();
      } else {
        toast.error(res?.message);
      }
    } catch (e) {
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
                Add Agent
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
              <TextField label="Person Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

              {/* Company */}
              <TextField label="Company Name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />

              {/* Email */}
              <TextField label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />

              {/* Mobile */}
              <TextField
                label="Mobile"
                value={form.mobile}
                onChange={(e) => {
                  const val = e.target.value;
                  if (!/^\d*$/.test(val)) return;
                  setForm({ ...form, mobile: val });
                }}
              />
          <Autocomplete
  options={states}
  getOptionLabel={(option) => option?.name || ""}

  value={states.find((s) => s.name === form.state) || null}

  onChange={(e, val) =>
    setForm({
      ...form,
      state: val?.name || null       })
  }

  isOptionEqualToValue={(option, value) => option.name === value.name}

  renderInput={(params) => (
    <TextField {...params} label="Select State" />
  )}
/>

              {/* City */}
              <TextField label="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />

              {/* Submit */}
              <Button variant="contained" sx={{ mt: 1, height: 45 }} onClick={handleSubmit}>
                Add Agent
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Drawer>
  );
}

export default AddAgentDrawer;
