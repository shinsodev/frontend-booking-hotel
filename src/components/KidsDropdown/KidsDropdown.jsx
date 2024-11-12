import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";

const options = [
  { name: "0 Kid" },
  { name: "1 Kid" },
  { name: "2 Kids" },
  { name: "3 Kids" },
  { name: "4 Kids" },
];

const KidsDropdown = ({ setNumOfChildren }) => {
  const [selectedKids, setSelectedKids] = useState("0 Kid");

  const handleClick = (e) => {
    setSelectedKids(e);
    setNumOfChildren(parseInt(e.split(" ")[0])); // Set number of kids from the dropdown
  };

  return (
    <Menu as="div" className="w-full h-full bg-white relative">
      <MenuButton className="w-full h-full flex items-center justify-between px-8">
        {selectedKids === "0 Kid" ? "No kid" : selectedKids}
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

export default KidsDropdown;
