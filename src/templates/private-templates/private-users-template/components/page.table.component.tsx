import {
  ArrowBigUp,
  EllipsisVertical,
  Eye,
  LockKeyhole,
  Trash2,
  UserRoundCog,
} from "lucide-react";
import CustomMenuDropdown from "../../../../components/custom-menu-dropdown/custom-menu-dropdown.component";
import CustomPagination from "../../../../components/custom-pagination/custom-pagination.component";
import { userType } from "../../../../mock/user-data";
import { DropdownMenuItem } from "../../../../components/custom-menu-dropdown/custom-menu-dropdown.ui";

type props = {
  items: Array<userType>;
  row: number;
  role: string;
  tablePagination?: boolean;
};

const PrivateUserTablePageComponent = ({
  items,
  row,
  role,
  tablePagination,
}: props) => {
  const getOrdinalSuffix = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };
  const getAcademicYear = (currentYear: number, admissionYear: number) => {
    const yearDifference = currentYear - admissionYear + 1;
    return getOrdinalSuffix(yearDifference);
  };
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full h-full">
      <table className="w-full leading-normal">
        <thead>
          <tr>
            <th className="font-display px-5 py-2 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
              S.N
            </th>
            <th className="font-display px-5 py-2 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Unique ID
            </th>
            <th className="font-display px-5 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              User Details
            </th>
            <th className="font-display px-5 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Contact
            </th>
            {role.toLowerCase() !== "student" && (
              <th className="font-display px-5 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Department
              </th>
            )}
            {role.toLowerCase() !== "student" && (
              <th className="font-display px-5 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Designation
              </th>
            )}
            {role.toLowerCase() === "student" && (
              <th className="font-display px-5 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Current Status
              </th>
            )}
            {role.toLowerCase() === "student" && (
              <th className="font-display px-5 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Addmission Year
              </th>
            )}
            <th className="font-display px-5 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Role
            </th>
            <th className="font-display px-5 py-2 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
              More
            </th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            <>
              {items
                .filter((filter) => filter.userRole.toLowerCase() === role)
                .slice(0, row)
                .map((user, index) => {
                  return (
                    <tr key={index}>
                      <td className="border-b border-gray-200 text-center bg-white text-xs font-display">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span aria-hidden className="absolute inset-0"></span>
                          <span className="relative">{index + 1}</span>
                        </span>
                      </td>
                      <td className="border-b border-gray-200 text-center bg-white text-xs font-display">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span aria-hidden className="absolute inset-0"></span>
                          <span className="relative">{user.uniqueId}</span>
                        </span>
                      </td>
                      <td className="border-b border-gray-200 text-left bg-white text-sm">
                        <div className="flex">
                          <div className="flex-shrink-0 w-8 h-8">
                            <img
                              className="w-full h-full rounded-full"
                              src={user.userProfileImage}
                              alt=""
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-500 whitespace-no-wrap text-left font-display font-bold text-xs">
                              {`${user.userFirstName} ${user.userLastName}`}
                            </p>
                            <p className="text-gray-600 whitespace-no-wrap font-display text-xs">
                              {user.uniqueId}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="border-b border-gray-200 text-left bg-white text-xs font-display">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {user.userEmailAddress}
                        </p>
                        <p className="text-gray-600 whitespace-no-wrap">
                          {user.userPhoneNumber}
                        </p>
                      </td>
                      {role.toLowerCase() !== "student" && (
                        <td className="border-b border-gray-200 bg-white text-xs font-display">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {user.userDepartment}
                          </p>
                        </td>
                      )}
                      {role.toLowerCase() !== "student" && (
                        <td className="border-b border-gray-200 bg-white text-xs font-display">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {user.userDesignation}
                          </p>
                          <p className="text-gray-600 whitespace-no-wrap">
                            {user.userCollege}
                          </p>
                        </td>
                      )}
                      {role.toLowerCase() === "student" && (
                        <td className="border-b border-gray-200 bg-white text-xs font-display">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {`${getAcademicYear(
                              currentYear,
                              Number(user.userAdmissionYear)
                            )} year, `}
                            {user.userBranch}
                            <span className="font-display font-semibold text-gray-500">
                              {`(${user.userDepartment})`}
                            </span>
                          </p>
                          <p className="text-gray-600 whitespace-no-wrap">
                            {user.userCollege}
                          </p>
                        </td>
                      )}
                      {role.toLowerCase() === "student" && (
                        <td className="border-b border-gray-200 bg-white text-xs font-display">
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0"
                            ></span>
                            <span className="relative">
                              {user.userAdmissionYear}
                            </span>
                          </span>
                        </td>
                      )}
                      <td className="border-b border-gray-200 bg-white text-xs font-display">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">{user.userRole}</span>
                        </span>
                      </td>
                      <td className="border-b border-gray-200 bg-white text-sm text-center">
                        <button
                          type="button"
                          className="inline-block text-gray-500 hover:text-gray-700"
                        >
                          <CustomMenuDropdown
                            buttonComponent={
                              <EllipsisVertical className="w-4 h-4 cursor-pointer" />
                            }
                            marginRight="mr-6"
                          >
                            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer gap-2">
                              <Eye className="w-4 h-4" />
                              <span className="font-display text-xs">
                                View user
                              </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer gap-2">
                              <UserRoundCog className="w-4 h-4" />
                              <span className="font-display text-xs">
                                Edit user
                              </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer gap-2">
                              <ArrowBigUp className="w-4 h-4" />
                              <span className="font-display text-xs">
                                Shift to admin
                              </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer gap-2">
                              <LockKeyhole className="w-4 h-4" />
                              <span className="font-display text-xs">
                                Block user
                              </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer gap-2">
                              <Trash2 className="w-4 h-4" />
                              <span className="font-display text-xs">
                                Delete user
                              </span>
                            </DropdownMenuItem>
                          </CustomMenuDropdown>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </>
          ) : null}
        </tbody>
      </table>
      {tablePagination && (
        <div>
          <CustomPagination
            totalLength={items.length}
            minimumLength={1}
            maximumLength={row}
            onClickPrev={() => alert("prev")}
            onClickNext={() => alert("Next")}
          />
        </div>
      )}
    </div>
  );
};

export default PrivateUserTablePageComponent;
