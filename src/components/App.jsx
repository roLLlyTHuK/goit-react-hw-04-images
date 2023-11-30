import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { fetchImages } from './Services/Services';

const perPage = 12;

export class App extends Component {
    constructor(props) {
    super(props);
    this.myApp = React.createRef();
  }
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    selectedImage: '',
    totalCount: 0,
  };

  handleSearchSubmit = (query) => {
    this.setState({
      query: query,
      images: [],
      page: 1,
      totalCount: 0,
      selectedImage: '',
    });
  };

  handleLoadMore = () => {
    this.setState(prev => {
      return { page: prev.page + 1 };
    });
  }

  handleImageClick = (imageUrl) => {
    this.setState({ showModal: true, selectedImage: imageUrl });
  }

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedImage: '' });
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      this.setState({ isLoading: true });
      fetchImages(this.state.query, this.state.page, perPage)
        .then(responce => {
          if (responce.data.totalHits === 0) return alert('No data for this search');
          this.setState(prev => {
            return {
              images: [...prev.images, ...responce.data.hits],
              totalCount: responce.data.totalHits,
              isLoading: false,
            };
          });
        })
        .catch(error => {
          console.error('Error fetching images:', error);
        }); 
    }
     window.scrollTo(0, this.myApp.current.scrollHeight);
}
  
  render() {
    const { images, isLoading, showModal, selectedImage } = this.state;

    return (
      <div className='App' ref={this.myApp}>
        
        <Searchbar onSubmit={this.handleSearchSubmit} />

        <ImageGallery images={images} onImageClick={this.handleImageClick} />

        {isLoading && <Loader />}

        {this.state.totalCount > perPage &&
          this.state.page * perPage < this.state.totalCount && !isLoading && <Button onClick={this.handleLoadMore} />}

        {showModal && <Modal isOpen={showModal} image={selectedImage} onClose={this.handleCloseModal} />}
      </div>
    );
  }
}

