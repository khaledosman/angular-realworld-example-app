export interface CatFact {
  status: {
    verified: boolean;
    sentCount: number;
  };
  _id: string;
  type: string;
  deleted: boolean;
  user: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}