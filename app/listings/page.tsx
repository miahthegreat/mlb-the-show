// app/listings.tsx

"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useStateContext } from "@/context/StateContext";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { formatNumber } from "@/utils/formatNumber";
import Link from "next/link";

const ListingsPage = () => {
  const {
    listings,
    listingsPage,
    listingsTotalPages,
    error,
    setPage,
    setListingType,
    setSort,
    setOrder,
    setRarity,
  } = useStateContext();

  const handleTypeChange = (value: string) => {
    setListingType(value);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
  };

  const handleOrderChange = (value: string) => {
    setOrder(value);
  };

  const handleRarityChange = (value: string) => {
    setRarity(value);
  };

  const handlePageChange = (newPage: number) => {
    setPage("listings", newPage);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Listings</h1>
      <div className="flex justify-between gap-2 items-center my-4 p-2 rounded">
        <Select onValueChange={handleTypeChange} defaultValue="mlb_card">
          <SelectTrigger>
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mlb_card">MLB Card</SelectItem>
            <SelectItem value="stadium">Stadium</SelectItem>
            <SelectItem value="equipment">Equipment</SelectItem>
            <SelectItem value="sponsorship">Sponsorship</SelectItem>
            <SelectItem value="unlockable">Unlockable</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={handleSortChange} defaultValue="rank">
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rank">Rank</SelectItem>
            <SelectItem value="best_sell_price">Sell Price</SelectItem>
            <SelectItem value="best_buy_price">Buy Price</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={handleOrderChange} defaultValue="desc">
          <SelectTrigger>
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Descending</SelectItem>
            <SelectItem value="asc">Ascending</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={handleRarityChange} defaultValue="diamond">
          <SelectTrigger>
            <SelectValue placeholder="Rarity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="diamond">Diamond</SelectItem>
            <SelectItem value="gold">Gold</SelectItem>
            <SelectItem value="silver">Silver</SelectItem>
            <SelectItem value="bronze">Bronze</SelectItem>
            <SelectItem value="common">Common</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-center mt-4">
        <Pagination>
          <PaginationPrevious
            onClick={() => handlePageChange(listingsPage - 1)}
            disabled={listingsPage === 1}
          />
          <PaginationContent>
            {listingsTotalPages <= 5 ? (
              [...Array(listingsTotalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      isActive={pageNumber === listingsPage}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })
            ) : (
              <>
                {listingsPage > 1 && (
                  <PaginationItem>
                    <PaginationLink onClick={() => handlePageChange(1)}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                )}
                {listingsPage > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                {listingsPage > 2 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(listingsPage - 1)}
                    >
                      {listingsPage - 1}
                    </PaginationLink>
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink isActive>{listingsPage}</PaginationLink>
                </PaginationItem>
                {listingsPage < listingsTotalPages - 1 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(listingsPage + 1)}
                    >
                      {listingsPage + 1}
                    </PaginationLink>
                  </PaginationItem>
                )}
                {listingsPage < listingsTotalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                {listingsPage < listingsTotalPages && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(listingsTotalPages)}
                    >
                      {listingsTotalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}
              </>
            )}
          </PaginationContent>
          <PaginationNext
            onClick={() => handlePageChange(listingsPage + 1)}
            disabled={listingsPage === listingsTotalPages}
          />
        </Pagination>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <motion.ul
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {listings.map((listing) => (
          <li
            key={listing.item.uuid}
            className="bg-white rounded-lg shadow group hover:shadow-lg transition-shadow duration-200 ease-linear p-4 hover:cursor-pointer"
          >
            <Link
              href={`/listings/${listing.item.uuid}`}
              className="flex items-center"
            >
              <Image
                src={listing.item.baked_img}
                alt={listing.item.name}
                width={150}
                height={150}
                className="rounded-lg group-hover:shadow-lg"
              />
              <div className="ml-4">
                <h2 className="text-xl font-bold">{listing.listing_name}</h2>
                <p className="text-gray-600">{listing.item.team}</p>
                <p className="text-gray-600 flex gap-2 items-center">
                  <span>Sell Price: </span>
                  <span>
                    <img
                      src="/assets/images/stubs.webp"
                      className="h-5 w-auto"
                    />
                  </span>
                  <span>{formatNumber(listing.best_sell_price)}</span>
                </p>
                <p className="text-gray-600 flex gap-2 items-center">
                  <span>Buy Price: </span>
                  <span>
                    <img
                      src="/assets/images/stubs.webp"
                      className="h-5 w-auto"
                    />
                  </span>
                  <span>{formatNumber(listing.best_buy_price)}</span>
                </p>
              </div>
            </Link>
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

export default ListingsPage;
