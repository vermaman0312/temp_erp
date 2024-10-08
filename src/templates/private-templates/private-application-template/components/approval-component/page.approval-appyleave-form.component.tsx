import React from "react";
import { CustomLabel } from "../../../../../components/custom-label/custom-label.component";
import { CustomInputField } from "../../../../../components/custom-input-field/custom-input-field.component";
import { CustomDatePicker } from "../../../../../components/custom-datepicker/custom-datepicker.component";
import { Textarea } from "../../../../../components/custom-textarea/custom-textarea.component";
import CustomDropdown from "../../../../../components/custom-dropdown/custom-dropdown.component";

type props = {
  leaveTypeList?: Array<string>;
  onChangeDropdown?: (value: number | string) => void;
  dropdownValue?: string;
  isDropdownError?: boolean;
  userUniqueId?: string;
  requestedDate?: Date;
  onChangeFromDate?: (date: Date) => void;
  fromDateValue?: Date;
  isFromDateError?: boolean;
  onChangeToDate?: (date: Date) => void;
  toDateValue?: Date;
  isToDateError?: boolean;
  numberOfDays?: number;
  onChangeReason?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  reasonValue?: string;
  isReasonError?: boolean;
  onClick?: () => void;
};

const PrivateApprovalApplyFormPageComponent = ({
  leaveTypeList,
  onChangeDropdown,
  dropdownValue,
  isDropdownError,
  requestedDate,
  userUniqueId,
  onChangeFromDate,
  fromDateValue,
  isFromDateError,
  onChangeToDate,
  toDateValue,
  isToDateError,
  numberOfDays,
  onChangeReason,
  reasonValue,
  isReasonError,
  onClick,
}: props) => {
  return (
    <div className="w-full">
      <div className="w-full">
        <CustomLabel className="text-xs font-display text-gray-900">
          Select leave type:
        </CustomLabel>
        <CustomDropdown
          title="Select your leave type"
          list={leaveTypeList}
          onChange={onChangeDropdown}
          value={dropdownValue}
          isError={isDropdownError}
        />
      </div>
      {(requestedDate || requestedDate) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          {requestedDate && (
            <div className="w-full">
              <CustomLabel className="text-xs font-display text-gray-900">
                Requested date:
              </CustomLabel>
              <CustomInputField
                disabled
                type="text"
                value={
                  requestedDate
                    ? requestedDate.toLocaleDateString()
                    : new Date().toLocaleDateString()
                }
                className="focus:outline-none focus:border-none active:border-none active:outline-none"
              />
            </div>
          )}
          {userUniqueId && (
            <div className="w-full">
              <CustomLabel className="text-xs font-display text-gray-900">
                User unique ID:
              </CustomLabel>
              <CustomInputField
                disabled
                type="text"
                value={userUniqueId}
                className="focus:outline-none focus:border-none active:border-none active:outline-none"
              />
            </div>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        <div className="w-full">
          <CustomLabel className="text-xs font-display text-gray-900">
            From date:
          </CustomLabel>
          <CustomDatePicker
            title="Select date"
            disabled={(date: Date) => date < new Date()}
            onSelect={(date) =>
              onChangeFromDate && onChangeFromDate(date as Date)
            }
            selected={fromDateValue}
            isError={isFromDateError}
          />
        </div>
        <div className="w-full">
          <CustomLabel className="text-xs font-display text-gray-900">
            To date:
          </CustomLabel>
          <CustomDatePicker
            title="Select date"
            disabled={(date: Date) => date < (fromDateValue || new Date())}
            onSelect={(date) => onChangeToDate && onChangeToDate(date as Date)}
            selected={toDateValue}
            isError={isToDateError}
          />
        </div>
      </div>
      {numberOfDays && (
        <div className="w-full mt-5">
          <CustomLabel className="text-xs font-display text-gray-900">
            Number of days:
          </CustomLabel>
          <CustomInputField
            disabled
            type="text"
            value={`${numberOfDays} days`}
            className="focus:outline-none focus:border-none active:border-none active:outline-none"
          />
        </div>
      )}
      <div className="w-full mt-5">
        <CustomLabel className="text-xs font-display text-gray-900">
          Reason:
        </CustomLabel>
        <Textarea
          placeholder="Write a reason..."
          onChange={(event) => onChangeReason && onChangeReason(event)}
          value={reasonValue}
          className={`border rounded-lg h-40 scroll-container p-2 text-xs font-display ${
            isReasonError && "border-red-500 placeholder:text-red-500"
          }`}
        />
      </div>
      <div className="w-full mt-5 flex items-center justify-end">
        <button
          onClick={onClick}
          className="border text-xs font-display font-medium text-white p-2 bg-gray-700 rounded-lg"
        >
          Submit request
        </button>
      </div>
    </div>
  );
};

export default PrivateApprovalApplyFormPageComponent;
