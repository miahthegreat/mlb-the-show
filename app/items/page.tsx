"use client";

import { useStateContext } from "@/context/StateContext";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Adjust the import path as needed
import Link from "next/link";
import { cx } from "class-variance-authority";
import Image from "next/image";

const ItemsPage = () => {
  const {
    items,
    itemsPage,
    itemsTotalPages,
    itemType,
    error,
    handleNextPage,
    handlePreviousPage,
    setPage,
    setItemType,
  } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [items]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== itemsPage && newPage > 0 && newPage <= itemsTotalPages) {
      setIsLoading(true);
      setPage("items", newPage);
    }
  };

  const handleTypeChange = (type: string) => {
    setIsLoading(true);
    setItemType(type);
  };

  const itemTypes = [
    "mlb_card",
    "stadium",
    "equipment",
    "sponsorship",
    "unlockable",
  ];

  const renderPageNumbers = () => {
    const pages = [];
    const maxPageDisplay = 5;
    const halfMaxPageDisplay = Math.floor(maxPageDisplay / 2);

    let startPage = Math.max(1, itemsPage - halfMaxPageDisplay);
    let endPage = Math.min(itemsTotalPages, itemsPage + halfMaxPageDisplay);

    if (startPage === 1) {
      endPage = Math.min(itemsTotalPages, maxPageDisplay);
    } else if (endPage === itemsTotalPages) {
      startPage = Math.max(1, itemsTotalPages - maxPageDisplay + 1);
    }

    if (startPage > 1) {
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => handlePageChange(1)}
            disabled={isLoading}
            className="hover:cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        pages.push(<PaginationEllipsis key="startEllipsis" />);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={i === itemsPage}
            onClick={() => handlePageChange(i)}
            disabled={isLoading}
            className="hover:cursor-pointer"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < itemsTotalPages) {
      if (endPage < itemsTotalPages - 1) {
        pages.push(<PaginationEllipsis key="endEllipsis" />);
      }
      pages.push(
        <PaginationItem key={itemsTotalPages}>
          <PaginationLink
            onClick={() => handlePageChange(itemsTotalPages)}
            disabled={isLoading}
            className="hover:cursor-pointer"
          >
            {itemsTotalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Items</h1>
      <div className="flex justify-center my-4">
        <Select onValueChange={handleTypeChange} defaultValue={itemType}>
          <SelectTrigger className="w-64 bg-gray-200 border border-gray-400 rounded p-2">
            <SelectValue placeholder={itemType.replace(/_/g, " ")} />
          </SelectTrigger>
          <SelectContent>
            {itemTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type.replace(/_/g, " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-center my-8">
        <Pagination>
          <PaginationPrevious
            onClick={() => handlePreviousPage("items")}
            disabled={itemsPage === 1 || isLoading}
            className={
              itemsPage === 1 || isLoading
                ? "hover:cursor-not-allowed"
                : "hover:cursor-pointer"
            }
          />
          <PaginationContent>{renderPageNumbers()}</PaginationContent>
          <PaginationNext
            onClick={() => handleNextPage("items")}
            disabled={itemsPage === itemsTotalPages || isLoading}
            className={
              itemsPage === itemsTotalPages || isLoading
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
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {items.map((item) => {
            console.log(item);
            return (
              <motion.li
                key={item.uuid}
                className={cx(
                  "rounded-lg p-4 ring ring-gray-200/20 group",
                  item.rarity && `bg-${item.rarity.toLowerCase()}`
                )}
              >
                <Link
                  href={`/items/${item.uuid}`}
                  className="grid justify-center gap-2 items-center"
                >
                  <Image
                    alt={`${item.name} image`}
                    src={item.baked_img}
                    className="rounded-lg shadow scale-90 hover:scale-100 group-hover:shadow-lg transform transition-transform duration-300 ease-in"
                    height={200}
                    width={200}
                  />

                  <h2 className="text-lg font-semibold text-center">
                    {item.series} series
                  </h2>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      )}
    </div>
  );
};

export default ItemsPage;
