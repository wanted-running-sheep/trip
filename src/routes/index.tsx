import React from 'react';
import CalendarPage from '@/pages/CalendarPage';
import { Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <Routes>
      <Route path="" element={<CalendarPage />} />
    </Routes>
  );
};

export default Router;
