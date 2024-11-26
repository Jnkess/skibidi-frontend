import { defineFunction } from '@aws-amplify/backend';

export const logout = defineFunction({
  name: 'logout',
  entry: './handler.ts',
});