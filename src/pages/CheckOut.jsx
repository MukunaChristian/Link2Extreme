// import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
// import Logo from "../assets/logo.jsx";
import PaymentForm from "../components/PaymentForm.jsx";
import IPConfig from "../components/IPConfig.jsx";
import axiosInstance from "../components/axiosInstance";
import { useParams } from "react-router-dom";

export default function Checkout() {
  const { userid } = useParams(); // Access userid parameter
  const [dataobject, setDataObject] = useState();
  const [, setCheckoutData] = useState([]);
  const Api = IPConfig();
  console.log(userid)
  useEffect(() => {
    axiosInstance
      .get(`${userid}`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setDataObject(response.data);
        setCheckoutData(response.data.checkoudata);
        console.log(response.data.checkoudata);
        console.log(response.data.user.price);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [Api]);

  console.log(dataobject);

  return (
    <main id="checkout">
      <div className="parent">
        <div className="child2">
          <h1 className="title">Bungy Media Purchase</h1>

          <div className="card-checkout">
            <div className="card-checkout-column">
              <h3>Bungy Jump Bundle</h3>
              {dataobject && (
                <div className="number">{`R ${dataobject.user.price}`}</div>
              )}
            </div>

            <h2>Date</h2>
            {dataobject && <p>{`${dataobject.user.date}`}</p>}
            <h2>Location</h2>
            <div className="flex-text">
              {/* {dataobject && <p>{`${dataobject.user.name}`}</p>} */}

              {dataobject && <p>{`${dataobject.location}`}</p>}
            </div>
            <h2>Service</h2>

            <p>Zipline and bungy jump images and video purchase.</p>
          </div>
        </div>
        <div className="child3">
        <PaymentForm userID={userid} />
        </div>
      </div>
    </main>
  );
}
