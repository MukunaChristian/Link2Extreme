import { useEffect, useState } from "react";
import PurchaseMessageModal from "../components/PurchaseMessageModal";
import UnpurchasedMessageModel from "../components/UnpurchasedMessageModel";
import FailedPurchaseModal from "../components/FailedPurchaseModal";
import IPConfig from "../components/IPConfig";
import Profile from "../assets/profil";
import axiosInstance from "../components/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import videoLogo from "../assets/L2X.png";
import Topbtn from "../assets/top.png";
import Icondate from "../assets/dateIcon.png";
import checoutIcon from "../assets/checkoutIcon.png";

export default function Unpurchased() {
  const navigate = useNavigate();
  const { userid } = useParams(); // Access userid parameter
  const [imageobject, setImageObject] = useState();
  const [images, setImages] = useState([]);
  const [paymentDone, setPaymentDone] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const Api = IPConfig();

  useEffect(() => {
    axiosInstance
      .get(`${userid}`)
      .then(response => {
        console.log(response);
        console.log(response.data.payment.payment_response);
        setImageObject(response.data);

        setImages(response.data.images);
        if (response.data.user.purchased) {
          console.log("purchased");
          // redirect to purchased page
          navigate(`/client_portal/purchased/${userid}`);
        }

        //display failed purchase modal if payment_response greater than 0
        if (response.data.payment.payment_response > 0) {
          setShowFailedPurchaseMessage(true);
        }
        // console.log(response.data.images);
        // console.log(`${ip}/static/${response.data.user_folder}/images/${response.data.images}`);
      })

      .catch(error => {
        console.error(error);
      });
  }, [Api]);

  useEffect(() => {
    let purchasedStatus = localStorage.getItem("isPurchased");
    setPaymentDone(purchasedStatus === "false");
  }, []);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [showPurchaseMessage, setShowPurchaseMessage] = useState(false);
  const [showHomeMessage, setShowHomeMessage] = useState(false);
  const [showFailedPurchaseMessage, setShowFailedPurchaseMessage] =
    useState(false);

  const handleImageClick = () => {
    setShowPurchaseMessage(true);
  };

  const handleHomeClick = () => {
    setShowHomeMessage(true);
  };

  const handleCloseModal = setModal => {
    setModal(false);
  };

  return (
    <main id="Unpurchased">
      <section>
        <div className="parent1">
          <div className="item1">
            {imageobject &&
            imageobject.images &&
            imageobject.images.length > 0 ? (
              <img
                onContextMenu={e => e.preventDefault()}
                className="image5"
                src={`${Api}/resize/${imageobject.user_folder}/${imageobject.images[0]}`}
              />
            ) : (
              <Profile />
            )}
          </div>
          <div className="item2">
            <div className="name-flex">
              <div>
                <h1> {imageobject && <p>{`${imageobject.user.name}`}</p>}</h1>
                <div className="flex-date">
                  <img src={Icondate} alt="" />
                  <h2>{imageobject && <p>{`${imageobject.user.date}`}</p>}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="item3 card-text">
            <p>
              If you would like to share and download your media, please
              purchase it by proceeding to checkout.
            </p>
          </div>
          <div className="item4">
            <button className="btn-home3" onClick={handleHomeClick}>
              <img
                className="checkout-png"
                src={checoutIcon}
                alt="Icon representing checkout basket"
              />{" "}
              BUY
            </button>
          </div>
        </div>
      </section>
      <section className="bot-card_flex">
        <div className="card2-home">
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
            extraordinary experiences lie beyond what we&#39; re used to.
          </p>
          <p>
            Your remarkable achievement will be remembered as a powerful
            reminder that greatness can be achieved when we push ourselves
            beyond our limits, conquering the doubts that hold us back. Well
            done on this exceptional feat, and may it inspire others to embrace
            fear and seize the incredible opportunities life has to offer!
          </p>{" "}
        </div>
        <div className="card3-home">
          <div className="card3-column">
            <h3>Video Preview</h3>
            <h4>Your bungy jumping video</h4>
          </div>
          {imageobject && imageobject.video_url ? (
            <div className="video-container">
              <video
                className="video"
                onContextMenu={e => e.preventDefault()}
                width="100%"
                height="auto"
                controls
                controlsList="nodownload"
              >
                <source
                  src={`${Api}/${imageobject.video_url}`}
                  type="video/mp4"
                />
              </video>
              <div className="overlay">
                <img
                  src={videoLogo}
                  alt="Overlay Image"
                  className="overlay-image"
                />
              </div>
            </div>
          ) : (
            <p>Currently no video available to display.</p>
          )}
          {paymentDone && (
            <img src="/src/assets/L2X1.png" alt="Bungy Jumping" />
          )}
        </div>
      </section>
      <section className="bot-card_flex">
        <div className="image-home">
          <div className="text-image-home">
            <div>
              <h1>Image Gallery</h1>
              <h2>Your bungy jumping Images</h2>
            </div>
          </div>
          <div className="gal-img-home">
            {images && images.length > 0 ? (
              images.map((image, id) => (
                <img
                  onContextMenu={e => e.preventDefault()}
                  key={id}
                  className="image1-home"
                  src={`${Api}/resize/${imageobject.user_folder}/${image}`}
                  alt="gallery image"
                  onClick={() =>
                    handleImageClick(
                      `${Api}/static/${imageobject.user_folder}/images/${image}`
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

      {showFailedPurchaseMessage && (
        <FailedPurchaseModal
          onClose={() => handleCloseModal(setShowFailedPurchaseMessage)}
        />
      )}
      {showPurchaseMessage && (
        <PurchaseMessageModal
          onClose={() => handleCloseModal(setShowPurchaseMessage)}
        />
      )}
      {showHomeMessage && (
        <UnpurchasedMessageModel
          userId={userid}
          onClose={() => handleCloseModal(setShowHomeMessage)}
        />
      )}

      <button
        onClick={scrollToTop}
        className={`topbtn-home ${isVisible ? "visible" : ""}`}
        style={{ display: isVisible ? "block" : "none" }}
      >
        <img src={Topbtn} alt="" />
      </button>
    </main>
  );
}
