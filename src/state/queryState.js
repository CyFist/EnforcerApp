import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import _ from 'lodash';

export const queryAtom = atom({
  key: 'queryAtom',
  default: ''
});
