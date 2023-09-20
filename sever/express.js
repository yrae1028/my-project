// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const xlsx = require('xlsx');

const workbook = xlsx.readFile('server/database.xlsx');
const whitelistSheet = workbook.Sheets['Sheet1'];
const whitelistData = xlsx.utils.sheet_to_json(whitelistSheet);

app.use(express.urlencoded({ extended: true }));
app.use(express.static('client')); // 정적 파일 서빙 (HTML, JS, CSS)

app.post('/authenticate', (req, res) => {
  const submittedWalletAddress = req.body.walletAddress;

  const found = whitelistData.find(item => item['Wallet Address'] === submittedWalletAddress);

  if (found && found['Authenticated'] === true) {
    res.sendFile(__dirname + '/client/mint/index.html'); // 인증이 성공하면 mint 폴더의 index.html 페이지로 리다이렉트
  } else {
    res.status(403).send('Authentication Failed! Invalid or unauthenticated wallet address.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
