"use client";

import { useStateContext } from "@/context/StateContext";
import Image from "next/image";
import { cleanString } from "@/utils/cleanString";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"; // Adjust the import path as needed
import Link from "next/link";

const Home = () => {
  const {
    captains,
    captainsPage,
    captainsTotalPages,
    error,
    setPage,
    handleNextPage,
    handlePreviousPage,
  } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [captains]);

  const handlePageChange = (newPage: number) => {
    if (
      newPage !== captainsPage &&
      newPage > 0 &&
      newPage <= captainsTotalPages
    ) {
      setIsLoading(true);
      setPage("captains", newPage);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Captains</h1>
      <div className="flex justify-center my-8">
        <Pagination className="gap-4">
          <PaginationPrevious
            onClick={() => handlePreviousPage("captains")}
            disabled={captainsPage === 1 || isLoading}
            className={
              captainsPage === 1 || isLoading
                ? "hover:cursor-not-allowed"
                : "hover:cursor-pointer"
            }
          />
          <PaginationContent>
            {Array.from({ length: captainsTotalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={index + 1 === captainsPage}
                  onClick={() => handlePageChange(index + 1)}
                  disabled={isLoading}
                  className="hover:cursor-pointer"
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {captainsTotalPages > 5 && <PaginationEllipsis />}
          </PaginationContent>
          <PaginationNext
            onClick={() => handleNextPage("captains")}
            disabled={captainsPage === captainsTotalPages || isLoading}
            className={
              captainsPage === captainsTotalPages || isLoading
                ? "hover:cursor-not-allowed"
                : "hover:cursor-pointer"
            }
          />
        </Pagination>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      ) : (
        <motion.ul
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {captains.map((captain) => (
            <Link
              key={captain.uuid}
              href={`/items/${captain.uuid}`}
              legacyBehavior
              passHref
            >
              <motion.li className="bg-white mx-auto rounded-lg shadow p-4 ring ring-gray-200/20 group transform transition-transform duration-200 ease-in group hover:cursor-pointer">
                <img
                  src={captain.baked_img}
                  className="rounded shadow-lg scale-90 group-hover:scale-[1] transform transition-transform duration-200 ease-in group-hover:cursor-pointer"
                />
                {/* <div className="flex justify-between items-center">
                  <h2 className="text-base font-semibold">{captain.name}</h2>
                  <div className="bg-white rounded-full border-black border p-1">
                    <Image
                      src={`/assets/images/${captain.team
                        .replace(/\s/g, "")
                        .toLowerCase()}.png`}
                      alt={`${captain.team} logo`}
                      width="50"
                      height="50"
                      className="rounded-full"
                    />
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  {captain.display_position} -{" "}
                  <span className="font-bold">OVR:</span> {captain.ovr}
                </p>
                <div className="text-gray-600 mt-2">
                  <p className="font-bold text-sm">{captain.ability_name}</p>
                  {captain.ability_name !== captain.ability_desc ? (
                    <p className="text-xs italic">
                      {cleanString(captain.ability_desc)}
                    </p>
                  ) : null}
                </div> */}
              </motion.li>
            </Link>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default Home;
