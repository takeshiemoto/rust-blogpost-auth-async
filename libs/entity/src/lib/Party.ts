export interface Party {
  id?: string;
  name: string;
  startTime?: Date;
  endTime?: Date | null;
  createdAt?: Date;
  updateAt?: Date | null;
}
