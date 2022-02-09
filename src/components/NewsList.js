import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { readNews } from '../reducers/newsSlice';
import Card from './Card';

function NewsList() {
  const { profile } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile) {
      dispatch(readNews());
    }
  }, [profile, dispatch]);

  if (!profile) {
    return null;
  }

  return (
    <div className="news__list">
      {items.map((item) =>
        <Card key={item.id} {...item} />
      )}
    </div>
  )
}

export default NewsList;
