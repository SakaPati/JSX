import { ImageGalleryItem } from "./ImageGalleryItem";

export const ImageGallery = ({ onData }) => {
  return (
    <ul className="ImageGallery">
      <ImageGalleryItem onImage={onData} />
    </ul>
  );
};
