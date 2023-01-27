import { IClass, IGroup, IUser } from "models";

export interface User extends IUser {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ClassType extends IClass {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface Group extends IGroup {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
