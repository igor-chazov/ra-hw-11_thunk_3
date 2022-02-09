import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Banner from './Banner';
import NewsList from './NewsList';
import Page404 from './Page404';

function Content() {
  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<Banner />} />
        <Route path="/news" element={<NewsList />} />
        {/* <Route path="/news/:id" element={<NewsView />} /> */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  )
}

export default Content;
