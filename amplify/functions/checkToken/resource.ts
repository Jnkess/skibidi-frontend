import { defineFunction } from '@aws-amplify/backend';

export const checkToken = defineFunction({
  name: 'checkToken',
  entry: './handler.ts',
});