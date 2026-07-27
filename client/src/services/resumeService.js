import api from "./api";

const createResume = async (payload) => {
  const { data } = await api.post("/resumes", payload);
  return data;
};

const getResumes = async () => {
  const { data } = await api.get("/resumes");
  return data;
};

const getResumeById = async (id) => {
  const { data } = await api.get(`/resumes/${id}`);
  return data;
};

const updateResume = async (id, payload) => {
  const { data } = await api.put(`/resumes/${id}`, payload);
  return data;
};

const deleteResume = async (id) => {
  const { data } = await api.delete(`/resumes/${id}`);
  return data;
};

const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("resumeFile", file);

  const { data } = await api.post("/resumes/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export default {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
  uploadResume,
};
