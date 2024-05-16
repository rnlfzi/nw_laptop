"use client";

import React from "react";

import Brand from "@/components/Brand";
import CardProduct from "@/components/CardProduct";
import { useEffect, useState } from "react";
import Empty from "@/components/Empty";
import { ProductProps } from "../CardProduct/index.type";

const Content = ({ data }: { data: ProductProps[] }) => {
  const [keyword, setKeyword] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const [isSticky, setIsSticky] = useState<boolean>(false);

  const productReady = data.filter((item) => {
    const matchesIsReady = item.isReady === true;
    const matchesKeyword = item.name
      .toLowerCase()
      .includes(keyword.toLowerCase());
    const matchesBrand = filter === "all" || item.brand === filter;

    return matchesIsReady && matchesKeyword && matchesBrand;
  });

  const productSold = data.filter((item) => {
    const matchesIsReady = item.isReady !== true;
    const matchesKeyword = item.name
      .toLowerCase()
      .includes(keyword.toLowerCase());
    const matchesBrand = filter === "all" || item.brand === filter;

    return matchesIsReady && matchesKeyword && matchesBrand;
  });

  const handleChange = (e: any) => {
    setKeyword(e.target.value);
  };

  const handleScroll = () => {
    const searchElement = document.getElementById("search-bar");
    const brandElement = document.getElementById("brand-bar");

    if (searchElement && brandElement) {
      const sticky = searchElement.offsetTop;
      if (window.scrollY > sticky) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`bg-white transition-all ${
          isSticky ? "fixed top-0 left-0 right-0 z-20 py-2 shadow" : ""
        }`}
        id="search-bar"
      >
        <div className="py-2">
          <label className="flex items-center w-full max-w-[300px] md:max-w-[450px] gap-2 mx-auto bg-white rounded-full input input-bordered">
            <input
              type="text"
              className="outline-none grow"
              placeholder="Cari berdasarkan nama"
              value={keyword}
              onChange={handleChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div className="px-4 py-2 overflow-x-scroll" id="brand-bar">
          <div className="flex items-center justify-center w-full gap-5 min-w-[460px]">
            <Brand
              brand="all"
              onClick={() => setFilter("all")}
              filter={filter}
            />
            <Brand
              brand="asus"
              onClick={() => setFilter("asus")}
              filter={filter}
            />
            <Brand
              brand="acer"
              onClick={() => setFilter("acer")}
              filter={filter}
            />
            <Brand
              brand="samsung"
              onClick={() => setFilter("samsung")}
              filter={filter}
            />
            <Brand
              brand="dell"
              onClick={() => setFilter("dell")}
              filter={filter}
            />
            <Brand brand="hp" onClick={() => setFilter("hp")} filter={filter} />
            <Brand
              brand="msi"
              onClick={() => setFilter("msi")}
              filter={filter}
            />
            <Brand
              brand="lenovo"
              onClick={() => setFilter("lenovo")}
              filter={filter}
            />
            <Brand
              brand="apple"
              onClick={() => setFilter("apple")}
              filter={filter}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-2 md:gap-4">
        <h2 className="font-semibold text-center text-slate-600">
          Stok Tersedia
        </h2>
        <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
        {productReady.length > 0 ? (
          <div className="grid items-center grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
            {productReady.map((item) => (
              <CardProduct key={item.id} data={item} />
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </div>
      <div className="flex flex-col gap-2 px-2 md:gap-4">
        <h2 className="font-semibold text-center text-slate-600">Stok Habis</h2>
        <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
        {productSold.length > 0 ? (
          <div className="grid items-center grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
            {productSold.map((item) => (
              <CardProduct key={item.id} data={item} />
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
};

export default Content;