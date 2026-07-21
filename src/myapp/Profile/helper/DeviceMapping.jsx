import { useEffect, useState } from "react";
import { Button, Grid, IconButton } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import toast from "react-hot-toast";

import { CustomInput, TabPanel } from "../UserProfile";

function DeviceMapping({
  tab,
  userDetails,
  updateMidForUser,
  linkMidForUser,
  getMidForUser,
}) {
  const [mids, setMids] = useState([
    {
      id: "0",
      mid: "",
    },
  ]);

  // ================= Fetch MIDs =================
  const fetchUserMid = async (retailerId) => {
    try {
      const res = await getMidForUser({
        retailer_id: retailerId,
      });


      if (res?.statuscode === "TXN") {
        if (res.data?.length) {
          setMids(
            res.data.map((item) => ({
              id: item.id,
              mid: item.mid || "",
            }))
          );
        } else {
          setMids([
            {
              id: "0",
              mid: "",
            },
          ]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userDetails?.id) {
      fetchUserMid(userDetails.id);
    }
  }, [userDetails?.id]);

  // ================= Change MID =================
  const handleChange = (index, value) => {
    const updated = [...mids];
    updated[index].mid = value;
    setMids(updated);
  };

  // ================= Add MID =================
  const handleAddMid = () => {
    if (mids.length >= 5) {
      toast.error("Maximum 5 MIDs allowed");
      return;
    }

    setMids([
      ...mids,
      {
        id: "0",
        mid: "",
      },
    ]);
  };

  // ================= Remove MID =================
  const handleRemove = (index) => {
    const updated = mids.filter((_, i) => i !== index);

    if (updated.length === 0) {
      updated.push({
        id: "0",
        mid: "",
      });
    }

    setMids(updated);
  };

  // ================= Save =================
  const handleSubmit = async () => {

    try {
      for (const item of mids) {
        if (!item.mid.trim()) continue;
        // Existing MID
        if (item.id && item.id !== "0") {
          await updateMidForUser({
            id: item.id,
            retailer_id: userDetails.id,
            mid: item.mid,
          });
        }
        // New MID
        else {
          
          await linkMidForUser({
            retailer_id: userDetails.id,
            mid: item.mid,
          });
        }
      }

      toast.success("MIDs saved successfully");

      fetchUserMid(userDetails.id);
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <TabPanel value={tab} index={6}>
      <Grid container spacing={2}>
        {mids.map((item, index) => (
          <Grid size={{ xs: 12, md: 6 }} key={item.id || index}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div style={{ flex: 1 }}>
                <CustomInput
                  label={`Device MID ${index + 1}`}
                  placeholder="Enter Device MID"
                  value={item.mid || ""}
                  onChange={(e) =>
                    handleChange(index, e.target.value)
                  }
                />
              </div>

              {mids.length > 1 && (
                <IconButton
                  color="error"
                  onClick={() => handleRemove(index)}
                >
                  <Delete />
                </IconButton>
              )}
            </div>
          </Grid>
        ))}

        <Grid size={{ xs: 12 }}>
          {mids.length < 5 && (
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={handleAddMid}
              sx={{ mr: 2 }}
            >
              Add MID
            </Button>
          )}

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Save MIDs
          </Button>
        </Grid>
      </Grid>
    </TabPanel>
  );
}

export default DeviceMapping;