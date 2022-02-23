window.onload = function () {
  const input = document.querySelector("input");
  const btn = document.querySelector("button");
  const result = document.querySelector(".result");
  const numbers = [];
  const answer = [];
  const tryNum = [];
  let out = 0;

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    let inputValue = input.value;
    input.value = "";
    if (!checkInput(inputValue)) {
      return;
    }
    homeRun(inputValue);
    checkStrikeAndBall(inputValue);
    tryNum.push(inputValue);
    checkDefeat();
  });

  const randomNumber = () => {
    for (let i = 0; i < 9; i++) {
      numbers.push(i + 1);
    }
  };

  const answerNumber = () => {
    for (let i = 0; i < 3; i++) {
      const index = Math.floor(Math.random() * numbers.length);
      answer.push(numbers[index]);
      numbers.splice(index, 1);
    }
    console.log("answer : " + answer);
  };

  const settingGame = () => {
    randomNumber();
    answerNumber();
  };

  settingGame();

  const checkInput = (value) => {
    if (value.length !== 3) {
      return alert("3자리 숫자를 입력하세요.");
    } else if (new Set(value).size !== 3) {
      return alert("중복된 숫자는 허용하지 않습니다.");
    } else if (tryNum.includes(value)) {
      return alert("이미 시도한 숫자 입니다.");
    } else if (isNaN(value)) {
        return alert("숫자를 입력하세요.")
    }
    return true;
  };

  const checkStrikeAndBall = (value) => {
    let strike = 0;
    let ball = 0;

    for (let i = 0; i < answer.length; i++) {
      const index = value.indexOf(answer[i]);
      if (index > -1) {
        index == i ? (strike += 1) : (ball += 1);
      }
    }
    result.append(
      `${value} : ${strike} strike ${ball} ball`,
      document.createElement("br")
    );
  };

  const checkDefeat = () => {
    if (tryNum.length >= 9 || out == 3) {
      const message = document.createTextNode(
        `out!!!!! answer : ` + answer.join("")
      );
      result.appendChild(message);
    }
  };

  const homeRun = (value) => {
    if (answer.join("") === value) {
      result.textContent = "HomeRun!!!!!👍👍👍 ";
    }
    return;
  };
};
