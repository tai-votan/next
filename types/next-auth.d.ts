import { DefaultUser } from 'next-auth';
import { RoleShort, ShiftType, StoreShort } from '@/types/common';
// import "next-auth/jwt";

// // Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module 'next-auth/jwt' {
  interface JWT {
    image?: string | null;
    accessToken: string;
  }
}

declare module 'next-auth' {
  interface Session {
    user: DefaultUser & {
      email: string;
      accessToken: string;
      image?: string | null;
    };
    userInfo: {
      address: string;
      createdAt: string;
      email: string;
      externalRefId: string;
      id: string;
      name: string;
      permissions: string[];
      phone: string;
      roleIds: string[];
      roleShorts: RoleShort[];
      shiftType: string;
      status: string;
      storeIds: string[];
      storeShorts: StoreShort[];
      updatedAt: string;
    };
  }

  interface User extends DefaultUser {
    id: string;
    accessToken: string;
    email: string;
    image?: string | null;
    userInfo: Session['userInfo'];
  }
}
