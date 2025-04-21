import React, { useState } from "react";
import {
  Shield,
  FileCheck,
  User,
  FileImage,
  FileText,
  CheckCircle2,
  Upload,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import "./DriverProfile.css";
import { useNavigate } from "react-router-dom";

const DriverProfile = () => {
    const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState({
    // Owner Documents
    owner_pan_card: false,
    owner_cancelled_cheque_or_passbook: false,
    owner_aadhar_card: false,

    // Vehicle Documents
    vehicle_rc_book: false,
    vehicle_insurance: false,
    vehicle_pollution_certificate: false,

    // Driver Documents
    driver_license: false,
    driver_aadhar_card: false,
    driver_profile_photo: false,
  });

  const [activeTooltip, setActiveTooltip] = useState(null);
  const [uploadingDoc, setUploadingDoc] = useState(null);

  const totalDocuments = Object.keys(verificationStatus).length;
  const verifiedCount =
    Object.values(verificationStatus).filter(Boolean).length;
  const progress = (verifiedCount / totalDocuments) * 100;

  const handleVerify = (documentType) => {
    setUploadingDoc(documentType);
    setTimeout(() => {
      setVerificationStatus((prev) => ({
        ...prev,
        [documentType]: true,
      }));
      setUploadingDoc(null);
    }, 1500);
  };

  const handleFileUpload = (e, documentType) => {
    // Logic to handle file upload can be added here
    console.log(`File uploaded for ${documentType}:`, e.target.files[0]);
    handleVerify(documentType);
  };

  const documentSections = [
    {
      title: "Vehicle's Owner Documents",
      icon: <User />,
      documents: [
        {
          id: "owner_pan_card",
          title: "PAN Card",
          items: [
            "Full name must match your profile",
            "PAN card must be current and valid",
            "All text must be clearly visible",
          ],
        },
        {
          id: "owner_cancelled_cheque_or_passbook",
          title: "Bank Details",
          items: [
            "Cancelled cheque or passbook required",
            "Account holder name must match your profile",
            "Document must be official and legible",
          ],
        },
        {
          id: "owner_aadhar_card",
          title: "Aadhar Card",
          items: [
            "Government-issued ID required",
            "Photo must clearly match your profile picture",
            "Document must not be expired",
          ],
        },
      ],
    },
    {
      title: "Vehicle Documents",
      icon: <FileImage />,
      documents: [
        {
          id: "vehicle_rc_book",
          title: "Registration Certificate",
          items: [
            "RC must be current and valid",
            "Vehicle details must match profile",
            "Document must be clearly legible",
          ],
        },
        {
          id: "vehicle_insurance",
          title: "Insurance",
          items: [
            "Insurance must be active",
            "Coverage must meet requirements",
            "Owner details must match",
          ],
        },
        {
          id: "vehicle_pollution_certificate",
          title: "Pollution Certificate",
          items: [
            "Certificate must be current",
            "Vehicle details must match RC",
            "Document must be official",
          ],
        },
      ],
    },
    {
      title: "Driver's Documents",
      icon: <FileCheck />,
      documents: [
        {
          id: "driver_license",
          title: "Driving License",
          items: [
            "License must be valid",
            "Details must match profile",
            "All text must be clearly visible",
          ],
        },
        {
          id: "driver_aadhar_card",
          title: "Aadhar Card",
          items: [
            "Government-issued ID required",
            "Photo must be clear",
            "Document must be valid",
          ],
        },
        {
          id: "driver_profile_photo",
          title: "Profile Photo",
          items: [
            "Recent photo required",
            "Face must be clearly visible",
            "Plain background preferred",
          ],
        },
      ],
    },
  ];

  const allVerified = Object.values(verificationStatus).every(Boolean);

  return (
    <>
      <div className="driver-profile-container">
        <header className="verification-header">
          <div className="header-icon">
            <Shield />
          </div>
          <h1>Driver Verification</h1>
          <p>
            Complete the verification process by uploading the required
            documents to activate your driver account.
          </p>

          <div className="progress-container">
            <div className="progress-header">
              <span className="progress-label">Verification Progress</span>
              <span className="progress-count">
                {verifiedCount} of {totalDocuments} complete
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </header>

        <div className="document-sections">
          {documentSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="section-container">
              <div className="section-header">
                <div className="section-icon">{section.icon}</div>
                <h2>{section.title}</h2>
              </div>

              <div className="document-segments">
                {section.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className={`document-segment ${
                      verificationStatus[doc.id] ? "verified" : ""
                    }`}
                  >
                    <div className="segment-header">
                      <div className="segment-title">
                        <div
                          className={`segment-icon ${
                            verificationStatus[doc.id] ? "verified" : ""
                          }`}
                        >
                          {verificationStatus[doc.id] ? (
                            <CheckCircle2 />
                          ) : (
                            <FileCheck />
                          )}
                        </div>
                        <h3>{doc.title}</h3>
                        <div
                          className="help-icon"
                          onMouseEnter={() => setActiveTooltip(doc.id)}
                          onMouseLeave={() => setActiveTooltip(null)}
                        >
                          <HelpCircle />
                          {activeTooltip === doc.id && (
                            <div className="tooltip">
                              Further information about{" "}
                              {doc.title.toLowerCase()} requirements
                            </div>
                          )}
                        </div>
                      </div>
                      {verificationStatus[doc.id] && (
                        <span className="verified-badge">
                          <CheckCircle2 />
                          Verified
                        </span>
                      )}
                    </div>

                    <ul className="requirement-list">
                      {doc.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>

                    {!verificationStatus[doc.id] && (
                      <div className="upload-container">
                        <input
                          type="file"
                          id={`upload-${doc.id}`}
                          className="file-input"
                          onChange={(e) => handleFileUpload(e, doc.id)}
                          disabled={uploadingDoc === doc.id}
                        />
                        <label
                          htmlFor={`upload-${doc.id}`}
                          className={`upload-button ${
                            uploadingDoc === doc.id ? "uploading" : ""
                          }`}
                        >
                          {uploadingDoc === doc.id ? (
                            <>
                              <AlertCircle className="button-icon spinning" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Upload className="button-icon" />
                              Upload Document
                            </>
                          )}
                        </label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {allVerified && (
          <div className="acknowledgment">
            <div className="acknowledgment-icon">
              <CheckCircle2 />
            </div>
            <h2>Verification Complete</h2>
            <p>
              Thank you for completing the driver verification process. Your
              account has been approved, and you can now start accepting rides.
            </p>
            <div className="acknowledgment-actions">
              <button
                className="primary-button"
                onClick={() => navigate("/driver_dash")}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DriverProfile;
