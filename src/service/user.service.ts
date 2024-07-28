import { DocumentDefinition } from "mongoose";
import {omit} from "lodash"
import UserModel, { IUser } from "../model/user.model";

export async function createUser(
  input: DocumentDefinition<Omit<IUser, "createdAt" | "updatedAt" | "comparePassword">>
) {
  try {
    return await UserModel.create(input);
  } catch (error: any) {
    throw new Error(`User creation failed: ${error.message}`)
  }
}

export async function validatePassword({email, password}:{email: string, password: string}) {
  const user = await UserModel.findOne({ email });
 
  if(!user) return false;
  
  const isValid = await user.comparePassword(password);
  if(!isValid) return false;
  return omit(user.toJSON(), "password")
  }