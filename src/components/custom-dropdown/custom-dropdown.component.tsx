import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./custom-dropdown.ui";

type props = {
  title?: string;
  description?: string;
  data?: number;
  list?: Array<string | number>;
  onChange?: (value: number | string) => void;
  value?: string | number;
  width?: string;
};

const CustomDropdown = ({
  title,
  description,
  data,
  list,
  onChange,
  value,
  width,
}: props) => {
  const generateItems = (data: number) => {
    let items = [];
    for (let i = 5; i <= data; i += 5) {
      items.push(
        <SelectItem
          key={i}
          value={i.toString()}
          className="font-display text-xs"
        >
          {i}
        </SelectItem>
      );
    }
    return items;
  };
  return (
    <Select
      onValueChange={onChange}
      value={typeof value === "number" ? value.toString() : value}
      defaultValue={typeof value === "number" ? value.toString() : value}
    >
      <SelectTrigger
        className={`${
          width ? width : "w-full"
        } font-display text-xs gap-2 outline-none`}
      >
        <SelectValue placeholder={title} />
      </SelectTrigger>
      {(data || list) && (
        <SelectContent className="bg-white">
          <SelectGroup>
            {description && (
              <SelectLabel className="font-display text-xs">
                {description}
              </SelectLabel>
            )}
            {list && list.length > 0 ? (
              <>
                {list.map((value, index) => {
                  return (
                    <SelectItem
                      key={index}
                      value={value.toString()}
                      className="font-display text-xs"
                    >
                      {value}
                    </SelectItem>
                  );
                })}
              </>
            ) : (
              <>{generateItems(data || 0)}</>
            )}
          </SelectGroup>
        </SelectContent>
      )}
    </Select>
  );
};

export default CustomDropdown;
