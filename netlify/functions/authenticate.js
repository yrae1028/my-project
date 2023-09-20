// netlify/functions/authenticate.js

exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
      const submittedWalletAddress = JSON.parse(event.body).walletAddress;
      
      // 화이트 리스트에서 주소를 찾아 인증 상태를 확인
      const found = whitelistData.find(item => item['Wallet Address'] === submittedWalletAddress);
  
      if (found && found['Authenticated'] === true) {
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Authentication Successful! You can access the web page.' }),
        };
      } else {
        return {
          statusCode: 403,
          body: JSON.stringify({ message: 'Authentication Failed! Invalid or unauthenticated wallet address.' }),
        };
      }
    }
  
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Bad Request' }),
    };
  };
  