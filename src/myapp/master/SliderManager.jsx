import React, { useRef, useState } from 'react';
import {
  Box, Typography, Button, Paper, Stack,
  IconButton, LinearProgress, Chip
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ImageIcon from '@mui/icons-material/Image';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { startLoading, stopLoading } from '../../store/slices/loaderSlice';
import toast from 'react-hot-toast';
import { uploadSlider } from './helper/sliderManager';
import { useDispatch } from 'react-redux';

function SliderManager() {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]); // [{ file, preview, id }]
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleSelect = (e) => {
    const selected = Array.from(e.target.files);
    if (!selected.length) return;
    const newFiles = selected.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    setUploaded(false);
    // reset input so same file can be re-added
    e.target.value = '';
  };

  const handleRemove = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setUploaded(false);
  };
  const dispatch=useDispatch();

const handleUpload = async () => {
  if (!files.length) return;
  dispatch(startLoading());
  setUploading(true);
  try {
    const resp = await uploadSlider(files.map((f) => f.file));

    if (resp.status) {
      toast.success(resp?.message || 'Slider images uploaded successfully');
      setUploaded(true);
    } else {
      toast.error(resp?.message || 'Upload failed');
    }
  } catch (err) {
    console.error(err);
    toast.error('Something went wrong. Please try again.');
  } finally {
    setUploading(false);
    dispatch(stopLoading());
  }
};
  const handleClear = () => {
    setFiles([]);
    setUploaded(false);
  };

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Rupay UPI QR
          </Typography>
         
        </Box>
        {files.length > 0 && (
          <Chip
            label={`${files.length} image${files.length > 1 ? 's' : ''} selected`}
            color="primary"
            variant="outlined"
            size="small"
          />
        )}
      </Stack>

      {/* Upload zone */}
      <Box
        onClick={() => !uploading && inputRef.current.click()}
        sx={{
          border: '2px dashed',
          borderColor: uploaded ? 'success.main' : files.length ? 'primary.main' : 'grey.300',
          borderRadius: 3,
          p: 5,
          textAlign: 'center',
          cursor: uploading ? 'not-allowed' : 'pointer',
          bgcolor: uploaded ? 'success.50' : files.length ? 'primary.50' : 'grey.50',
          transition: 'all 0.2s',
          '&:hover': !uploading
            ? { borderColor: 'primary.main', bgcolor: 'primary.50' }
            : {},
        }}
      >
        {uploaded ? (
          <CheckCircleIcon sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
        ) : files.length ? (
          <AddPhotoAlternateIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
        ) : (
          <CloudUploadIcon sx={{ fontSize: 48, color: 'grey.400', mb: 1 }} />
        )}

        <Typography variant="body1" fontWeight={600} color={uploaded ? 'success.dark' : files.length ? 'primary.dark' : 'text.primary'}>
          {uploaded
            ? 'Uploaded successfully!'
            : files.length
            ? 'Click to add more images'
            : 'Click to select slider images'}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          PNG, JPG, WEBP supported · Multiple files allowed
        </Typography>
      </Box>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        onChange={handleSelect}
      />

      {/* Upload progress */}
      {uploading && (
        <Box mt={2}>
          <LinearProgress sx={{ borderRadius: 5, height: 6 }} />
          <Typography variant="caption" color="text.secondary" mt={0.5} display="block" textAlign="center">
            Uploading...
          </Typography>
        </Box>
      )}

      {/* Image previews */}
      {files.length > 0 && (
        <Box mt={2}>
          <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" mb={1}>
            SELECTED IMAGES
          </Typography>
          <Stack spacing={1.5}>
            {files.map(({ id, file, preview }) => (
              <Paper
                key={id}
                elevation={0}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 1.5,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: uploaded ? 'success.light' : 'grey.200',
                  bgcolor: uploaded ? 'success.50' : '#fff',
                }}
              >
                {/* Thumbnail */}
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 2,
                    overflow: 'hidden',
                    flexShrink: 0,
                    bgcolor: 'grey.100',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={preview}
                    alt={file.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </Box>

                {/* File info */}
                <Box flex={1} minWidth={0}>
                  <Typography variant="body2" fontWeight={600} noWrap>
                    {file.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {(file.size / 1024).toFixed(1)} KB
                  </Typography>
                </Box>

                {/* Status / Remove */}
                {uploaded ? (
                  <CheckCircleIcon fontSize="small" color="success" />
                ) : (
                  <IconButton
                    size="small"
                    onClick={(e) => { e.stopPropagation(); handleRemove(id); }}
                    disabled={uploading}
                    sx={{ color: 'error.main' }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                )}
              </Paper>
            ))}
          </Stack>
        </Box>
      )}

      {/* Action buttons */}
      {files.length > 0 && (
        <Stack direction="row" spacing={2} mt={3}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleClear}
            disabled={uploading}
            sx={{ flex: 1 }}
          >
            Clear All
          </Button>
          <Button
            variant="contained"
            size="large"
            startIcon={<CloudUploadIcon />}
            onClick={handleUpload}
            disabled={uploading || uploaded}
            sx={{ flex: 2 }}
          >
            {uploading ? 'Uploading...' : uploaded ? 'Uploaded ✓' : `Upload ${files.length > 1 ? `${files.length} Images` : 'Image'}`}
          </Button>
        </Stack>
      )}
    </Box>
  );
}

export default SliderManager;