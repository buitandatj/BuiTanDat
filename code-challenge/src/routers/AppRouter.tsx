import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
const Sum = React.lazy(() => import('../pages/Sum'));
const FancyForm = React.lazy(() => import('../pages/FancyForm'));
const MessyReact = React.lazy(() => import('../pages/MessyReact'));

const AppRouter = () => {
  return (
    <Routes>
        <Route
            path={`/`}
            element={<Suspense fallback={<div>Loading...</div>}><Sum/></Suspense>}
          />
             <Route
            path={`/fancy-form`}
            element={<Suspense fallback={<div>Loading...</div>}><FancyForm/></Suspense>}
          />
             <Route
            path={`/messy-react`}
            element={<Suspense fallback={<div>Loading...</div>}><MessyReact/></Suspense>}
          />
    </Routes>
  )
}

export default AppRouter
