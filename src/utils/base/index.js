import date from './date';
import format from './format';
import interval from './interval';
import string from './string';
import type from './type';
import validate from './validate';
import wxutil from './wxutil';

const comm = Object.assign({}, date, format, interval, string, type, validate, wxutil);

export default comm;
