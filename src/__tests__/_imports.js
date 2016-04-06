import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import 'babel-polyfill';
import ws from 'ws';
import LiveApi from '../LiveApi';
