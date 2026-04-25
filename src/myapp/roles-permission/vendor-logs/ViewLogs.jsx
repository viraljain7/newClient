import * as React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// 🔥 Safe JSON parser
const parseJSON = (data) => {
  try {
    return typeof data === "string" ? JSON.parse(data) : data;
  } catch {
    return data;
  }
};

// 🔥 Pretty JSON Viewer
const JsonViewer = ({ data }) => (
  <Box
    sx={{
      background: "#0d1117",
      color: "#c9d1d9",
      p: 2,
      borderRadius: 2,
      fontSize: "0.75rem",
      overflow: "auto",
      maxHeight: 400,
      fontFamily: "monospace",
    }}
  >
    <pre>{JSON.stringify(parseJSON(data), null, 2)}</pre>
  </Box>
);

export default function ViewLogs({ data }) {
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState(0);

  const handleChange = (_, newValue) => setTab(newValue);

  return (
    <>
      <Button size="small" variant="outlined" onClick={() => setOpen(true)}>
        View Logs
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          API Log Details
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: 10, top: 10 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>

          {/* 🔥 Basic Info */}
          <Box mb={2}>
            <Typography variant="h6" fontWeight={600}>
              <b>ID: {data.id}</b>
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              <b>URL: {data.url}</b>
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              <b>Method: {data.method}</b>
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              <b>Status: {data.status_code}</b>
            </Typography>
          </Box>

          {/* 🔥 Tabs */}
          <Tabs value={tab} onChange={handleChange}>
            <Tab label="Headers" />
            <Tab label="Request" />
            <Tab label="Response" />
          </Tabs>

          {/* 🔥 Tab Content */}
          <Box mt={2}>
            {tab === 1 && <JsonViewer data={data.request_data} />}
            {tab === 2 && <JsonViewer data={data.response_data} />}
            {tab === 0 && <JsonViewer data={data.header} />}
          </Box>

        </DialogContent>
      </Dialog>
    </>
  );
}