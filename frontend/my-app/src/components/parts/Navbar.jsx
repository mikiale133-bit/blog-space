import React from "react";

const NavbarDropdownMenus = ({ setCategory }) => {
  const menus = [
    { button: "Technology", category: "technology" },
    { button: "Education", category: "education" },
    { button: "Life Styles", category: "lifestyle" },
  ];
  return (
    <div>
      {menus.map((item) => (
        <div className="flex flex-col gap-1">
          <button className="p-1 hover:underline cursor-pointer" onClick={() => setCategory(item.category)}>
            {item.button}
          </button>
        </div>
      ))}
    </div>
  );
};

export default NavbarDropdownMenus;
