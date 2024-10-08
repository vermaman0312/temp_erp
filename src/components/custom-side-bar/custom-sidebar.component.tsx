import { LogOut, Search } from "lucide-react";
import { CustomLabel } from "../custom-label/custom-label.component";
import { useNavigate } from "react-router-dom";
import { ReactNode, useCallback, useEffect, useState } from "react";
import DesktopMenuItem from "./desktop-menuItems.ui";
import MobileMenuItems from "./mobile-menuItems.ui";
import UserProfileMenuItems from "./user-profile-menuItems.ui";
import NotificationNavBar from "./notification-navbar.ui";
import "../../css/scroll-container.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/redux-index";
import CustomNotificationBody from "./custom-notification-body.ui";
import { useUserDetailsMutation } from "../../api/mutations/private-mutation/profile/user-details.mutation";
import { TBodyApiType } from "../../api/models/api.body.model";
import { TStateResponseApiType } from "../../api/models/api.state.response.model";
import {
  customGetCookies,
  customRemoveCookies,
} from "../../utils/custom-cookies/custom-cookies.util";

type props = {
  headerChildren?: ReactNode;
  children?: ReactNode;
};

const CustomSideBar = ({ headerChildren, children }: props) => {
  const navigate = useNavigate();
  const { userToken } = customGetCookies("userAuthToken");
  const profileDetails = useUserDetailsMutation();
  const IpAddress = useSelector(
    (state: RootState) =>
      state.privateComponentState.device.deviceDetails.ipAddress
  );
  const getDeviceDetails = useSelector(
    (state: RootState) => state.privateComponentState.device.getDeviceDetails
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleLogout = useCallback(() => {
    customRemoveCookies("userAuthToken");
    navigate("/login");
    return;
  }, [navigate]);

  useEffect(() => {
    profileDetails.mutate({
      deviceToken: "123",
      token: userToken as string,
    } as TBodyApiType);
  }, []);

  return (
    <div className="w-screen h-screen flex">
      <div className="w-[15rem] bg-[#0d1b2a] flex-col items-center justify-between gap-2 hidden md:flex">
        <div>
          <div className="w-full text-white flex items-center justify-center font-display text-2xl p-5">
            Logo
          </div>
          <div className="w-full p-2">
            <div className="w-full p-2 rounded-lg cursor-pointer bg-gray-800 transition-all flex">
              <Search className="text-white" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none w-full ml-2 text-white font-display"
              />
            </div>
          </div>
        </div>
        <DesktopMenuItem />
        <div onClick={handleLogout} className="w-full bg-white">
          <button className="w-full bg-red-500 flex items-center justify-between p-2">
            <CustomLabel className="text-white font-display font-medium cursor-pointer">
              Logout
            </CustomLabel>
            <LogOut className="text-white" />
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-2 p-2">
        <div className="w-full bg-[#0d1b2a] p-4 rounded-lg flex items-center justify-end gap-2">
          <div className="w-full flex items-center justify-start">
            <MobileMenuItems />
          </div>
          <div className="w-full flex items-center justify-end md:gap-8 gap-5">
            <div className="flex flex-col">
              <CustomLabel className="text-white font-display font-light text-xs border-b">
                {`${new Date(
                  (getDeviceDetails as TStateResponseApiType).data?.Data
                    ?.timeStamps as Date
                ).toLocaleDateString()} | ${new Date(
                  (getDeviceDetails as TStateResponseApiType).data?.Data
                    ?.timeStamps as Date
                ).toLocaleTimeString()}`}
              </CustomLabel>
              <CustomLabel className="text-white font-display font-light text-xs">
                {IpAddress as string}
              </CustomLabel>
            </div>
            <div className="flex items-center justify-end gap-5">
              <NotificationNavBar onClick={() => setIsOpen((prev) => !prev)} />
              <UserProfileMenuItems />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full flex flex-col items-start justify-start">
            {headerChildren}
          </div>
          <div className="w-full flex-1 overflow-y-auto flex flex-col items-start justify-start scroll-container mt-5">
            {children}
          </div>
        </div>

        <div>
          <CustomNotificationBody isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </div>
  );
};

export default CustomSideBar;
