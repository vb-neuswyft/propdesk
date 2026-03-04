import S from "../styles/styles";

/**
 * ChexyButton
 * Renders a branded "Pay Rent with Chexy" button in the renter portal.
 *
 * SETUP:
 * 1. Sign up at https://chexy.co as a landlord
 * 2. Get your unique landlord payment link from your Chexy dashboard
 * 3. Replace CHEXY_LANDLORD_URL below with your real link
 *    e.g. "https://app.chexy.co/pay/your-landlord-id"
 */

const CHEXY_LANDLORD_URL = "https://chexy.co"; // Replace with your real Chexy link

const ChexyButton = ({ renterName, propertyAddress, unit }) => {
  const handleClick = () => {
    // Build URL with pre-filled renter info if Chexy supports query params
    const params = new URLSearchParams({
      ref:      "propdesk",
      property: propertyAddress || "",
      unit:     unit || "",
    });
    const url = `${CHEXY_LANDLORD_URL}?${params.toString()}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ fontSize: 11, color: "#5A5570", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
        Rent Payments
      </div>
      <button style={S.btnChexy} onClick={handleClick}>
        <span style={{ fontSize: 20 }}>💳</span>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Pay Rent with Chexy</div>
          <div style={{ fontSize: 11, color: "#4FC3F799", fontWeight: 400 }}>
            Earn Aeroplan points on every rent payment
          </div>
        </div>
        <span style={{ marginLeft: "auto", fontSize: 16 }}>→</span>
      </button>
      <div style={{ fontSize: 11, color: "#5A5570", textAlign: "center", marginTop: 8 }}>
        Canadian renters earn credit card rewards on rent · Powered by Chexy
      </div>
    </div>
  );
};

export default ChexyButton;
