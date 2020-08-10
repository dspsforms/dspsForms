export interface AuthData {
  email: string;
  name?: string;
  password: string;
  isStaff?: boolean;
  isAdmin?: boolean;

  created?: Date; // tz format
  lastMod?: Date;
}


export interface MongoErr {
  driver?: boolean;
  name?: string;
  index?: number;
  code?: number;
  errmsg?: string;
}

export interface SubmitStatus {
  message: string;
  err: string | MongoErr | {};
  expirationTime?: number ;
}

export interface UserFromRandomKey {
  user?: AuthData;
  emailFromRandomKey?: string;
  err?: string | MongoErr | {};
  message?: string;
  key?: string;
}
