import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../context/LoginContext';
import { createDocument, getDocuments } from '../api/LoginApi';
import { useNavigate } from 'react-router-dom';
import { buildDocument } from '../helper/document';

export function HomeComponent(props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [document, setDocument] = useState('');
  const [user, setUser] = useState('');
  const [name, setName] = useState('');
  const [token, setToken] = useState(localStorage.getItem('auth-token'));
  const [allDocuments, setAllDocuments] = useState();
  const [updateDocument, setUpdateDocument] = useState(false);

  const { userAuth } = useContext(LoginContext);

  useEffect(() => {
    verifyToken();
    getAllDocuments();
  }, [updateDocument]);

  async function verifyToken() {
    if (!token) {
      await navigate('/');
    }
  }

  async function getAllDocuments() {
    const documents = await getDocuments();
    setAllDocuments(documents);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      title,
      document,
      user,
      name,
    };
    const allData = buildDocument(data);
    createDocument(allData);
    setUpdateDocument(!updateDocument);
  }
  const logOut = async () => {
    localStorage.setItem('auth-token', null);
    await navigate('/');
  };

  return (
    <div className="">
      <div>
        <nav className=" flex   dark:bg-blue-900 items-center relative justify-between bg-white px-5 py-6 w-full">
          <ul
            id="drawer"
            role="menu"
            className="sm:gap-3 transition-left ease-[cubic-bezier(0.4, 0.0, 0.2, 1)] delay-150  sm:flex  flex flex-col cursor-pointer absolute min-h-screen -left-48 sm:static w-48 top-0 bg-white sm:shadow-none shadow-xl sm:bg-transparent sm:flex-row sm:w-auto sm:min-h-0 dark:bg-slate-900  "
          >
            <div className="sm:hidden p-6 mb-5 flex items-center justify-center"></div>
            <li className="font-medium text-sm p-3 hover:bg-slate-300 dark:hover:bg-slate-800 sm:p-0 sm:hover:bg-transparent text-primary">
              <a href="#" className="dark:text-white">
                Dashboard
              </a>
            </li>
          </ul>
          <div className="flex gap-3 items-center ">
            <div className="  cursor-pointer relative  bg-cover bg-center  ">
              <p className=" text-white">{userAuth}</p>
              <div className=" drop-down  w-48 overflow-hidden bg-white rounded-md shadow absolute top-12 right-3">
                <ul>
                  <li
                    onClick={logOut}
                    className="px-3  py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400"
                  >
                    <span> Logout </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div class="  bg-slate-100 overflow-y-scroll w-screen h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">
        <div class="flex flex-col relative w-screen">
          <div
            id="menu"
            class="bg-slate-300 min-h-screen z-10 text-slate-300 w-64 fixed left-0 h-screen overflow-y-scroll"
          >
            <div id="nav" class="w-full px-6"></div>
          </div>
        </div>
        <p className="text-center text-4xl font-bold  ">Registrar Documento</p>

        <div className=" ml-80 mr-36 py-10 ">
          <form onSubmit={handleSubmit}>
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      Titulo
                    </label>
                    <input
                      placeholder="Escribe un titulo"
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 ">
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Documento
                    </label>
                    <input
                      placeholder="Escribe un Documento"
                      onChange={(e) => setDocument(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Autor
                    </label>
                    <input
                      placeholder="Escribe el usuario"
                      onChange={(e) => setUser(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <input
                      placeholder="Escribe un nombre"
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="flex   items-center justify-center ml-80 mr-16">
          <table className="min-w-full border-collapse block md:table">
            <thead className="block md:table-header-group">
              <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                  Titulo
                </th>
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                  Documento
                </th>
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                  Usuario
                </th>
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                  Nombre
                </th>
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                  Actions
                </th>
              </tr>
            </thead>
            {allDocuments
              ? allDocuments.map((document) => (
                  <tbody className="block md:table-row-group">
                    <tr className="bg-blue-200 text-black border border-grey-500 md:border-none block md:table-row">
                      <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                        <span className="inline-block w-1/3 md:hidden font-bold">Title</span>
                        {document.title}
                      </td>
                      <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                        <span className="inline-block w-1/3 md:hidden font-bold">Document</span>
                        {document.document}
                      </td>
                      <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                        <span className="inline-block w-1/3 md:hidden font-bold">User</span>
                        {document.author.user}
                      </td>
                      <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                        <span className="inline-block w-1/3 md:hidden font-bold">Name</span>
                        {document.author.name}
                      </td>
                      <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                        <span className="inline-block w-1/3 md:hidden font-bold">Actions</span>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">
                          Edit
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))
              : null}
          </table>
        </div>
      </div>
    </div>
  );
}
