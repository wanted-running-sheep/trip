import React from 'react';
import Layout from '@/components/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ConfirmPage, MainPage } from '@/pages';
import { NavigateEnum } from '@/types/enum';
import CalendarInput from '@/components/CheckInOutCalendar';

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={NavigateEnum.MAIN} element={<MainPage />}></Route>
        <Route path={NavigateEnum.CONFIRM} element={<ConfirmPage />} />
      </Route>
      <Route path="/calendar" element={<CalendarInput />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default Router;
