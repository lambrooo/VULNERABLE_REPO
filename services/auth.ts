// Vulnerable Auth Service
// Intentionally storing JWT in localStorage

export const saveToken = (jwt: string) => {
  // SEMGREP RULE ID: javascript-browser-insecure-storage-localstorage-token
  localStorage.setItem('token', jwt); 
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const logout = () => {
  localStorage.removeItem('token');
};