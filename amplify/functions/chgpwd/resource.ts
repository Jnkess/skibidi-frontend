import { defineFunction } from '@aws-amplify/backend';

export const chgpwd = defineFunction({
  name: 'chgpwd',
  entry: './handler.ts',
});