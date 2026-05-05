const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

async function request(path, options = {}) {
  const token = window.localStorage.getItem('portfolio_admin_token');
  const isFormData = options.body instanceof FormData;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    },
    ...options
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || 'Request failed');
  return payload;
}

export const api = {
  getProfile: () => request('/profile'),
  updateProfile: (profile) => request('/profile', { method: 'PUT', body: JSON.stringify(profile) }),
  updateProfileWithUpload: (profile) => request('/profile', { method: 'PUT', body: profile }),
  getProjects: () => request('/projects'),
  getProject: (id) => request(`/projects/${id}`),
  createProject: (project) => request('/projects', { method: 'POST', body: JSON.stringify(project) }),
  updateProject: (project) => request(`/projects/${project.id}`, { method: 'PUT', body: JSON.stringify(project) }),
  createProjectWithUpload: (project) => request('/projects', { method: 'POST', body: project }),
  updateProjectWithUpload: (id, project) => request(`/projects/${id}`, { method: 'PUT', body: project }),
  reorderProjects: (ids) => request('/projects/reorder/list', { method: 'PUT', body: JSON.stringify({ ids }) }),
  deleteProject: (id) => request(`/projects/${id}`, { method: 'DELETE' }),
  getSkills: () => request('/skills'),
  createSkill: (skill) => request('/skills', { method: 'POST', body: JSON.stringify(skill) }),
  updateSkill: (skill) => request(`/skills/${skill.id}`, { method: 'PUT', body: JSON.stringify(skill) }),
  deleteSkill: (id) => request(`/skills/${id}`, { method: 'DELETE' }),
  getFacts: () => request('/facts'),
  createFact: (fact) => request('/facts', { method: 'POST', body: JSON.stringify(fact) }),
  updateFact: (fact) => request(`/facts/${fact.id}`, { method: 'PUT', body: JSON.stringify(fact) }),
  deleteFact: (id) => request(`/facts/${id}`, { method: 'DELETE' }),
  getTestimonials: () => request('/testimonials'),
  createTestimonial: (testimonial) => request('/testimonials', { method: 'POST', body: JSON.stringify(testimonial) }),
  updateTestimonial: (testimonial) => request(`/testimonials/${testimonial.id}`, { method: 'PUT', body: JSON.stringify(testimonial) }),
  deleteTestimonial: (id) => request(`/testimonials/${id}`, { method: 'DELETE' }),
  getMessages: () => request('/messages'),
  deleteMessage: (id) => request(`/messages/${id}`, { method: 'DELETE' }),
  sendMessage: (message) => request('/contact', { method: 'POST', body: JSON.stringify(message) }),
  trackVisit: () => request('/home-visit'),
  getAnalytics: () => request('/analytics'),
  login: (credentials) => request('/login', { method: 'POST', body: JSON.stringify(credentials) })
};
