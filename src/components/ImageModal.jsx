import { useState } from "react";
import PropTypes from "prop-types";
import IPConfig from "./IPConfig";
import Download from "../assets/download";
import { saveAs } from "file-saver";
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";

const ImageModal = ({
  images,
  imageUrl,
  onClose,
  imageobject,
  currentImageIndex
}) => {
  const [, setSelectedImage] = useState(imageUrl);
  const [currentImageIndexVar, setCurrentImageIndexVar] =
    useState(currentImageIndex);

  const handleModalClick = event => {
    if (!event.target.closest(".modal-content-purchased")) {
      onClose();
    }
  };

  const handlePrevClick = () => {
    setCurrentImageIndexVar(prevIndex => {
      const newIndex = Math.max(prevIndex - 1, 0);
      setSelectedImage(images[newIndex]);
      return newIndex;
    });
  };

  const handleNextClick = () => {
    setCurrentImageIndexVar(prevIndex => {
      const newIndex = Math.min(prevIndex + 1, images.length - 1);
      setSelectedImage(images[newIndex]);
      return newIndex;
    });
  };

  const isFirstPage = currentImageIndexVar === 0;
  const isLastPage = currentImageIndexVar === images.length - 1;

  const ip = IPConfig();

  const handleDownloadClick = () => {
    const imageName = images[currentImageIndex];
    const imageUrl = `${ip}/static/${imageobject.user_folder}/images/${imageName}`;

    try {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = imageName;
      saveAs(imageUrl, imageName); // Put your image URL here.
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <main id="imageModel-puchased">
      <div className="image-modal-purchased" onClick={handleModalClick}>
        <div className="modal-content-purchased">
          <img
            src={`${ip}/static/${imageobject.user_folder}/images/${images[currentImageIndexVar]}`}
            alt="Enlarged"
          />
          {images.length > 1 && (
            <>
              <button
                className={`prev-btn ${isFirstPage ? "first-img" : ""}`}
                onClick={handlePrevClick}
                disabled={isFirstPage}
              >
                <img src={leftArrow} alt="" />
              </button>
              <button
                className={` ${
                  isLastPage ? "last-img next-btn" : " next-btn"
                } `}
                onClick={handleNextClick}
                disabled={isLastPage}
              >
                <img src={rightArrow} alt="" />
              </button>
            </>
          )}
          <button
            className="download-btn"
            onClick={handleDownloadClick} // Call handleDownloadClick when download button is clicked
          >
            <Download />
          </button>
        </div>
      </div>
    </main>
  );
};

ImageModal.propTypes = {
  images: PropTypes.array.isRequired,
  imageUrl: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onDownload: PropTypes.func,
  imageobject: PropTypes.object.isRequired,
  currentImageIndex: PropTypes.number.isRequired
};

export default ImageModal;
