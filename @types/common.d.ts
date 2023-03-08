interface IResult<T> {
  results: T[];
  totalCount: number;
}

interface IEntity {
  _id?: mongoose.Types.ObjectId | string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  slug?: string;
  keyword?: string;
}
