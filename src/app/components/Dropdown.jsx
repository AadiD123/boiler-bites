import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TimingDropdown({ onMealChange }) {
  const [selectedItem, setSelectedItem] = useState("Breakfast");

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          style={{ backgroundColor: "#ceb888" }}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        >
          {selectedItem}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" style={{ backgroundColor: "#ceb888" }}>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                  onClick={() => {
                    setSelectedItem("Breakfast");
                    onMealChange("Breakfast");
                  }}
                >
                  Breakfast
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                  onClick={() => {
                    setSelectedItem("Lunch");
                    onMealChange("Lunch");
                  }}
                >
                  Lunch
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                  onClick={() => {
                    setSelectedItem("Dinner");
                    onMealChange("Dinner");
                  }}
                >
                  Dinner
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
