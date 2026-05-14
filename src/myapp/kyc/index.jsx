import * as React from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  Box,
  Paper,
  IconButton
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import ContactDetails from './ContactDetails';
import AadharCard from './AadharCard';
import PanCard from './PanCard';
import BankDetails from './BankDetails';
import VideoKyc from './VideoKyc';
import Agreement from './Agreement';
import Completed from './Completed';
import { useSelector } from 'react-redux';

// ==============================|| STEPS ||============================== //

const steps = [
  {
    label: 'Contact Details',
    component: ContactDetails
  },
  {
    label: 'Aadhar Card',
    component: AadharCard
  },
  {
    label: 'PAN Card',
    component: PanCard
  },
  {
    label: 'Bank Details',
    component: BankDetails
  },
  {
    label: 'Video KYC',
    component: VideoKyc
  },
  {
    label: 'Agreement',
    component: Agreement
  },
  {
    label: 'Completed',
    component: Completed
  }
];

// ==============================|| MAIN COMPONENT ||============================== //

export default function VerticalKycDialogStepper() {
  const [open, setOpen] = React.useState(true);
  const [activeStep, setActiveStep] = React.useState(4);

  const user = useSelector((state) => state?.user?.profile);

  // Disable backdrop + esc close
  const handleClose = (_, reason) => {
    if (reason === 'backdropClick') return;
    if (reason === 'escapeKeyDown') return;
  };

  // Next Step
  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  // Previous Step
  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  // Reset
  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Dialog open={open} fullScreen disableEscapeKeyDown onClose={handleClose}>
      {/* Header */}
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '20px',
          fontWeight: 'bolder'
        }}
      >
        Complete Your KYC
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Body */}
      <DialogContent dividers>
        <Box sx={{ maxWidth: '100%' }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => {
              // Dynamic Component
              const StepComponent = step.component;

              return (
                <Step key={step.label}>
                  <StepLabel
                    optional={index === steps.length - 1 ? <Typography variant="caption">Final Step</Typography> : null}
                    sx={{
                      '& .MuiStepLabel-label': {
                        fontSize: '18px',
                        fontWeight: 'bold'
                      }
                    }}
                  >
                    {step.label}
                  </StepLabel>

                  <StepContent>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        border: '1px solid',
                        borderColor: 'divider',
                        mt: 1
                      }}
                    >
                      {/* Dynamic Component Render */}
                      <StepComponent
                        handleNext={handleNext}
                        handleBack={handleBack}
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        index={index}
                        totalSteps={steps.length}
                        handleReset={handleReset}
                        user={user}
                      />
                    </Paper>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
