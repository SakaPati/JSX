export const Modal = ({ onImage }) => {
  return (
    <div className="Overlay">
      <div className="Modal">
        <img src={onImage} />
      </div>
    </div>
  );
};
