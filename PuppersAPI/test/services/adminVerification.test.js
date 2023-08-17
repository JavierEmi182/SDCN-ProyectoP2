/* eslint-disable no-undef */
/**
 * @file Testing user and password verification of admin
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const adminVerification = require('../../services/Verification/adminVerification.js');

describe('Testing adminVerification functions', () => {
  it('TC-01 checkCredentials admin: all correct', async () => {
    const res = await adminVerification.checkCredentials('testUser1', 'h8mm9_@w8R+)');
    expect(res).toBe(true);
  });

  it('TC-02 checkCredentials admin: password incorrect', async () => {
    const res = await adminVerification.checkCredentials('testUser1', 'aaaaa5547');
    expect(res).toBe(false);
  });

  it('TC-03 checkCredentials admin: user incorrect', async () => {
    const res = await adminVerification.checkCredentials('mario25', 'h8mm9_@w8R+)');
    expect(res).toBe(false);
  });

  it('TC-04 checkCredentials admin: empty parameters', async () => {
    const res = await adminVerification.checkCredentials('', '');
    expect(res).toBe(false);
  });

  it('TC-05 checkUser admin: user correct', async () => {
    const res = await adminVerification.checkUser('testUser1');
    expect(res).toBe(true);
  });

  it('TC-06 checkUser admin: user incorrect', async () => {
    const res = await adminVerification.checkUser('juanMera');
    expect(res).toBe(false);
  });

  it('TC-07 checkUser admin: empty parameters', async () => {
    const res = await adminVerification.checkUser('');
    expect(res).toBe(false);
  });
});
