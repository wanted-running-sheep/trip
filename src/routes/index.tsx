import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from '@/components/Layout';
import { ConfirmPage, MainPage } from '@/pages';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/main" />} />
      <Route element={<Layout />}>
        <Route path="/main" element={<MainPage />}></Route>
        <Route path="/reservation-confirm" element={<ConfirmPage />} />
      </Route>
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default Router;
