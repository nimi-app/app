export interface TwitterData {
  _id: string;
  username: string;
  createdAt: string;
  deleted: boolean;
  description: string;
  followersCount: number;
  followingCount: number;
  location: string;
  name: string;
  profileImageUrl: string;
  protected: boolean;
  twitterId: string;
  updatedAt: string;
  url: string;
  verified: boolean;
  id: string;
}

export interface ImportTwitterDataModalProps {
  onClose: () => void;
  onDataImport: (data: TwitterData) => void;
}
