import { useCallback, useEffect, useState } from "react";
import CustomToast from "../../../components/custom-toast/custom-toast.component";
import CustomToastBody from "../../../components/custom-toast/custom-toast-body";
import { CustomLabel } from "../../../components/custom-label/custom-label.component";
import {
  Loader,
  Smartphone,
} from "lucide-react";
import "../../../css/scroll-container.css";
import CustomOtpInputField from "../../../components/custom-otp-input-field/custom-otp-input-field.component";
import { useNavigate } from "react-router-dom";

const PublicAuth2FaPageLayout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<Array<string>>();
  const [isOtpError, setIsOtpError] = useState<boolean>(false);
  const fullOtp = otp?.join("");
  const handleSubmitOtp = useCallback(() => {
    setIsLoading(true);
    if (!fullOtp) {
      setIsOtpError(true);
      setIsLoading(false);
      return;
    }
    if (fullOtp && fullOtp?.length < 6) {
      setIsOtpError(true);
      setIsLoading(false);
      return;
    }
    setTimeout(() => {
      localStorage.setItem("token", "123");
      setIsLoading(false);
      setIsOtpError(false);
      setOtp([]);
      navigate("/user/auth/dashboard?token=123");
    }, 5000);
  }, [fullOtp, navigate]);

  useEffect(() => {
    if (fullOtp && fullOtp.length === 6) {
      handleSubmitOtp();
    }
  }, [fullOtp, handleSubmitOtp]);

  return (
    <div className="w-full h-screen grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 overflow-hidden scroll-container">
      <div className="w-full bg-[#0d1b2a] flex flex-col items-center justify-between">
        <div
          onClick={() => CustomToast({ body: <CustomToastBody /> })}
          className="w-full flex items-center justify-start p-4 text-white cursor-pointer font-display"
        >
          Logo
        </div>
        <div className="w-full flex flex-col items-center justify-center p-4 text-white">
          <CustomLabel className="text-3xl font-medium font-display text-white">
            Management and Strategic Automation System
          </CustomLabel>
        </div>
        <div className="w-full flex items-center justify-center p-4 text-white">
          <CustomLabel className="text-xs font-light font-display text-white text-center">
            Copy right 2024 ⓒ verma
          </CustomLabel>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center p-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <CustomLabel className="text-3xl font-medium font-display text-[#0d1b2a] text-center">
              Two Factor Authentication
            </CustomLabel>
            <CustomLabel className="sm:text-lg md:text-md lg:text-md font-light font-display text-[#0d1b2a] text-center">
              Enter the 6-digit otp from google authenticator or text/message
              and get access to this system!
            </CustomLabel>
          </div>
          <div className="w-full mt-5 flex flex-col items-center justify-center p-2 gap-5">
            <div className="w-full md:w-[50%] bg-gray-100 border rounded-lg p-2">
              <div className="w-full flex items-center justify-center">
                <Smartphone className="w-8 h-8 text-gray-400" />
              </div>
              <div className="w-full flex items-center justify-center mt-3">
                <CustomLabel className="font-display text-xl text-gray-500">
                  Authentication Code
                </CustomLabel>
              </div>
              <div className="w-full flex items-center justify-center mt-3 p-2">
                <CustomOtpInputField
                  setOtp={setOtp}
                  isOtpError={isOtpError}
                  setIsOtpError={setIsOtpError}
                />
              </div>
              <div className="w-full flex items-center justify-center mt-3 p-2">
                <button
                  onClick={handleSubmitOtp}
                  className="bg-gray-900 text-white p-2 w-full rounded-lg font-display flex items-center justify-center"
                >
                  {isLoading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <>Verify Code</>
                  )}
                </button>
              </div>
              <div className="w-full flex items-center justify-start mt-3 p-2">
                <CustomLabel className="font-display text-xs font-light text-gray-500">
                  Open your two-factor authenticator (TOTP) app or browser
                  extension to view your authentication code.
                </CustomLabel>
              </div>
            </div>
            <div className="w-full flex items-center justify-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicAuth2FaPageLayout;
