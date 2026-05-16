import { useEffect, useState } from 'react';

import { Button, Grid, MenuItem } from '@mui/material';

import { CustomInput, TabPanel } from '../UserProfile';
import toast from 'react-hot-toast';

function ParentMapping({ tab, userDetails, getUserParents, handleUpdateParent }) {
  const [parents, setParents] = useState([]);

  const [parentId, setParentId] = useState('');

  useEffect(() => {
    if (userDetails?.id) {
      loadParents();
    }
  }, [userDetails]);

  useEffect(() => {
    if (userDetails?.parent_id) {
      setParentId(userDetails?.parent_id);
    }
  }, [userDetails]);

  const loadParents = async () => {
    try {
      const res = await getUserParents({
        user_id: userDetails?.id
      });

      setParents(res?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!parentId) {
        toast.error('Please select parent');
        return 
      }

  const res=    await handleUpdateParent({
        user_id: userDetails?.id,
        parent_id: parentId
      });

      toast.success(res?.message || 'Parent mapping updated successfully');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TabPanel value={tab} index={5}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomInput select label="Select Parent" value={parentId} onChange={(e) => setParentId(e.target.value)}>
            {parents?.map((parent) => (
              <MenuItem key={parent?.id} value={parent?.id}>
                {parent?.name}
              </MenuItem>
            ))}
          </CustomInput>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            Save Mapping
          </Button>
        </Grid>
      </Grid>
    </TabPanel>
  );
}

export default ParentMapping;
