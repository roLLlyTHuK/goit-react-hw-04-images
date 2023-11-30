
export const ImageGalleryItem = ({ image, onClick }) => {
  const handleClick = () => {
    onClick(image.largeImageURL);
  };

  return (
    <li className="ImageGalleryItem" onClick={handleClick}>
      <img className="ImageGalleryItem-image" src={image.webformatURL} alt="foto" loading="lazy" />
    </li>
  );
};

