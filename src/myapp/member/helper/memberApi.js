import api from '../../../shared/BaseApi';

// api/memberApi.js

export const fetchMember = async ({ type, page = 1, perPage = 20, search = '' }) => {
  const params = {
    page,
    per_page: perPage
  };

  if (search) {
    params.search = search;
  }

  const res = await api.get(`/member/${type}`, {
    params
  });

  return res.data;
};

export const fetchStates = async () => {
  const formData = new FormData();
  formData.append('type', 'states');
  const res = await api.post(`/member/transaction`, formData);

  return res.data;
};

export const createAgent = async (data) => {
  const formData = new FormData();

  Object.entries({
    name: data.name,
    email: data.email,
    mobile: data.mobile,
    shopname: data.company,
    city: data.city,
    role_id: data.role_id,
    state: data.state
  }).forEach(([key, value]) => formData.append(key, value));

  const res = await api.post(`/member/create`, formData);
  return res.data;
};

export const exportReport = async ({ type, page = 1, perPage = 20, search = '' }) => {
  try {
    const params = {
      page,
      per_page: perPage
    };

    if (search) {
      params.search = search;
    }

    const res = await api.get(`/member/${type}?export=1`, {
      params
    });

    // return res.data;

    const blob = new Blob([res.data]);

    // 🔥 create URL
    const url = window.URL.createObjectURL(blob);

    // 🔥 create link
    const link = document.createElement('a');
    link.href = url;

    // 🔥 FORCE DOWNLOAD
    link.setAttribute('download', `${type}-Report.csv`);

    // 🔥 MUST append to DOM
    document.body.appendChild(link);

    // 🔥 trigger
    link.click();

    // cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Export failed', err);
  }
};
