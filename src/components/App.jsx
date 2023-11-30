import React, { useState, useEffect, useRef } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { fetchImages } from './Services/Services';

const perPage = 12;

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  const myAppRef = useRef();

  const handleSearchSubmit = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setTotalCount(0);
    setSelectedImage('');
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (imageUrl) => {
    setShowModal(true);
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage('');
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchImages(query, page, perPage);
        if (response.data.totalHits === 0) {
          alert('No data for this search');
          return;
        }
        setImages((prevImages) => [...prevImages, ...response.data.hits]);
        setTotalCount(response.data.totalHits);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    if (query !== '' || page !== 1) {
      fetchData();
    }
  }, [query, page]);

  useEffect(() => {
    window.scrollTo(0, myAppRef.current.scrollHeight);
  }, [images]);

  return (
    <div className='App' ref={myAppRef}>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {totalCount > perPage && page * perPage < totalCount && !isLoading && <Button onClick={handleLoadMore} />}
      {showModal && <Modal isOpen={showModal} image={selectedImage} onClose={handleCloseModal} />}
    </div>
  );
};

