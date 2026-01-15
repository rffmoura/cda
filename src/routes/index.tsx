// src/routes/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../components/Layout/MainLayout';
import { Home } from '../pages/Home';
import { GameDetails } from '../pages/GameDetails';
import { MyLibrary } from '../pages/MyLibrary';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    // Tratamento de erro global (opcional por enquanto, mas boa prática)
    errorElement: <div className='p-4 text-white'>Oops! Página não encontrada.</div>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        // :id é o parâmetro dinâmico (ex: /game/3498)
        path: '/game/:id',
        element: <GameDetails />,
      },
      {
        path: '/library',
        element: <MyLibrary />,
      },
    ],
  },
]);
