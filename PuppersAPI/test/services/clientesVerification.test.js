/* eslint-disable no-undef */
/**
 * @file Testing user and password verification of clientes
 * @author Gabriel Maldonado <gabamald@espol.edu.ec>
 */

const clientesVerification = require('../../services/Verification/clientesVerification.js');

describe('Testing clientesVerification functions', () => {
  it('TC-08 checkCredentials cliente: all correct', async () => {
    const res = await clientesVerification.checkCredentials('cgullyes3', 'jA9<Em,&IRa`|Gvu');
    expect(res).toBe(true);
  });

  it('TC-09 checkCredentials cliente: password incorrect', async () => {
    const res = await clientesVerification.checkCredentials('cgullyes3', '14521451');
    expect(res).toBe(false);
  });

  it('TC-10 checkCredentials cliente: user incorrect', async () => {
    const res = await clientesVerification.checkCredentials('mario25', 'BSBw2i4NbD');
    expect(res).toBe(false);
  });

  it('TC-11 checkCredentials cliente: empty parameters', async () => {
    const res = await clientesVerification.checkCredentials('', '');
    expect(res).toBe(false);
  });

  it('TC-12 checkUser cliente: user correct', async () => {
    const res = await clientesVerification.checkUser('cgullyes3');
    expect(res).toBe(true);
  });

  it('TC-13 checkUser cliente: user incorrect', async () => {
    const res = await clientesVerification.checkUser('juan78541');
    expect(res).toBe(false);
  });

  it('TC-14 checkUser cliente: empty parameters', async () => {
    const res = await clientesVerification.checkUser('');
    expect(res).toBe(false);
  });
});
