import React from 'react';
import Image from 'next/image';
import MainLayout from '../layouts/MainLayout/MainLayout';

export default function NotFound(): JSX.Element {
  return (
    <MainLayout title="Страница не найдена">
      <div className="not-found">
        <Image className="not-found__image" src="/404.svg" width="500" height="500" />
      </div>
    </MainLayout>
  );
}
