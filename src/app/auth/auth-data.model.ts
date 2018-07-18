export interface AuthData {
  email: string;
  name?: string;
  password: string;
  isStaff?: boolean;
  isAdmin?: boolean;

  created?: Date; // tz format
  lastMod?: Date;
}
