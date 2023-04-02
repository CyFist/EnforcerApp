import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export function Link(route) {
  return React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to={route} {...props} role={undefined} />
  ));
}

export function getLines(str) {
  // This uses RegEx to match new lines.
  // We use || [] because it would otherwise fail if there weren't
  // any line breaks yet.
  return (str.match(/[\r\n]/g) || []).length;
}

export function shuffleObject(obj) {
  // new obj to return
  let newObj = {};
  // create keys array
  var keys = Object.keys(obj);
  // randomize keys array
  keys.sort(function (a, b) {
    return Math.random() - 0.5;
  });
  // save in new array
  keys.forEach(function (k) {
    newObj[k] = obj[k];
  });
  return newObj;
}
