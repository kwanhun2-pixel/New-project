export type Platform = "tourpass" | "sto" | "nft" | "pr" | "admin";

export interface Venue {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  priceKRW: number;
  location: string;
  phase: 1 | 2 | 3;
  coordinates?: { lat: number; lng: number };
}

export interface STOProduct {
  id: string;
  title: string;
  description: string;
  totalAmount: number;
  minInvestment: number;
  expectedReturn: number;
  deadline: Date;
  status: "upcoming" | "active" | "closed";
  issuer: string;
  contractAddress?: string;
}

export interface NFTTicket {
  tokenId: string;
  venueId: string;
  eventDate: Date;
  seat?: string;
  grade: string;
  ownerAddress: string;
  metadataUri: string;
  isUsed: boolean;
  mintedAt: Date;
}

export interface PressRelease {
  id: string;
  title: string;
  content: string;
  authorId: string;
  status: "draft" | "pending" | "distributed";
  distributedAt?: Date;
  targetJournalists: string[];
  tags: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  kycStatus: "none" | "pending" | "approved" | "rejected";
  walletAddress?: string;
  preferredLanguage: string;
  preferredCurrency: string;
}
