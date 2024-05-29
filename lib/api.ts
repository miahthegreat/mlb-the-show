import apiClient from './axios';
import { ApiResponse, ItemDetail, Listing } from '@/types';

export const getCaptains = async (page: number): Promise<ApiResponse> => {
  try {
    const response = await apiClient.get<ApiResponse>(`/captains?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching captains:', error);
    throw error;
  }
};

export const getItems = async (page: number, type: string = "mlb_card"): Promise<ApiResponse> => {
  try {
    const response = await apiClient.get<ApiResponse>(`/items?type=${type}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const getItemByUUID = async (uuid: string): Promise<ItemDetail> => {
  try {
    const response = await apiClient.get<ItemDetail>(`/item?uuid=${uuid}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching item:', error);
    throw error;
  }
};

export const getListings = async (page: number, type: string = "mlb_card", sort: string = "rank", order: string = 'asc', rarity: string = 'diamond'): Promise<ApiResponse> => {
  try {
    const response = await apiClient.get<ApiResponse>(`/listings?type=${type}&page=${page}&sort=${sort}&order=${order}&rarity=${rarity}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const getListingByUUID = async (uuid: string): Promise<Listing> => {
  try {
    const response = await apiClient.get<Listing>(`/listing?uuid=${uuid}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching item:', error);
    throw error;
  }
};


