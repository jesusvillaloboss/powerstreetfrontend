export async function authUser(user) {
  let url = process.env.REACT_APP_API + 'users/login';
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response;
}
export async function getDocuments() {
  const token = localStorage.getItem('token');
  let url = process.env.REACT_APP_API + 'documents';
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': token,
    },
  });
  return await response.json();
}

export async function createDocument(document) {
  const token = localStorage.getItem('token');
  let url = process.env.REACT_APP_API + 'documents';

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(document),
    headers: {
      'content-Type': 'application/json',
      'auth-token': token,
    },
  });
  return await response;
}
