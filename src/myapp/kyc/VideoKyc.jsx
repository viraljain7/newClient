import React, { useRef, useState } from 'react';
import {
  Box, Typography, Button, Paper, Stack, Grid, Chip,
  LinearProgress, Alert
} from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import StoreIcon from '@mui/icons-material/Store';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import FaceIcon from '@mui/icons-material/Face';
import MicIcon from '@mui/icons-material/Mic';
import BadgeIcon from '@mui/icons-material/Badge';
import { updateDocs, updateProfile } from './helper/kycApi';
import toast from 'react-hot-toast';
import { startLoading, stopLoading } from '../../store/slices/loaderSlice';
import { useDispatch } from 'react-redux';

const STEP_CONSENT = 'consent';
const STEP_RECORD  = 'record';
const STEP_UPLOAD  = 'upload';
const STEP_DONE    = 'done';

function VideoKyc({ handleNext, user }) {
  const dispatch = useDispatch();

  // ── refs ──
  const videoInputRef = useRef(null);
  const shopInputRef  = useRef(null);

  // ── state ──
  const [step, setStep] = useState(STEP_CONSENT);

  // video upload
  const [videoFile,       setVideoFile]       = useState(null);
  const [videoFileName,   setVideoFileName]   = useState('');
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);

  // selfie (kept — still captured from uploaded video thumbnail or separate upload)
  const [selfieFile,     setSelfieFile]     = useState(null);
  const [selfieFileName, setSelfieFileName] = useState('');
  const [selfiePreview,  setSelfiePreview]  = useState(null);
  const selfieInputRef = useRef(null);

  // shop image
  const [shopImage,    setShopImage]    = useState(null);
  const [shopFileName, setShopFileName] = useState('');

  // ── handlers ──
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setVideoFile(file);
    setVideoFileName(file.name);
    setVideoPreviewUrl(URL.createObjectURL(file));
  };

  const handleSelfieUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelfieFile(file);
    setSelfieFileName(file.name);
    setSelfiePreview(URL.createObjectURL(file));
  };

  const handleShopUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setShopFileName(file.name);
    setShopImage(URL.createObjectURL(file));
  };

  const continueToShopImage = () => setStep(STEP_UPLOAD);

  // ── submit ──
  const handleVideoProofUpload = async () => {
    dispatch(startLoading());
    try {
      const shopImageFile = await (async () => {
        const res  = await fetch(shopImage);
        const blob = await res.blob();
        return new File([blob], 'shop_image.png', { type: blob.type });
      })();

      const payload = {
        user_id:          user?.id,
        type:             'uploaddocs',
        shop_image:       shopImageFile,
        merchant_video:   videoFile,
        merchant_selfie:  selfieFile,
      };

      const resp = await updateDocs(payload);
      if (resp?.statuscode !== 'TXN') {
        toast.error(resp?.message || 'Failed to update profile');
        return;
      }
      toast.success(resp?.message || 'Profile updated successfully');

      const profRes = await updateProfile({ user_id: user?.id, progress: 5 });
      if (profRes?.statuscode !== 'TXN') {
        toast.error(profRes?.message || 'Failed to update profile');
        return;
      }
      toast.success(profRes?.message || 'Profile updated successfully');
      handleNext();
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload video proof. Please try again.');
    } finally {
      dispatch(stopLoading());
    }
  };

  // ── progress ──
  const stepIndex = { [STEP_CONSENT]: 0, [STEP_RECORD]: 1, [STEP_UPLOAD]: 2, [STEP_DONE]: 3 };
  const progress  = (stepIndex[step] / 3) * 100;

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={0.5}>Video KYC Verification</Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Complete all 3 steps to verify your identity
      </Typography>

      {/* Progress */}
      <Box mb={3}>
        <Box display="flex" justifyContent="space-between" mb={0.5}>
          {['Consent', 'Upload Video & Selfie', 'Shop Image'].map((label, i) => (
            <Typography
              key={label} variant="caption"
              fontWeight={stepIndex[step] >= i ? 700 : 400}
              color={stepIndex[step] >= i ? 'primary' : 'text.disabled'}
            >
              {i + 1}. {label}
            </Typography>
          ))}
        </Box>
        <LinearProgress variant="determinate" value={progress} sx={{ borderRadius: 5, height: 6 }} />
      </Box>

      {/* ── STEP 1: CONSENT ── */}
      {step === STEP_CONSENT && (
        <Box>
          <Grid container spacing={1} mb={3}>
            {[
              { icon: <LightbulbOutlinedIcon fontSize="small" />, label: 'Well-lit area' },
              { icon: <FaceIcon fontSize="small" />,              label: 'Face visible' },
              { icon: <MicIcon fontSize="small" />,               label: 'Speak clearly' },
              { icon: <BadgeIcon fontSize="small" />,             label: 'Show ID to camera' },
            ].map(({ icon, label }) => (
              <Grid item key={label}>
                <Chip icon={icon} label={label} size="small" variant="outlined" sx={{ fontSize: 16 }} />
              </Grid>
            ))}
          </Grid>

          {/* English */}
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, mb: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'grey.200' }}>
            <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" mb={1} fontSize={20}>
              🇬🇧 ENGLISH — Read aloud on camera
            </Typography>
            <Typography variant="body2" lineHeight={1.8} fontSize={20}>
              "My name is <b>[Your Full Name]</b>, my Aadhaar number is <b>[Your Aadhaar]</b>. My PAN card number is <b>[Your PAN]</b>. I
              want to use AquaPay. I will ensure I collect all KYC documents from customers for every transaction. I take full
              responsibility for any fraudulent activity under my ID and will provide required documents for any chargebacks."
            </Typography>
          </Paper>

          {/* Hindi */}
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, mb: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'grey.200' }}>
            <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" mb={1} fontSize={20}>
              🇮🇳 हिंदी — ज़ोर से पढ़ें
            </Typography>
            <Typography variant="body2" lineHeight={1.8} fontSize={20}>
              "मेरा नाम <b>[आपका पूरा नाम]</b> है, मेरा आधार नंबर <b>[आपका आधार]</b> है। मेरा पैन कार्ड नंबर <b>[आपका पैन]</b> है। मैं
              AquaPay का उपयोग करना चाहता हूँ। मैं सुनिश्चित करूँगा कि प्रत्येक लेन-देन में ग्राहक से सभी केवाईसी दस्तावेज़ लूँ। मेरे आईडी
              के तहत किसी भी धोखाधड़ी की पूरी जिम्मेदारी मेरी होगी।"
            </Typography>
          </Paper>

          {/* Gujarati */}
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, mb: 3, bgcolor: 'grey.50', border: '1px solid', borderColor: 'grey.200' }}>
            <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" mb={1} fontSize={20}>
              🇮🇳 ગુજરાતી — જોરથી વાંચો
            </Typography>
            <Typography variant="body2" lineHeight={1.8} fontSize={20}>
              "મારું નામ <b>[તમારું પૂરું નામ]</b> છે, મારો આધાર નંબર <b>[તમારો આધાર નંબર]</b> છે. મારો પાન કાર્ડ નંબર{' '}
              <b>[તમારો પાન નંબર]</b> છે. હું AquaPay નો ઉપયોગ કરવા માંગું છું. હું ખાતરી કરીશ કે દરેક ટ્રાન્ઝેક્શનમાં ગ્રાહક પાસેથી તમામ
              KYC દસ્તાવેજો લઈશ. મારી ID હેઠળ થતી કોઈપણ છેતરપિંડી માટે સંપૂર્ણ જવાબદારી મારી રહેશે."
            </Typography>
          </Paper>

          <Button variant="contained" size="large" startIcon={<VideocamIcon />} onClick={() => setStep(STEP_RECORD)} fullWidth>
            Proceed to Upload Video
          </Button>
        </Box>
      )}

      {/* ── STEP 2: UPLOAD VIDEO & SELFIE ── */}
      {step === STEP_RECORD && (
        <Box>
          {videoFile && (
            <Alert icon={<CheckCircleIcon />} severity="success" sx={{ mb: 1.5, borderRadius: 2 }}>
              Video uploaded: {videoFileName}
            </Alert>
          )}
          {selfieFile && (
            <Alert icon={<CheckCircleIcon />} severity="success" sx={{ mb: 1.5, borderRadius: 2 }}>
              Selfie uploaded: {selfieFileName}
            </Alert>
          )}

          {/* Video upload zone */}
          <Typography variant="subtitle2" fontWeight={600} mb={1}>
            Consent Video
          </Typography>
          <Box
            onClick={() => videoInputRef.current.click()}
            sx={{
              border: '2px dashed',
              borderColor: videoFile ? 'success.main' : 'grey.300',
              borderRadius: 3, p: 3, textAlign: 'center', cursor: 'pointer', mb: 2,
              bgcolor: videoFile ? 'success.50' : 'grey.50',
              '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.50' },
            }}
          >
            {videoFile
              ? <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              : <VideocamIcon sx={{ fontSize: 40, color: 'grey.400', mb: 1 }} />
            }
            <Typography variant="body2" fontWeight={600} color={videoFile ? 'success.dark' : 'text.primary'}>
              {videoFileName || 'Click to upload consent video'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {videoFile ? 'Tap to change video' : 'MP4, MOV or WEBM'}
            </Typography>
          </Box>
          <input
            ref={videoInputRef} type="file" accept="video/*"
            style={{ display: 'none' }} onChange={handleVideoUpload}
          />

        

          {/* Selfie upload zone */}
          <Typography variant="subtitle2" fontWeight={600} mb={1}>
            Selfie Photo
          </Typography>
          <Box
            onClick={() => selfieInputRef.current.click()}
            sx={{
              border: '2px dashed',
              borderColor: selfieFile ? 'success.main' : 'grey.300',
              borderRadius: 3, p: 3, textAlign: 'center', cursor: 'pointer', mb: 2,
              bgcolor: selfieFile ? 'success.50' : 'grey.50',
              '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.50' },
            }}
          >
            {selfieFile
              ? <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              : <CameraAltIcon sx={{ fontSize: 40, color: 'grey.400', mb: 1 }} />
            }
            <Typography variant="body2" fontWeight={600} color={selfieFile ? 'success.dark' : 'text.primary'}>
              {selfieFileName || 'Click to upload selfie photo'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {selfieFile ? 'Tap to change photo' : 'JPG or PNG'}
            </Typography>
          </Box>
          <input
            ref={selfieInputRef} type="file" accept="image/*"
            style={{ display: 'none' }} onChange={handleSelfieUpload}
          />

        
          <Button
            variant="contained" size="large" endIcon={<ArrowForwardIcon />}
            disabled={!videoFile || !selfieFile}
            onClick={continueToShopImage} fullWidth
          >
            Continue to Shop Image
          </Button>
        </Box>
      )}

      {/* ── STEP 3: SHOP IMAGE ── */}
      {step === STEP_UPLOAD && (
        <Box>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Upload a clear photo of your shop front or business premises.
          </Typography>

          <Box
            onClick={() => shopInputRef.current.click()}
            sx={{
              border: '2px dashed',
              borderColor: shopImage ? 'success.main' : 'grey.300',
              borderRadius: 3, p: 4, textAlign: 'center', cursor: 'pointer', mb: 2,
              bgcolor: shopImage ? 'success.50' : 'grey.50',
              '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.50' },
            }}
          >
            {shopImage
              ? <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              : <StoreIcon sx={{ fontSize: 40, color: 'grey.400', mb: 1 }} />
            }
            <Typography variant="body2" fontWeight={600} color={shopImage ? 'success.dark' : 'text.primary'}>
              {shopFileName || 'Click to upload shop photo'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {shopImage ? 'Tap to change image' : 'JPG or PNG, max 10MB'}
            </Typography>
          </Box>
          <input ref={shopInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleShopUpload} />

          <Paper elevation={0} sx={{ p: 2, borderRadius: 3, bgcolor: 'grey.50', border: '1px solid', borderColor: 'grey.200', mb: 3 }}>
            <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" mb={1}>
              SUBMISSION CHECKLIST
            </Typography>
            <Stack spacing={1}>
              {[
                { label: 'Consent video uploaded',  done: !!videoFile,  icon: <VideocamIcon fontSize="small" /> },
                { label: 'Selfie photo uploaded',    done: !!selfieFile, icon: <CameraAltIcon fontSize="small" /> },
                { label: 'Shop image uploaded',      done: !!shopImage,  icon: <StoreIcon fontSize="small" /> },
              ].map(({ label, done, icon }) => (
                <Box key={label} display="flex" alignItems="center" gap={1}>
                  {done
                    ? <CheckCircleIcon fontSize="small" color="success" />
                    : React.cloneElement(icon, { sx: { color: 'text.disabled' } })
                  }
                  <Typography variant="body2" color={done ? 'text.primary' : 'text.disabled'}>
                    {label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Paper>

          <Button
            variant="contained" size="large" endIcon={<ArrowForwardIcon />}
            disabled={!shopImage} onClick={handleVideoProofUpload} fullWidth
          >
            Submit & Continue
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default VideoKyc;