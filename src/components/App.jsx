import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchAsync } from 'api/fetch';
import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button';

const App = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isShowModal, setShowModal] = useState(false);
  const [isShowButton, setShowButton] = useState(false);
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [selectedPicture, setSelectedPicture] = useState(null);

  const handleSearchSubmit = searchTerm => {
    setQuery(searchTerm);
    setPage(1);
    setPictures([]);
  };

  useEffect(() => {
    const handelFetchImg = async () => {
      try {
        setLoading(true);
        const { totalHits, hits } = await fetchAsync(query, page);

        if (hits.length === 0) {
          Notiflix.Notify.failure('Sorry. There are no images ...');
        }

        setPictures(prevState => [...prevState, ...hits]);
        setShowButton(page < Math.ceil(totalHits / hits.length));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (query !== '') {
      handelFetchImg(query);
    }
  }, [query, page]);

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleImageClick = id => {
    const selectedPicture = pictures.find(picture => picture.id === id);
    setSelectedPicture(selectedPicture);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedPicture(null);
    setShowModal(false);
  };

  return (
    <>
      <Searchbar onSubmit={handleSearchSubmit}></Searchbar>
      {pictures.length !== 0 && (
        <ImageGallery
          pictures={pictures}
          onClick={handleImageClick}
        ></ImageGallery>
      )}

      {isLoading && <Loader></Loader>}
      {isShowModal && (
        <Modal
          src={selectedPicture.largeImageURL}
          alt={selectedPicture.pageURL}
          onClose={handleCloseModal}
        />
      )}
      {isShowButton && (
        <Button isLoading={isLoading} onLoadMore={onLoadMore}></Button>
      )}
    </>
  );
};

export default App;
