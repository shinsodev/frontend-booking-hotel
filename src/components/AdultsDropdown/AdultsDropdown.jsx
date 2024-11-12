import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";

const options = [
  { name: "1 Adult" },
  { name: "2 Adults" },
  { name: "3 Adults" },
  { name: "4 Adults" },
];

const AdultsDropdown = ({ setNumOfAdults }) => {
  const [selectedAdult, setSelectedAdult] = useState("2 Adults");

  const handleClick = (e) => {
    setSelectedAdult(e);
    setNumOfAdults(parseInt(e.split(" ")[0])); // Set number of adults from the dropdown
  };

  return (
    <Menu as="div" className="w-full h-full bg-white relative">
      <MenuButton className="w-full h-full flex items-center justify-between px-8">
        {selectedAdult}
        <BsChevronDown className="text-base text-accent-hover" />
      </MenuButton>

      <MenuItems
        as="ul"
        className="bg-white absolute w-full flex flex-col z-40"
      >
        {options.map((option, index) => (
          <MenuItem
            as="li"
            key={index}
            className="border-b last-of-type:border-b-0 h-12 hover:bg-accent hover:text-white w-full flex justify-center items-center cursor-pointer"
            onClick={() => handleClick(option.name)}
          >
            {option.name}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default AdultsDropdown;
