import { useState, useContext } from 'react';
import { LoginContext } from '../context/LoginContext';

export const LoginForm = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [showDangerAlert, setshowDangerAlert] = useState(false);

  const { loginData, userAuth, setUserAuth } = useContext(LoginContext);
  async function handleSubmit(e) {
    e.preventDefault();

    const res = await loginData({
      user,
      pass,
    });
    await localStorage.setItem('auth-token', res.data.token);
    setUserAuth(res.data.name);
    if (!res) setshowDangerAlert(true);
    setPass('');
  }

  return (
    <div className="flex min-h-full h-screen items-center justify-center py-8 px-4 sm:px-6 lg:px-8 ">
      <div className="w-full max-w-md space-y-4 p-8 rounded border border-blue-600 ">
        <div className="flex items-center justify-center mb-4">
          <img src="/images/code.png" className="h-28" />
        </div>

        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Iniciar Sesion
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            {showDangerAlert ? (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 m-2 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Inicio de sesion incorrecto!</strong>
                <span className="block sm:inline">Correo o contraseña incorrecta</span>
              </div>
            ) : null}
            <div className="form-group mb-6">
              <input
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Escribe tu correo"
                onChange={(e) => setUser(e.target.value)}
              />
            </div>
            <div>
              <input
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Escribe tu contraseña"
                onChange={(e) => setPass(e.target.value)}
                value={pass}
              />
            </div>
          </div>
          <button className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
