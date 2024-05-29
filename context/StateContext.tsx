// StateContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Captain, Item, ApiResponse, Listing, StateContextType } from "@/types";
import {
  getCaptains,
  getItems,
  getListingByUUID,
  getListings,
} from "@/lib/api";

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [captains, setCaptains] = useState<Captain[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [captainsPage, setCaptainsPage] = useState<number>(1);
  const [itemsPage, setItemsPage] = useState<number>(1);
  const [listingsPage, setListingsPage] = useState<number>(1);
  const [captainsTotalPages, setCaptainsTotalPages] = useState<number>(1);
  const [itemsTotalPages, setItemsTotalPages] = useState<number>(1);
  const [listingsTotalPages, setListingsTotalPages] = useState<number>(1);
  const [itemType, setItemTypeState] = useState<string>("mlb_card");
  const [listingType, setListingTypeState] = useState<string>("mlb_card");
  const [sort, setSortState] = useState<string>("rank");
  const [order, setOrderState] = useState<string>("desc");
  const [rarity, setRarityState] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const fetchCaptains = async (page: number) => {
    try {
      const data = await getCaptains(page);
      setCaptains(data.captains);
      setCaptainsTotalPages(data.total_pages);
      setError(null);
    } catch (err) {
      console.error("Error fetching captains data:", err);
      setError("Failed to load captains data");
    }
  };

  const fetchItems = async (page: number, type: string) => {
    try {
      const data = await getItems(page, type);
      setItems(data.items);
      setItemsTotalPages(data.total_pages);
      setError(null);
    } catch (err) {
      console.error("Error fetching items data:", err);
      setError("Failed to load items data");
    }
  };

  const fetchListings = async (
    page: number,
    type: string,
    sort: string,
    order: string,
    rarity: string | undefined
  ) => {
    try {
      const data = await getListings(page, type, sort, order, rarity);
      setListings(data.listings);
      setListingsTotalPages(data.total_pages);
      setError(null);
    } catch (err) {
      console.error("Error fetching listings data:", err);
      setError("Failed to load listings data");
    }
  };

  useEffect(() => {
    fetchCaptains(captainsPage);
  }, [captainsPage]);

  useEffect(() => {
    fetchItems(itemsPage, itemType);
  }, [itemsPage, itemType]);

  useEffect(() => {
    fetchListings(listingsPage, listingType, sort, order, rarity);
  }, [listingsPage, listingType, sort, order, rarity]);

  const handleNextPage = (type: "captains" | "items" | "listings") => {
    if (type === "captains" && captainsPage < captainsTotalPages) {
      setCaptainsPage(captainsPage + 1);
    } else if (type === "items" && itemsPage < itemsTotalPages) {
      setItemsPage(itemsPage + 1);
    } else if (type === "listings" && listingsPage < listingsTotalPages) {
      setListingsPage(listingsPage + 1);
    }
  };

  const handlePreviousPage = (type: "captains" | "items" | "listings") => {
    if (type === "captains" && captainsPage > 1) {
      setCaptainsPage(captainsPage - 1);
    } else if (type === "items" && itemsPage > 1) {
      setItemsPage(itemsPage - 1);
    } else if (type === "listings" && listingsPage > 1) {
      setListingsPage(listingsPage - 1);
    }
  };

  const setPage = (type: "captains" | "items" | "listings", page: number) => {
    if (type === "captains") {
      setCaptainsPage(page);
    } else if (type === "items") {
      setItemsPage(page);
    } else if (type === "listings") {
      setListingsPage(page);
    }
  };

  const setItemType = (type: string) => {
    setItems([]);
    setItemTypeState(type);
    setItemsPage(1);
  };

  const setListingType = (type: string) => {
    setListings([]);
    setListingTypeState(type);
    setListingsPage(1);
  };

  const setSort = (sort: string) => {
    setSortState(sort);
    setListingsPage(1);
  };

  const setOrder = (order: string) => {
    setOrderState(order);
    setListingsPage(1);
  };

  const setRarity = (rarity: string | undefined) => {
    setRarityState(rarity);
    setListingsPage(1);
  };

  return (
    <StateContext.Provider
      value={{
        captains,
        items,
        listings,
        captainsPage,
        itemsPage,
        listingsPage,
        captainsTotalPages,
        itemsTotalPages,
        listingsTotalPages,
        itemType,
        error,
        fetchCaptains,
        fetchItems,
        fetchListings,
        handleNextPage,
        handlePreviousPage,
        setPage,
        setItemType,
        setListingType,
        setSort,
        setOrder,
        setRarity,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return context;
};
