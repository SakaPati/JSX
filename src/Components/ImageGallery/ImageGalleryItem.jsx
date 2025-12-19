export const ImageGalleryItem = ({ onImage }) => {
  return (
    <>
      {onImage.map((element, index) => (
        <li key={index} className="ImageGalleryItem">
          <img
            src={element.prevImage}
            alt={element.tag}
            className="ImageGalleryItem-image"
          />
        </li>
      ))}
    </>
  );
};
