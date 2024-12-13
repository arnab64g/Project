import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Auth = (args: string[]) => SetMetadata(ROLES_KEY, args);
