import { useState, useMemo } from 'react';

import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';

const Agreement = ({ handleNext }) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const user = useSelector((state) => state?.user?.profile);

  // ==============================
  // Agreement Config
  // ==============================

  const agreementConfig = useMemo(() => {
    const normalizedRole = user?.role?.name?.toLowerCase() || 'agent';

    if (normalizedRole.includes('master')) {
      return {
        title: 'AquaPay Master Distributor Agreement',
        intro: 'Master Distributor Agreement',
        role: 'Master Distributor',
        legalClause:
          '(which expression shall, unless repugnant to the context or meaning thereof, mean and include its successors, legal representatives, and permitted assigns)'
      };
    }

    if (normalizedRole.includes('distributor')) {
      return {
        title: 'AquaPay Distributor Agreement',
        intro: 'Distributor Agreement',
        role: 'Distributor',
        legalClause: ''
      };
    }

    return {
      title: 'AquaPay Agent Agreement',
      intro: 'Agent Agreement',
      role: 'Agent',
      legalClause: ''
    };
  }, [user]);

  // ==============================
  // User Details
  // ==============================

  const userDetails = useMemo(
    () => ({
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      place: user?.address || 'Not specified',
      fullName: user?.name || 'Not specified',
      mobileNumber: user?.mobile || 'Not specified'
    }),
    [user]
  );

  // ==============================
  // PDF Styles
  // ==============================

  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: 'Helvetica',
      fontSize: 11,
      lineHeight: 1.6
    },

    title: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
      fontWeight: 'bold',
      textDecoration: 'underline'
    },

    clause: {
      marginBottom: 10,
      textAlign: 'justify'
    },

    boldText: {
      fontWeight: 'bold'
    },

    userDetails: {
      marginTop: 30,
      borderTop: '1px solid #000',
      paddingTop: 20
    },

    footer: {
      marginTop: 30,
      fontSize: 10,
      textAlign: 'center'
    }
  });

  // ==============================
  // Agreement Clauses
  // ==============================

  const agreementClauses = [
    '1. I hereby undertake to use Payment Gateway services with my "user ID" only after agreeing to the online agreement on AquaPay portal.',
    '2. I hereby declare that I will use my own Credit Card/Debit Card/Net banking/UPI only.',
    '3. In case of any chargeback or fraud transaction claim, AquaPay reserves the right to recover the amount.',
    '4. AquaPay may suspend settlement during suspicious activities.',
    '5. I agree to use services only for legal business purposes.',
    '6. I will not tamper, hack, or misuse the services.',
    '7. AquaPay shall not be liable for any damages arising from misuse.',
    '8. I confirm all information provided by me is correct.',
    '9. I do not have any criminal background.',
    '10. This declaration is made voluntarily and knowingly.'
  ];

  // ==============================
  // PDF Component
  // ==============================

  const AgreementPDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Title */}

        <Text style={styles.title}>{agreementConfig.title}</Text>

        {/* Intro */}

        <Text style={styles.clause}>
          <Text style={styles.boldText}>This {agreementConfig.intro} ("Agreement")</Text> is made on this {userDetails.date} by and between:
        </Text>

        {/* Company */}

        <Text style={styles.clause}>
          <Text style={styles.boldText}>AquaPay</Text>, a company incorporated under the Companies Act, 2013, hereinafter referred to as the
          "Company".
        </Text>

        {/* AND */}

        <Text style={styles.clause}>
          <Text style={styles.boldText}>AND</Text>
        </Text>

        {/* User */}

        <Text style={styles.clause}>
          <Text style={styles.boldText}>{userDetails.fullName}</Text>, residing at {userDetails.place}, hereinafter referred to as the "
          {agreementConfig.role}" {agreementConfig.legalClause}
        </Text>

        {/* Clauses */}

        {agreementClauses.map((clause, index) => (
          <View key={index} style={styles.clause}>
            <Text>{clause}</Text>
          </View>
        ))}

        {/* User Details */}

        <View style={styles.userDetails}>
          <Text>Date: {userDetails.date}</Text>

          <Text>Place: {userDetails.place}</Text>

          <Text>Signature Name: {userDetails.fullName}</Text>

          <Text>Mobile Number: {userDetails.mobileNumber}</Text>
        </View>

        {/* Footer */}

        <View style={styles.footer}>
          <Text>This is a system generated document. No physical signature required.</Text>
        </View>
      </Page>
    </Document>
  );

  // ==============================
  // Proceed Handler
  // ==============================

  const acceptAgreementHandler = () => {
    if (!acceptedTerms) {
      toast.error('Please accept the terms and conditions.');
      return;
    }

    toast.success('Agreement Accepted');

    handleNext();
  };

  // ==============================
  // UI
  // ==============================

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        {/* Header */}

        <div className="card-header">
          <h5 className="mb-0">{agreementConfig.title}</h5>
        </div>

        {/* Body */}

        <div className="card-body">
          {/* PDF Viewer */}

          <div
            style={{
              height: '750px',
              border: '1px solid #ddd',
              borderRadius: '10px',
              overflow: 'hidden'
            }}
          >
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              <AgreementPDF />
            </PDFViewer>
          </div>

          {/* Checkbox */}

          <div className="form-check mt-4">
            <input
              type="checkbox"
              className="form-check-input"
              id="acceptTerms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />

            <label className="form-check-label" htmlFor="acceptTerms">
              I agree to all terms and conditions
            </label>
          </div>

          {/* Actions */}

          <div className="d-flex justify-content-end gap-2 mt-4">
            <PDFDownloadLink
              document={<AgreementPDF />}
              fileName={`${agreementConfig.title.replace(/\s+/g, '_')}_${userDetails.fullName}.pdf`}
              className="btn btn-outline-primary"
            >
              {({ loading }) => (loading ? 'Preparing document...' : 'Download Agreement')}
            </PDFDownloadLink>
<hr/>
            <Button variant="contained" disabled={!acceptedTerms} onClick={acceptAgreementHandler}>
              Proceed & Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agreement;
