import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from '@/components/Layout';
import { ConfirmPage, MainPage } from '@/pages';
import { NavigateEnum } from '@/types/enum';
import Skeleton from '@/components/Skeleton';

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={NavigateEnum.MAIN} element={<MainPage />}></Route>
        <Route path={NavigateEnum.CONFIRM} element={<ConfirmPage />} />
      </Route>
      <Route path="/skeleton" element={<Skeleton />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default Router;
