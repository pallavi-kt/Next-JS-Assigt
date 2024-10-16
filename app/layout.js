'use client';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <MainLayout>{children}</MainLayout>
    </Provider>
  );
}

function MainLayout({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 

  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="flex h-screen">
          <aside className="w-64 bg-gray-800 text-white h-full">
            <nav className="flex flex-col h-full p-5">
              <h1 className="text-2xl font-bold mb-6">My App</h1>
              <ul className="flex flex-col space-y-4">
                <li>
                  <a href="/" className="hover:bg-gray-700 p-2 rounded">Home</a>
                </li>
                <li>
                  <a href="/about" className="hover:bg-gray-700 p-2 rounded">About</a>
                </li>
                <li>
                  <a href="/login" className="hover:bg-gray-700 p-2 rounded">
                    {isLoggedIn ? 'Logout' : 'Login'}
                  </a>
                </li>
              </ul>
            </nav>
          </aside>

          <main className="flex-1 p-8 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
