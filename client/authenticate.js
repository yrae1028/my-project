// authenticate.js
document.addEventListener('DOMContentLoaded', function () {
    const authenticationForm = document.querySelector('form');
    const walletAddressInput = document.getElementById('walletAddress');
  
    authenticationForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const walletAddress = walletAddressInput.value;
  
      fetch('/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `walletAddress=${encodeURIComponent(walletAddress)}`,
      })
        .then(response => response.text())
        .then(data => {
          const messageElement = document.getElementById('authenticationMessage');
          if (data.includes('Authentication Successful')) {
            messageElement.style.color = 'green';
            messageElement.innerText = data;
            window.location.href = '/mint/mint.html'; // 인증 성공 시 mint 폴더의 index.html 페이지로 이동
          } else {
            messageElement.style.color = 'red';
            messageElement.innerText = data;
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
  });
  