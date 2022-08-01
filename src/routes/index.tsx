import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ConfirmPage, ReservationPage } from '@/pages';
import ReservationLayout from '@/components/ReservationLayout';
import ConfirmLayout from '@/components/ConfirmLayout';

const Router = () => {
  return (
    <Routes>
      <Route element={<ReservationLayout />}>
        <Route path="/" element={<ReservationPage />} />
      </Route>
      <Route element={<ConfirmLayout />}>
        <Route path="/reservation-confirm" element={<ConfirmPage />} />
      </Route>
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default Router;
