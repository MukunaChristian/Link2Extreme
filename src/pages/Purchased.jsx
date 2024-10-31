import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import ImageModal from "../components/ImageModal";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";
import IPConfig from "../components/IPConfig";
import Profile from "../assets/profil";
import axiosInstance from "../components/axiosInstance";
import { useParams } from "react-router-dom";
import Topbtn from '../assets/top.png';
import Check from '../assets/check.png'
import Check2 from '../assets/check2.png'
import Icondate from '../assets/dateIcon.png'
import facebookIcon from '../assets/Group 10.png'
import twitterIcon from '../assets/Group 3.png'
import whatsappIcon from '../assets/Group 6.png'
import telegramIcon from '../assets/Group 9.png'
import emailIcon from '../assets/Group 5.png'

export default function Purchased() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageobject, setImageObject] = useState();
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
  const [userToken, setUserToken] = useState("");
  const { userid } = useParams(); // Access userid parameter

  const ip = IPConfig();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = document.documentElement.scrollTop;
      setIsVisible(scrolled > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let [, setIsPurchase] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`${userid}`)
      .then((response) => {
        console.log(response);
        setImageObject(response.data);
        setImages(response.data.images);
        setUserToken(response.data.share_url);
        setIsPurchase(response.data.Purchased);
        console.log("is purchased: ", response.data.user.purchased);
        if (!response.data.user.purchased) {
          console.log("not purchased");
          navigate(`/client_portal/${userid}`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [ip, navigate, userid]);

  const shareableUrl = userToken ? `${ip}/${userToken}` : window.location.href;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDivClose = () => {
    setShowForm(false);
  };

  const handleImageClick = (imageUrl, id) => {
    setSelectedImage(imageUrl);
    setCurrentImageIndex(id);
    setShowModal(true);
    console.log(imageUrl);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(selectedImage);
  };

  const handleDownload = (imageUrl, imageName) => (event) => {
    try {
      event.preventDefault(); // Prevent default behavior

      console.log("Downloading image:", imageUrl); // Check if imageUrl is correct

      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = imageName; // Use the image name as the download filename
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <main id="purchased">
      <section>
        {showForm && (
          <div className="download">
            <div className="flex">
              <div className="valid">
                <img src={Check} alt="" onLoad={() => {}} />
              </div>
              <p>
                Your media bundle has been purchased and is ready to be
                downloaded.
              </p>
            </div>
            <div className="btn-close" onClick={handleDivClose}></div>
          </div>
        )}

        <div className="parent">
          <div className="item1-purchased">
            {imageobject &&
            imageobject.images &&
            imageobject.images.length > 0 ? (
              <img
                className="image6"
                src={`${ip}/resize/${imageobject.user_folder}/${imageobject.images[0]}`}
              />
            ) : (
              <div className="profile">
                <Profile />
              </div>
            )}
          </div>
          <div className="item2-purchased">
            <div className="name-flex">
              <div className="check-icon">
                <h1>
                  {imageobject && (
                    <p>
                      {`${imageobject.user.name}`}
                      <span></span>
                    </p>
                  )}
                </h1>
                <img className="icon" src={Check2} alt="" />
              </div>
              <div className="flex-purchased-date">
              <img src={Icondate} alt="" />
              <h2>{imageobject && <p>{`${imageobject.user.date}`}</p>}</h2>
              </div>
            </div>
          </div>
          <div className="item3-purchased">
            <div className="child1-purchased">
              <div className="card-text2">
                <h2>Share your link on Social Media</h2>
                <p>
                  Click the icons to share your link on different social media
                  platforms:
                </p>
              </div>
            </div>
            <div className="child2-purchased">
              <div className="card-icon">
                <a
                  href={`https://www.facebook.com/share.php?u=${encodeURIComponent(
                    shareableUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className="fb" src={facebookIcon} alt="" />
                </a>
                <a
                  href={`https://twitter.com/share?url=${encodeURIComponent(
                    shareableUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className="fb" src={twitterIcon} alt="" />
                </a>{" "}
                <a
                  href={`whatsapp://send?text=${encodeURIComponent(
                    shareableUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className="fb" src={whatsappIcon} alt="" />
                </a>{" "}
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(
                    shareableUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className="fb" src={telegramIcon} alt="" />
                </a>{" "}
                <a
                  href={`mailto:?subject=Check%20out%20this%20website&body=${encodeURIComponent(
                    shareableUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className="fb" src={emailIcon} alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bot-card_flex">
        <div className="card2">
          <h3>Congratulations!</h3>
          <h4>Worlds highest bungy jump at 216!</h4>

          <p>
            Congratulations on your phenomenal achievement of conquering the
            highest bungy bridge jump in the world at a jaw-dropping 216 meters!
            Your bravery and determination in facing your fears head-on are
            truly commendable and serve as an inspiration to us all. Taking that
            leap into the unknown from such a towering height requires an
            extraordinary level of courage and unwavering self-belief.
          </p>
          <p>
            As you soared through the air, defying gravity itself, the
            exhilaration was palpable, and we couldn&#39; t help but share in
            your excitement. Your courage in embracing this adrenaline-pumping
            adventure left us in awe, reminding us that life&#39; s most
            extraordinary experiences lie beyond what we&#39; re used to
          </p>
          <p>
            Your remarkable achievement will be remembered as a powerful
            reminder that greatness can be achieved when we push ourselves
            beyond our limits, conquering the doubts that hold us back. Well
            done on this exceptional feat, and may it inspire others to embrace
            fear and seize the incredible opportunities life has to offer!
          </p>
        </div>

        <div className="card3">
          <div className="card3-column">
            <div className="card-btn">
              <div>
                <h3>Video Preview</h3>
                <h4>Your bungy jumping video </h4>
              </div>
              <div>
                <button
                  className="btn-home3"
                  onClick={() =>
                    (window.location.href = `${ip}/download/${imageobject.user_folder}`)
                  }
                >
                  Download
                </button>
              </div>
            </div>
            {imageobject && imageobject.video_url ? (
              <div className="video-container"> 
              <video class="video" width="100%" height="auto" controls>
                <source
                  src={`${ip}/${imageobject.video_url}`}
                  type="video/mp4"
                />
              </video>
              </div>
            ) : (
              <p>Currently no video available to display.</p>
            )}
          </div>
        </div>
      </section>
      <section className="bot-card_flex">
        <div className="certificate">
          <div className="text-certificate">
            <div>
              <h1>Certification</h1>
              <h2>Your bungy jumping certificate</h2>
            </div>
            <div>
              <button
                className="btn-certificate"
                onClick={() =>
                  (window.location.href = `${ip}/download_certificate/${imageobject.user_folder}`)
                }
              >
                Download
              </button>
            </div>
          </div>
          <div className="pdf-container">
            { imageobject && imageobject.certificate_url ? (
              <div className="pdf-overlay-container">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
                  <div className="react-pdf-viewer">
                    <Viewer
                      fileUrl={`${ip}/${imageobject.certificate_url}`}
                      plugins={[defaultLayoutPluginInstance]}
                    />
                  </div>
                </Worker>
              </div>
            ) : (
              <p>Currently no certificate available to display.</p>
            )}
          </div>
        </div>
      </section>
      <section className="bot-card_flex">
        <div className="image">
          <div className="text-image">
            <div>
              <h1>Image Gallery</h1>
              <h2>Your bungy jumping Images.</h2>
            </div>
            <div>
              <button
                className="btn-image"
                onClick={() =>
                  (window.location.href = `${ip}/download_images/${imageobject.user_folder}`)
                }
              >
                Download
              </button>
            </div>
          </div>
          <div className="gal-img">
            {images && images.length > 0 ? (
              images.map((image, id) => (
                <img
                  key={id}
                  className="image1"
                  src={`${ip}/resize/${imageobject.user_folder}/${image}`}
                  alt="gallery image"
                  onClick={() =>
                    handleImageClick(
                      `${ip}/static/${imageobject.user_folder}/images/${image}`,
                      id
                    )
                  }
                />
              ))
            ) : (
              <p>Currently, no images available to display.</p>
            )}
          </div>
        </div>
      </section>
      {showModal && (
        <ImageModal
          images={images}
          imageUrl={selectedImage}
          onClose={handleCloseModal}
          imageobject={imageobject}
          currentImageIndex={currentImageIndex}
          onDownload={handleDownload} // Pass the handleDownload function
        />
      )}

      <button
        onClick={scrollToTop}
        className={`topbtn ${isVisible ? "visible" : ""}`}
        style={{ display: isVisible ? "block" : "none" }}
      >
        <img src={Topbtn} alt="" />
      </button>
    </main>
  );
}
