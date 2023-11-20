const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors')

const app = express();
const PORT = 5000;

const corsOptions = {
    origin: 'http://localhost:3000'
}

const private_key = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCPRKXZQ7XCO8d7
e42IJgDDfpqypbUGjwfdM9/nc3nafzXvdFEXU71BZ5Heyi0CKTUNrBDv2I/ndhba
HukaZ6baCp4dZbiEZ4mjtJkQnzBhiKrvwnNAGUH8uzDdY/Il5ReAE7r/gwxZ1tWP
lVQA6VmGpVXcmmadkyP/DDYHN6p04X6BsVMjuUi16r6TiK+fIF33BI+P02o7X9Zd
UVrK/Cp5neIQPpGSdKBLG5KV4d4ZtuBRvODXN26M8e/RJuD2ltl1oT1qZOGkEM7F
Mov4KI+Vu4wqdPm5uGeg6+9mZO4TSxTytN4VZIsGSFiUhiiN2Ai60iL2BNkpX5me
pIiLNAu9AgMBAAECggEAIA3k6XprxTxowmj/XpHaI+NEq2nF2eTQhp5fn0JH5ioG
IEAvEIAM3QBWM7maXlxn4Vo5I+CZOdlC/aRi1SSRwUEU5VDn+r/LnNQAVya2xWu1
ixU/gfzkta4QHciJ2g6qtl4zvY1NiyA1Af4QIHAVNrnxPv1QrjrIl/zcbbr3qVSf
rPK5Ri1MU3t6sRRR3xYy1boKIJNyB6bflvRnUPV2EfTe0cScpzFuMc2WP68PYftr
UazTnsXA7SH5skzRl5/SzmWVykoVJrqEC2o25C8KC38i+urlxNufUH5qyHvQ7qSW
5M0WUI6hXjatIklmmG63fhHp0ItYuySgANrCvlTLYQKBgQDfJQ5uWfT5/vzXsq0Q
PgC9QKHV0dCZaZt5Yw0Wz+IZkQzC+3KG/mUymMYR4AmNltRFX8kFoKC8oSj2S7Yg
V/6ahkFYJSYqRZUqvAdCaVwhBFCgyTXT+SD5ZCkjsitQsGPESmvqvDq2YCl+3lOj
IvOch8fdzazPHCmshwn0vrchVQKBgQCkXNJF91eQidqSYorgP+XkfT6s6qkwQ/wj
49UDPKV+DeUjOa4geakzJx7WiJqCQD97PPQYd1HcGo8nXRECd384PpQuh7+Jsyoc
ksaUOP0+Nwea10na8fVfvpKWOqXwqEazgL2pT68l8Li+ojKTWkiNAiXo3J8t9L6X
iQDpOT9gyQKBgG78K1VPgLzmyjMuN02gyRVYFCYZGTt0f1O8pEH4W2iD8Gj6T1g9
J3Am9DznxVia8DEhFwapgcjQD2OQ/KDRo1yP8eg5ceYMfcinhKTPancxgji2WwN3
IaNo4d1TPKABW13B9jLmM/2Jjpn/UnINbEUqc4oqRg0s4L1i3NzSDpuRAoGBAItT
a6OHkaCiWrdv9Q023Secy35ExPp3Bstdm/nMdPSvzqbXhDVfLACCju+IiIEU+Tr8
ZmY+7xNHKEZT69FNfngtA+uVgtW1HGNwQAjxbipI95dYG/EO3dM1dokGWhfwbU5I
OX3GYFAnCFQApiKmi42MXppQOlb4en910WHh90mRAoGBAMFWzDailwNEHOgrpI7b
jc9WLeWXPhprPdvibwHct2wz9W3YdZpIW2h1Wvt1jq+lVQ4Cuo+8PGTTBLbrifHb
uLHFBknBBETFiHJBGWOWw2nalPiCtkYpiLs+qdkejw2o1yv4viEAWB2G7hSoW7RT
zL80mFlzkfOHLWkmhlrkrbEe
-----END PRIVATE KEY-----`

const validateToken = (req, res, next) => {
    var token = req.headers['authorization'];
    token = token.split(' ')[1]
    console.log(token)
  
    if (!token) {
        return res.status(403).send('Een token is vereist voor authenticatie');
    }
  
    try {
        const decoded = jwt.verify(token, private_key);
        req.user = decoded;
    } catch (err) {
        console.error(err)
        return res.status(401).send('Ongeldig Token');
    }
  
    return next();
};
  
app.use(cors(corsOptions));
app.use(express.json());

app.get('/api', validateToken, cors(corsOptions), (req, res) => {
    res.json({"message": "Authenticate succesvol"});
});
  

app.listen(PORT, () => {
    console.log(`api draait op port ${PORT}`);
});

