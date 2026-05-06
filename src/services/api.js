const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

async function request(path, options = {}) {
  const token = window.localStorage.getItem('portfolio_admin_token');
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    },
    ...options
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || 'Request failed');
  }

  return payload;
}

export const api = {
  getProfile() {
    return request('/profile');
  },
  updateProfile(profile) {
    return request('/profile', {
      method: 'PUT',
      body: JSON.stringify(profile)
    });
  },
  getProjects() {
    return request('/projects');
  },
  getProject(id) {
    return request(`/projects/${id}`);
  },
  getSkills() {
    return request('/skills');
  },
  getFacts() {
    return request('/facts');
  },
  createFact(fact) {
    return request('/facts', {
      method: 'POST',
      body: JSON.stringify(fact)
    });
  },
  updateFact(fact) {
    return request(`/facts/${fact.id}`, {
      method: 'PUT',
      body: JSON.stringify(fact)
    });
  },
  deleteFact(id) {
    return request(`/facts/${id}`, { method: 'DELETE' });
  },
  getTestimonials() {
    return request('/testimonials');
  },
  createTestimonial(testimonial) {
    return request('/testimonials', {
      method: 'POST',
      body: JSON.stringify(testimonial)
    });
  },
  updateTestimonial(testimonial) {
    return request(`/testimonials/${testimonial.id}`, {
      method: 'PUT',
      body: JSON.stringify(testimonial)
    });
  },
  deleteTestimonial(id) {
    return request(`/testimonials/${id}`, { method: 'DELETE' });
  },
  sendMessage(message) {
    return request('/contact', {
      method: 'POST',
      body: JSON.stringify(message)
    });
  },
  login(credentials) {
    return request('/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },
  createProject(project) {
    return request('/projects', {
      method: 'POST',
      body: JSON.stringify(project)
    });
  },
  updateProject(project) {
    return request(`/projects/${project.id}`, {
      method: 'PUT',
      body: JSON.stringify(project)
    });
  },
  deleteProject(id) {
    return request(`/projects/${id}`, { method: 'DELETE' });
  },
  createSkill(skill) {
    return request('/skills', {
      method: 'POST',
      body: JSON.stringify(skill)
    });
  },
  updateSkill(skill) {
    return request(`/skills/${skill.id}`, {
      method: 'PUT',
      body: JSON.stringify(skill)
    });
  },
  deleteSkill(id) {
    return request(`/skills/${id}`, { method: 'DELETE' });
  },
  getMessages() {
    return request('/messages');
  },
  deleteMessage(id) {
    return request(`/messages/${id}`, { method: 'DELETE' });
  },
  requestPasswordReset(email) {
    return request('/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  },
  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    const token = window.localStorage.getItem('portfolio_admin_token') || window.sessionStorage.getItem('portfolio_admin_token');
    return fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: formData
    }).then(async (response) => {
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.message || 'Upload failed');
      }
      return payload;
    });
  }
};
