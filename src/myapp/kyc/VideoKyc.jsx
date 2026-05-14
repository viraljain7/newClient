import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, Paper, Stack, Grid, Chip, LinearProgress, Alert } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import StoreIcon from '@mui/icons-material/Store';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import FaceIcon from '@mui/icons-material/Face';
import MicIcon from '@mui/icons-material/Mic';
import BadgeIcon from '@mui/icons-material/Badge';

// ─── STEP CONSTANTS ───────────────────────────────────────────
const STEP_CONSENT = 'consent';
const STEP_RECORD = 'record';
const STEP_UPLOAD = 'upload';
const STEP_DONE = 'done';

function VideoKyc({ handleNext }) {
  // ── refs ──
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const shopInputRef = useRef(null);
  const timerIntervalRef = useRef(null); // NEW — store interval so we can clear it

  // ── state ──
  const [step, setStep] = useState(STEP_CONSENT);
  const [stream, setStream] = useState(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [shopImage, setShopImage] = useState(null);
  const [shopFileName, setShopFileName] = useState('');

  // =========================================
  // STOP CAMERA  ← NEW
  // =========================================
  const stopCamera = () => {
    // Stop all media tracks
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }

    // Clear the video element
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current.load();
    }

    // Clear any running timer
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    setCameraStarted(false);
    setIsRecording(false);
    setSeconds(60);
  };

  // =========================================
  // STOP RECORDING  ← NEW
  // =========================================
  const stopRecording = () => {
    // Stop the MediaRecorder if it is active
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    // Clear the countdown timer
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    setIsRecording(false);
  };

  // =========================================
  // OPEN CAMERA
  // =========================================
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: true
      });
      setStream(mediaStream);
      const video = videoRef.current;
      if (video) {
        video.srcObject = mediaStream;
        video.onloadedmetadata = async () => {
          try {
            await video.play();
          } catch (err) {
            console.log(err);
          }
        };
      }
      setCameraStarted(true);
    } catch (error) {
      console.log(error);
      alert('Camera access denied. Please allow camera & microphone permissions.');
    }
  };

  // =========================================
  // START RECORDING
  // =========================================
  const startRecording = async () => {
    if (!stream || !videoRef.current) return;
    try {
      const previewStream = stream;
      const recordingStream = previewStream.clone();
      const chunks = [];
      const mediaRecorder = new MediaRecorder(recordingStream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setRecordedVideo(URL.createObjectURL(blob));
        recordingStream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorder.start(1000);
      videoRef.current.srcObject = previewStream;
      await videoRef.current.play();
      setIsRecording(true);

      let timer = 60;
      setSeconds(timer);
      const interval = setInterval(() => {
        timer--;
        setSeconds(timer);
        if (timer <= 0) {
          clearInterval(interval);
          mediaRecorder.stop();
          setIsRecording(false);
        }
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================================
  // CAPTURE PHOTO
  // =========================================
  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    setCapturedImage(canvas.toDataURL('image/png'));
  };

  // =========================================
  // SHOP IMAGE UPLOAD
  // =========================================
  const handleShopUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setShopFileName(file.name);
    setShopImage(URL.createObjectURL(file));
  };

  // =========================================
  // CLEANUP — runs on unmount
  // =========================================
  useEffect(() => {
    return () => {
      stopCamera(); // cleans up stream + interval on unmount
    };
  }, []);

  const continueToShopImage = () => {
    setStep(STEP_UPLOAD);
    stopCamera();
  };

  // ── progress map ──
  const stepIndex = { [STEP_CONSENT]: 0, [STEP_RECORD]: 1, [STEP_UPLOAD]: 2, [STEP_DONE]: 3 };
  const progress = (stepIndex[step] / 3) * 100;

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <Box>
      {/* ── Header ── */}
      <Typography variant="h5" fontWeight={700} mb={0.5}>
        Video KYC Verification
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Complete all 3 steps to verify your identity
      </Typography>

      {/* ── Progress Bar ── */}
      <Box mb={3}>
        <Box display="flex" justifyContent="space-between" mb={0.5}>
          {['Consent', 'Record & Capture', 'Shop Image'].map((label, i) => (
            <Typography
              key={label}
              variant="caption"
              fontWeight={stepIndex[step] >= i ? 700 : 400}
              color={stepIndex[step] >= i ? 'primary' : 'text.disabled'}
            >
              {i + 1}. {label}
            </Typography>
          ))}
        </Box>
        <LinearProgress variant="determinate" value={progress} sx={{ borderRadius: 5, height: 6 }} />
      </Box>

      {/* ══════════════════════════════════════
          STEP 1 — CONSENT
      ══════════════════════════════════════ */}
      {step === STEP_CONSENT && (
        <Box>
          {/* Instruction chips */}
          <Grid container spacing={1} mb={3}>
            {[
              { icon: <LightbulbOutlinedIcon fontSize="small" />, label: 'Well-lit area' },
              { icon: <FaceIcon fontSize="small" />, label: 'Face visible' },
              { icon: <MicIcon fontSize="small" />, label: 'Speak clearly' },
              { icon: <BadgeIcon fontSize="small" />, label: 'Show ID to camera' }
            ].map(({ icon, label }) => (
              <Grid item key={label}>
                <Chip icon={icon} label={label} size="small" variant="outlined" sx={{ fontSize: 16 }} />
              </Grid>
            ))}
          </Grid>

          {/* English consent */}
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

          {/* Hindi consent */}
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, mb: 3, bgcolor: 'grey.50', border: '1px solid', borderColor: 'grey.200' }}>
            <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" mb={1} fontSize={20}>
              🇮🇳 हिंदी — ज़ोर से पढ़ें
            </Typography>
            <Typography variant="body2" lineHeight={1.8} fontSize={20}>
              "मेरा नाम <b>[आपका पूरा नाम]</b> है, मेरा आधार नंबर <b>[आपका आधार]</b> है। मेरा पैन कार्ड नंबर <b>[आपका पैन]</b> है। मैं
              AquaPay का उपयोग करना चाहता हूँ। मैं सुनिश्चित करूँगा कि प्रत्येक लेन-देन में ग्राहक से सभी केवाईसी दस्तावेज़ लूँ। मेरे आईडी
              के तहत किसी भी धोखाधड़ी की पूरी जिम्मेदारी मेरी होगी।"
            </Typography>
          </Paper>
          {/* Gujarati consent */}
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              mb: 3,
              bgcolor: 'grey.50',
              border: '1px solid',
              borderColor: 'grey.200'
            }}
          >
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
            Proceed to Record Video
          </Button>
        </Box>
      )}

      {/* ══════════════════════════════════════
          STEP 2 — RECORD & CAPTURE
      ══════════════════════════════════════ */}
      {step === STEP_RECORD && (
        <Box>
          {/* Success alerts */}
          {recordedVideo && (
            <Alert icon={<CheckCircleIcon />} severity="success" sx={{ mb: 1.5, borderRadius: 2 }}>
              Video recorded successfully (60 seconds)
            </Alert>
          )}
          {capturedImage && (
            <Alert icon={<CheckCircleIcon />} severity="success" sx={{ mb: 1.5, borderRadius: 2 }}>
              Selfie captured successfully
            </Alert>
          )}

          {/* Camera preview */}
          <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden', bgcolor: '#000', mb: 2 }}>
            {!cameraStarted && (
              <Box sx={{ height: 450, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <VideocamIcon sx={{ fontSize: 48, color: '#555' }} />
                <Typography color="grey.500" variant="body2">
                  Camera preview will appear here
                </Typography>
              </Box>
            )}

            {!capturedImage && (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                disablePictureInPicture
                controls={false}
                style={{
                  width: '100%',
                  height: cameraStarted ? 450 : 0,
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            )}

            {/* REC badge */}
            {isRecording && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.75,
                  bgcolor: 'rgba(0,0,0,0.6)',
                  borderRadius: 5,
                  px: 1.5,
                  py: 0.5
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'error.main',
                    animation: 'blink 1s infinite',
                    '@keyframes blink': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.2 } }
                  }}
                />
                <Typography variant="caption" color="#fff" fontWeight={700}>
                  REC
                </Typography>
              </Box>
            )}

            {/* Timer badge */}
            {isRecording && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  bgcolor: 'rgba(0,0,0,0.6)',
                  borderRadius: 5,
                  px: 1.5,
                  py: 0.5
                }}
              >
                <Typography variant="caption" color="error.light" fontWeight={700}>
                  {seconds}s
                </Typography>
              </Box>
            )}
          </Box>

          {/* Hidden canvas */}
          {!capturedImage && <canvas ref={canvasRef} style={{ display: 'none' }} />}

          {/* Captured selfie preview */}
          {capturedImage && (
            <Box mb={2} sx={{ borderRadius: 3, overflow: 'hidden', border: '2px solid', borderColor: 'success.light' }}>
              <img
                src={capturedImage}
                alt="Captured selfie"
                style={{ width: '100%', display: 'block', maxHeight: 450, objectFit: 'cover' }}
              />
            </Box>
          )}

          {/* Action buttons */}
          <Stack spacing={1.5}>
            {!cameraStarted && (
              <Button variant="contained" size="large" startIcon={<VideocamIcon />} onClick={startCamera} fullWidth>
                Open Camera
              </Button>
            )}

            {cameraStarted && !isRecording && !recordedVideo && (
              <Button
                variant="contained"
                size="large"
                color="error"
                startIcon={<RadioButtonCheckedIcon />}
                onClick={startRecording}
                fullWidth
              >
                Start Recording (60s)
              </Button>
            )}

            {isRecording && (
              <Button variant="outlined" color="error" size="large" disabled fullWidth>
                Recording… {seconds}s remaining
              </Button>
            )}

            {recordedVideo && !capturedImage && (
              <Button variant="contained" size="large" startIcon={<CameraAltIcon />} onClick={capturePhoto} fullWidth>
                Capture Selfie Photo
              </Button>
            )}

            {capturedImage && (
              <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} onClick={continueToShopImage} fullWidth>
                Continue to Shop Image
              </Button>
            )}
          </Stack>
        </Box>
      )}

      {/* ══════════════════════════════════════
          STEP 3 — SHOP IMAGE UPLOAD
      ══════════════════════════════════════ */}
      {step === STEP_UPLOAD && (
        <Box>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Upload a clear photo of your shop front or business premises.
          </Typography>

          {/* Upload zone */}
          <Box
            onClick={() => shopInputRef.current.click()}
            sx={{
              border: '2px dashed',
              borderColor: shopImage ? 'success.main' : 'grey.300',
              borderRadius: 3,
              p: 4,
              textAlign: 'center',
              cursor: 'pointer',
              mb: 2,
              transition: 'all 0.2s',
              bgcolor: shopImage ? 'success.50' : 'grey.50',
              '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.50' }
            }}
          >
            {shopImage ? (
              <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
            ) : (
              <StoreIcon sx={{ fontSize: 40, color: 'grey.400', mb: 1 }} />
            )}
            <Typography variant="body2" fontWeight={600} color={shopImage ? 'success.dark' : 'text.primary'}>
              {shopFileName || 'Click to upload shop photo'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {shopImage ? 'Tap to change image' : 'JPG or PNG, max 10MB'}
            </Typography>
          </Box>

          <input ref={shopInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleShopUpload} />

          {/* Submission summary */}
          <Paper elevation={0} sx={{ p: 2, borderRadius: 3, bgcolor: 'grey.50', border: '1px solid', borderColor: 'grey.200', mb: 3 }}>
            <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" mb={1}>
              SUBMISSION CHECKLIST
            </Typography>
            <Stack spacing={1}>
              {[
                { label: '60-second video consent', done: !!recordedVideo, icon: <VideocamIcon fontSize="small" /> },
                { label: 'Selfie photo captured', done: !!capturedImage, icon: <CameraAltIcon fontSize="small" /> },
                { label: 'Shop image uploaded', done: !!shopImage, icon: <StoreIcon fontSize="small" /> }
              ].map(({ label, done, icon }) => (
                <Box key={label} display="flex" alignItems="center" gap={1}>
                  {done ? (
                    <CheckCircleIcon fontSize="small" color="success" />
                  ) : (
                    React.cloneElement(icon, { sx: { color: 'text.disabled' } })
                  )}
                  <Typography variant="body2" color={done ? 'text.primary' : 'text.disabled'}>
                    {label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Paper>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              disabled={!shopImage}
              onClick={() => {
                handleNext();
              }}
              sx={{ flex: 2 }}
            >
              Submit & Continue
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
}

export default VideoKyc;
