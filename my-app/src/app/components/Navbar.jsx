'use client';
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";

import Image from "next/image";
import { useRouter } from 'next/navigation';


function Navbar() {
  const [active, setActive] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [Rows, setRows] = useState([]);
  const router = useRouter()

  const toggleNotifications = () => {
    setShowNotifications((prevState) => !prevState);
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/notify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data)
        setRows(data.results);
        // console.log(Rows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  };

  return (
    <div className="py-0">
      <header class="text-gray-400 bg-gray-900 body-font ">
        <div class="container mx-20 flex flex-wrap p-5 flex-row justify-center items-center">
          <div className="flex title-font mx-0 font-medium items-center text-white mb-4 md:mb-0">
            <a href="/" className="flex items-center">
              <Image src="/petshop.svg" alt="background image" width={100} height={100} />
            </a>
            <HoveredLink href="/">.</HoveredLink>
          </div>
          <nav class=" flex flex-wrap items-center mx-auto text-l justify-center">
            <Menu >

              <div onClick={() => {
                if (active === "Animals") setActive(null)
                else setActive("Animals");
              }}>
                <MenuItem active={active} item="Animals">
                  <div className="flex flex-col  text-base">
                    <HoveredLink href="/Animals">Animals</HoveredLink></div>
                </MenuItem>
              </div>
              <div onClick={() => {
                if (active === "Customer") setActive(null)
                else {
                  setActive("Customer");
                  <HoveredLink href="/Customer">Customer details</HoveredLink>
                }

              }}>
                <MenuItem active={active} item="Customer">
                  <div className="flex flex-col  text-base">
                    <HoveredLink href="/Customer">Customer details</HoveredLink>
                  </div>
                </MenuItem>
              </div>
              <div onClick={() => {
                if (active === "Sales") setActive(null)
                else {
                  <HoveredLink href="/Sales">Sales Details</HoveredLink>
                }
                setActive("Sales");
              }}>
                <MenuItem active={active} item="Sales">
                  <div className="flex flex-col  text-base">
                    <HoveredLink href="/Sales">Sales Details</HoveredLink>

                  </div>
                </MenuItem>
              </div>
              <div onClick={() => {
                if (active === "Caretaker") setActive(null)
                else setActive("Caretaker");
              }}>
                <MenuItem active={active} item="Caretaker">
                  <div className="flex flex-col  text-base">
                    <HoveredLink href="/Caretaker">Caretaker details</HoveredLink>

                  </div>
                </MenuItem>
              </div>
              <div onClick={() => {
                if (active === "Veiternary") setActive(null)
                else setActive("Veiternary");
              }}>
                <MenuItem active={active} item="Veiternary">
                  <div className="flex flex-col space-y-4 text-base">
                    <HoveredLink href="/Veiternary">Veiternary</HoveredLink>
                  </div>
                </MenuItem>
              </div>
            </Menu>
          </nav>

          <div className="flex flex-col items-center ">
            <button
              id="dropdownNotificationButton"
              data-dropdown-toggle="dropdownNotification"
              className="relative inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
              type="button"
              onClick={toggleNotifications}

            >
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
                <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
              </svg>

              <div class="absolute block w-3 h-3 bg-blue-500 border-2 border-white rounded-full -top-0.5 start-2.5 dark:border-gray-900"></div>
            </button>


            <div
              id="dropdownNotification"
              className={`${showNotifications ? "block" : "hidden"} z-100 absolute w-full max-w-sm bg-blue-500 opacity-100 divide-y divide-gray-700 my-5 rounded-lg dark:opacity-900 dark:bg-gray-800 dark:divide-gray-700`}
              aria-labelledby="dropdownNotificationButton"
            >
              <div className="block mx-0 my-auto px-auto py-auto font-medium text-center text-gray-700 rounded-t-lg bg-blue-500 dark:bg-gray-800 dark:text-white">
                Notifications
              </div>
              {Rows.map((row, index) => (
                <div class="divide-y divide-gray-100 dark:divide-gray-700">
                  <div class="w-full ps-3">
                    <div class="text-gray-900 text-sm mb-1.5 dark:text-gray-400">
                      <span class="font-semibold text-gray-900 dark:text-white">Pet-id:{row.pet_id}</span>: {row.work}
                    </div>
                    <div class="text-xs text-blue-600 dark:text-blue-500">a few moments ago</div>
                  </div>
                </div>
              ))}
            </div>


          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
