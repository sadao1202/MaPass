// 暗号学的に安全なランダム文字選択
function secureRandomChoice(set) {
  const cryptoObj = window.crypto || window.msCrypto;
  const rnd = new Uint32Array(1);
  do {
    cryptoObj.getRandomValues(rnd);
  } while (rnd[0] >= 0xffffffff - (0xffffffff % set.length));
  return set[rnd[0] % set.length];
}

function generatePassword(length = 16) {
  const lowers = "abcdefghijklmnopqrstuvwxyz";
  const uppers = lowers.toUpperCase();
  const digits = "0123456789";
  const symbols = "!\"#$%&()=~|@[];:+-*<>?_>.,'";

  const all = lowers + uppers + digits + symbols;

  // 必ず各文字種を最低 1 文字含める
  const pool = [
    secureRandomChoice(lowers),
    secureRandomChoice(uppers),
    secureRandomChoice(digits),
    secureRandomChoice(symbols),
  ];

  for (let i = pool.length; i < length; i++) {
    pool.push(secureRandomChoice(all));
  }

  // Fisher–Yates シャッフル
  for (let i = pool.length - 1; i > 0; i--) {
    const j = secureRandomChoice(Array.from({ length: i + 1 }, (_, k) => k));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.join("");
}

async function copyPassword() {
  const passField = document.getElementById("pass");
  try {
    await navigator.clipboard.writeText(passField.value);
    alert("コピーしました！");
  } catch (err) {
    console.error(err);
    alert("コピーに失敗しました");
  }
}

// 表示/非表示トグル
document.getElementById("toggleVisible").addEventListener("click", () => {
  const passField = document.getElementById("pass");
  passField.type = passField.type === "password" ? "text" : "password";
});

document.addEventListener("DOMContentLoaded", () => {
  const passField = document.getElementById("pass");

  document.getElementById("genBtn").addEventListener("click", () => {
    passField.value = generatePassword();
  });

  document.getElementById("copyBtn").addEventListener("click", copyPassword);
});
