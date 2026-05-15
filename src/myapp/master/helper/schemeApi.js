import api from '../../../shared/BaseApi';

export const fetchSchemeList = async () => {
  const formData = new FormData();
  formData.append('type', 'list');
  const res = await api.post(`/master/scheme`, formData);


  return res.data;
};

export const addScheme = async (form) => {
  const formData = new FormData();
  formData.append('type', 'add');
  formData.append('name', form.name);
  const res = await api.post(`/master/scheme`, formData);

  return res.data;
};

export const schemeProducts = async () => {
  const formData = new FormData();
  formData.append('type', 'products');
  const res = await api.post(`/master/scheme`, formData);

  return res.data;
};

export const schemeProviders = async (form) => {
  const formData = new FormData();
  formData.append('type', 'providers');
  formData.append('producttype', form.product_Type);
  const res = await api.post(`/master/scheme`, formData);

  return res.data;
};

export const getSchemeCommission = async (form) => {
  const formData = new FormData();
  formData.append('type', 'getcommission');
  formData.append('scheme_id', form.scheme_id);
  const res = await api.post(`/master/scheme`, formData);

  return res.data;
};

export const updateSchemeCommission = async (form) => {
  const formData = new FormData();
  formData.append('type', 'setcommission');

  Object.entries(form).forEach(([key, value]) => {
    if (key !== 'type' && value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  const res = await api.post(`/master/scheme`, formData);

  return res.data;
};
