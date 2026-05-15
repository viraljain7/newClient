import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const SetScheme = () => {
  const { scheme_id } = useParams();

  const token = localStorage.getItem('app-token');

  const API = `${import.meta.env.VITE_APP_API_KEY}/master/scheme`;

  const productType = 'mtb';
  const schemeName = 'special';

  const [operators, setOperators] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const formFields = useMemo(
    () => [
      {
        name: 'commissiontype',
        label: 'Commission Type',
        type: 'select',
        options: [
          { value: 'percent', label: 'Percent' },
          { value: 'flat', label: 'Flat' }
        ]
      },

      { name: 'nsm', label: 'NSM', type: 'number' },

      { name: 'sh', label: 'SH', type: 'number' },

      { name: 'subadmin', label: 'Sub Admin', type: 'number' },

      { name: 'cnf', label: 'CNF', type: 'number' },

      {
        name: 'masterdistributor',
        label: 'Master Distributor',
        type: 'number'
      },

      {
        name: 'distributor',
        label: 'Distributor',
        type: 'number'
      },

      {
        name: 'retailer',
        label: 'Retailer',
        type: 'number'
      },

      {
        name: 'servicetype',
        label: 'Service Type',
        type: 'select',
        options: [
          { value: 'percent', label: 'Percent' },
          { value: 'flat', label: 'Flat' }
        ]
      },

      {
        name: 'servicecharge',
        label: 'Service Charge',
        type: 'number'
      }
    ],
    []
  );

  const emptyForm = useMemo(() => {
    return formFields.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {});
  }, [formFields]);

  // =========================
  // Fetch Operators
  // =========================

  const fetchOperators = useCallback(async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem('app-token');

      const API = `${import.meta.env.VITE_BASE_URL}/master/scheme`;

      const formData = new FormData();

      formData.append('type', 'providers');
      formData.append('producttype', productType);

      const response = await fetch(API, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (data.statuscode === 'TXN') {
        const operatorsData = data.data || [];

        setOperators(operatorsData);

        const initialUsers = operatorsData.map(() => ({
          ...emptyForm
        }));

        setUsers(initialUsers);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch operators');
    } finally {
      setLoading(false);
    }
  }, [API, token, schemeName, emptyForm]);

  // =========================
  // Fetch Existing Data
  // =========================

  const fetchCommissionData = useCallback(async () => {
    if (!scheme_id || operators.length === 0) return;

    const token = localStorage.getItem('app-token');

    const API = `${import.meta.env.VITE_BASE_URL}/master/scheme`;

    try {
      const formData = new FormData();

      formData.append('type', 'getcommission');
      formData.append('scheme_id', scheme_id);

      const response = await fetch(API, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (data.statuscode === 'TXN') {
        const updatedUsers = operators.map((operator) => {
          const operatorData = data.data.find((item) => item.provider_id === operator.id);

          return operatorData
            ? {
                commissiontype: operatorData.type || '',

                nsm: operatorData.nsm || '',

                sh: operatorData.sh || '',

                subadmin: operatorData.subadmin || '',

                cnf: operatorData.cnf || '',

                masterdistributor: operatorData.masterdistributor || '',

                distributor: operatorData.distributor || '',

                retailer: operatorData.retailer || '',

                servicetype: operatorData.chargetype || '',

                servicecharge: operatorData.servicecharge || ''
              }
            : { ...emptyForm };
        });

        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch commission data');
    }
  }, [API, token, scheme_id, operators, emptyForm]);

  // =========================
  // Handle Change
  // =========================

  const handleInputChange = (index, name, value) => {
    setUsers((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        [name]: value
      };

      return updated;
    });
  };

  // =========================
  // Submit Handler
  // =========================

  const submitHandler = async (index, provider_id) => {
    try {
      const user = users[index];

      const requiredFields = [
        'commissiontype',
        'nsm',
        'sh',
        'subadmin',
        'cnf',
        'masterdistributor',
        'distributor',
        'retailer',
        'servicetype',
        'servicecharge'
      ];

      const isInvalid = requiredFields.some((field) => user[field] === '' || user[field] === null || user[field] === undefined);

      if (isInvalid) {
        toast.error('Please fill all fields');
        return;
      }

      const payload = {
        type: 'setcommission',

        provider_id,

        scheme_id,

        comissiontype: user.commissiontype,

        chargetype: user.servicetype,

        nsm: user.nsm,

        sh: user.sh,

        subadmin: user.subadmin,

        cnf: user.cnf,

        masterdistributor: user.masterdistributor,

        distributor: user.distributor,

        retailer: user.retailer,

        servicecharge: user.servicecharge
      };

      const token = localStorage.getItem('app-token');

      const API = `${import.meta.env.VITE_BASE_URL}/master/scheme`;

      const response = await fetch(API, {
        method: 'POST',

        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.statuscode === 'TXN') {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Submission failed');
    }
  };

  // =========================
  // Effects
  // =========================

  useEffect(() => {
    fetchOperators();
  }, [fetchOperators]);

  useEffect(() => {
    fetchCommissionData();
  }, [fetchCommissionData]);

  // =========================
  // UI
  // =========================

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight={700}>
          SCHEME {schemeName?.toUpperCase()} {productType?.toUpperCase()}
        </Typography>

        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            maxHeight: '80vh'
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    minWidth: 115
                  }}
                >
                  Operator
                </TableCell>

                {formFields.map((field) => (
                  <TableCell
                    key={field.name}
                    sx={{
                      fontWeight: 700,
                      minWidth: 115
                    }}
                  >
                    {field.label}
                  </TableCell>
                ))}

                <TableCell
                  sx={{
                    fontWeight: 700,
                    minWidth: 115
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={formFields.length + 2} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                operators.map((operator, index) => (
                  <TableRow hover key={operator.id}>
                    <TableCell>
                      <Typography fontWeight={600}>{operator.name}</Typography>
                    </TableCell>

                    {formFields.map((field) => (
                      <TableCell key={field.name}>
                        {field.type === 'select' ? (
                          <TextField
                            select
                            fullWidth
                            size="small"
                            value={users[index]?.[field.name] || ''}
                            onChange={(e) => handleInputChange(index, field.name, e.target.value)}
                          >
                            <MenuItem value="">Select {field.label}</MenuItem>

                            {field.options.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        ) : (
                          <TextField
                            fullWidth
                            size="small"
                            type={field.type}
                            value={users[index]?.[field.name] || ''}
                            onChange={(e) => handleInputChange(index, field.name, e.target.value)}
                          />
                        )}
                      </TableCell>
                    ))}

                    <TableCell>
                      <Button variant="contained" fullWidth onClick={() => submitHandler(index, operator.id)}>
                        Submit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default SetScheme;
