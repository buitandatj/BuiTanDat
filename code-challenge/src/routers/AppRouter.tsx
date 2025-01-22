import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Sum from '../pages/Sum';
import FancyForm from '../pages/FancyForm';
import MessyReact from '../pages/MessyReact';

const AppRouter = () => {
  return (
    <Routes>
        <Route
            path={`/`}
            element={<Sum/>}
          />
             <Route
            path={`/fancy-form`}
            element={<FancyForm/>}
          />
             <Route
            path={`/messy-react`}
            element={<MessyReact    />}
          />
    </Routes>
  )
}

export default AppRouter
