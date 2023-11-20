import Provider, { errors } from 'oidc-provider';
import { URL } from 'url';
import Account from './account.js';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;

const corsProp = 'allowedCorsOrigins';

const configuration = {
  clients: [
    {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uris: [process.env.REDIRECT_URI],
      post_logout_redirect_uris: [process.env.BASE_URI],
      [corsProp]: ['http://localhost:3000'],
      grantTypes: ['']
    },
  ],
  features: {},
  extraClientMetadata: {
    properties: [corsProp],
    validator: (ctx, key, value, metadata) => {
      if (key === corsProp) {
        if (value === undefined) {
          metadata[corsProp] = [];
          return;
        }
        if (!Array.isArray(value) || !value.every((val) => isOrigin(val))) {
          throw new errors.InvalidClientMetadata(`${corsProp} must be an array of origins`);
        }
      }
    },
  },
  clientBasedCORS: (ctx, origin, client) => {
    return client[corsProp].includes(origin);
  },
  jwks: {
    "keys": [
      {
        "p": "3yUObln0-f7817KtED4AvUCh1dHQmWmbeWMNFs_iGZEMwvtyhv5lMpjGEeAJjZbURV_JBaCgvKEo9ku2IFf-moZBWCUmKkWVKrwHQmlcIQRQoMk10_kg-WQpI7IrULBjxEpr6rw6tmApft5ToyLznIfH3c2szxwprIcJ9L63IVU",
        "kty": "RSA",
        "q": "pFzSRfdXkInakmKK4D_l5H0-rOqpMEP8I-PVAzylfg3lIzmuIHmpMyce1oiagkA_ezz0GHdR3BqPJ10RAnd_OD6ULoe_ibMqHJLGlDj9PjcHmtdJ2vH1X76Sljql8KhGs4C9qU-vJfC4vqIyk1pIjQIl6NyfLfS-l4kA6Tk_YMk",
        "d": "IA3k6XprxTxowmj_XpHaI-NEq2nF2eTQhp5fn0JH5ioGIEAvEIAM3QBWM7maXlxn4Vo5I-CZOdlC_aRi1SSRwUEU5VDn-r_LnNQAVya2xWu1ixU_gfzkta4QHciJ2g6qtl4zvY1NiyA1Af4QIHAVNrnxPv1QrjrIl_zcbbr3qVSfrPK5Ri1MU3t6sRRR3xYy1boKIJNyB6bflvRnUPV2EfTe0cScpzFuMc2WP68PYftrUazTnsXA7SH5skzRl5_SzmWVykoVJrqEC2o25C8KC38i-urlxNufUH5qyHvQ7qSW5M0WUI6hXjatIklmmG63fhHp0ItYuySgANrCvlTLYQ",
        "e": "AQAB",
        "use": "sig",
        "kid": "csca-key",
        "qi": "wVbMNqKXA0Qc6CukjtuNz1Yt5Zc-Gms92-JvAdy3bDP1bdh1mkhbaHVa-3WOr6VVDgK6j7w8ZNMEtuuJ8du4scUGScEERMWIckEZY5bDadqU-IK2RimIuz6p2R6PDajXK_i-IQBYHYbuFKhbtFPMvzSYWXOR84ctaSaGWuStsR4",
        "dp": "bvwrVU-AvObKMy43TaDJFVgUJhkZO3R_U7ykQfhbaIPwaPpPWD0ncCb0POfFWJrwMSEXBqmByNAPY5D8oNGjXI_x6Dlx5gx9yKeEpM9qdzGCOLZbA3cho2jh3VM8oAFbXcH2MuYz_YmOmf9Scg1sRSpziipGDSzgvWLc3NIOm5E",
        "alg": "RS256",
        "dq": "i1Nro4eRoKJat2_1DTbdJ5zLfkTE-ncGy12b-cx09K_OpteENV8sAIKO74iIgRT5OvxmZj7vE0coRlPr0U1-eC0D65WC1bUcY3BACPFuKkj3l1gb8Q7d0zV2iQZaF_BtTkg5fcZgUCcIVACmIqaLjYxemlA6Vvh6f3XRYeH3SZE",
        "n": "j0Sl2UO1wjvHe3uNiCYAw36asqW1Bo8H3TPf53N52n8173RRF1O9QWeR3sotAik1DawQ79iP53YW2h7pGmem2gqeHWW4hGeJo7SZEJ8wYYiq78JzQBlB_Lsw3WPyJeUXgBO6_4MMWdbVj5VUAOlZhqVV3JpmnZMj_ww2BzeqdOF-gbFTI7lIteq-k4ivnyBd9wSPj9NqO1_WXVFayvwqeZ3iED6RknSgSxuSleHeGbbgUbzg1zdujPHv0Sbg9pbZdaE9amThpBDOxTKL-CiPlbuMKnT5ubhnoOvvZmTuE0sU8rTeFWSLBkhYlIYojdgIutIi9gTZKV-ZnqSIizQLvQ"
      }
    ]
  }
  //findAccount: Account.findAccount
};

function isOrigin(value) {
  if (typeof value !== 'string') {
    return false;
  }
  try {
    const { origin } = new URL(value);
    return value === origin;
  } catch (err) {
    return false;
  }
}

const oidc = new Provider(`http://localhost:${port}`, configuration);

oidc.listen(port, () => {
  console.log(`oidc-provider listening on port ${port}, check http://localhost:${port}/.well-known/openid-configuration`);
});
