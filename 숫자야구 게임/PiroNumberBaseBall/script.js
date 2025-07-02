// 시도 횟수 초기화
let attempts = 9;
document.getElementById("attempts").innerText = attempts;

// 랜덤 숫자 3개 (중복X) 생성 함수
function getRandomThreeNumbers(min , max) {
  const nums = new Set();
  while (nums.size < 3) {
    nums.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(nums);
}

// 정답 숫자 저장
const answer = getRandomThreeNumbers(0, 9);

//입력칸 초기화
const number1InputBox = document.getElementById('number1');
const number2InputBox = document.getElementById('number2');
const number3InputBox = document.getElementById('number3');
number1InputBox.value = "";
number2InputBox.value = "";
number3InputBox.value = "";

//결과창 초기화
const resultDisplay = document.querySelector('.result-display');
resultDisplay.innerHTML = "";

number1InputBox.addEventListener('input', function() {
  if (this.value.length === 1) number2InputBox.focus();
});
number2InputBox.addEventListener('input', function() {
  if (this.value.length === 1) number3InputBox.focus();
});
number3InputBox.addEventListener('input', function() {
  if (this.value.length === 1) this.blur();
});

// 입력칸이 모두 채워졌는지 확인
function checkInputBoxes() {
    return [number1InputBox, number2InputBox, number3InputBox]
      .every(input => input.value !== "");
  }
  
  // 사용자의 한 숫자(input)가 정답에서 맞는지 확인
  function checkOneAnswer(position, userInput) {
    const correct = answer[position];
    if (correct === userInput) return "S"; // 자리와 값 둘 다 같으면 Strike
    if (answer.includes(userInput)) return "B"; // 값만 있고 자리는 다르면 Ball
    return "O"; // 값도 자리에 없음 → Out
  }
  
  // 전체 3자리 숫자를 검사해서 [S, B, O] 배열로 반환
  function checkAnswer() {
    const inputs = [
      Number(number1InputBox.value),
      Number(number2InputBox.value),
      Number(number3InputBox.value)
    ];
  
    const result = [0, 0, 0]; // [S, B, O]
  
    inputs.forEach((input, index) => {
      const res = checkOneAnswer(index, input);
      if (res === "S") result[0]++;
      else if (res === "B") result[1]++;
      else result[2]++;
    });
  
    return result;
  }
  
  // 전체 흐름 관리 함수
  function check_numbers() {
    // 입력이 하나라도 비어 있으면 입력칸을 비우고 종료
    if (!checkInputBoxes()) {
      [number1InputBox, number2InputBox, number3InputBox].forEach(input => input.value = "");
      return;
    }

    // 결과 한 줄을 보여줄 div 생성
    const checkResult = document.createElement("div");
    checkResult.className = "check-result";
    checkResult.style.height = "35px";

    // 1. 사용자 입력 숫자 출력
    const inputText = [number1InputBox.value, number2InputBox.value, number3InputBox.value].join(" ");
    const resultFirst = document.createElement("span");
    resultFirst.innerText = inputText;
    checkResult.appendChild(resultFirst);

    // 2. ":" 기호 추가
    const resultSecond = document.createElement("span");
    resultSecond.innerText = ":";
    checkResult.appendChild(resultSecond);

    // 3. 정답 비교
    const [strike, ball, out] = checkAnswer(); // [S, B, O]
    const submitButton = document.querySelector(".submit-button");

    // 4. 결과 표시
    if (out === 3) {
      const outDiv = document.createElement("div");
      outDiv.className = "out";
      outDiv.innerText = " O ";
      Object.assign(outDiv.style, {
        width: "20px", height: "30px", borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center"
      });
      checkResult.appendChild(outDiv);
    } else {
      const resultContainer = document.createElement("div");
      Object.assign(resultContainer.style, {
        width: "64px", height: "35px", display: "flex", alignItems: "center"
      });

      // strike 개수 + 아이콘
      const sCount = document.createElement("span");
      sCount.innerText = String(strike);
      const sIcon = document.createElement("span");
      sIcon.className = "strike";
      sIcon.innerText = " S ";
      Object.assign(sIcon.style, {
        width: "20px", height: "30px", borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center"
      });
      resultContainer.appendChild(sCount);
      resultContainer.appendChild(sIcon);

      // ball 개수 + 아이콘
      const bCount = document.createElement("span");
      bCount.innerText = String(ball);
      const bIcon = document.createElement("span");
      bIcon.className = "ball";
      bIcon.innerText = " B ";
      Object.assign(bIcon.style, {
        width: "20px", height: "30px", borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center"
      });
      resultContainer.appendChild(bCount);
      resultContainer.appendChild(bIcon);

      checkResult.appendChild(resultContainer);
    }

    // 5. 결과 출력
    resultDisplay.appendChild(checkResult);

    // 6. 시도 횟수 감소
    attempts--;
    document.getElementById("attempts").innerText = `${attempts}`;

    // 7. 성공/실패 판단
    const resultImg = document.getElementById("game-result-img");
    if (strike === 3) {
      resultImg.src = "./success.png"; // 성공
      submitButton.disabled = true;
    } else if (attempts === 0) {
      resultImg.src = "./fail.png"; // 실패
      submitButton.disabled = true;
    }

    // 8. 입력칸 비우기
    [number1InputBox, number2InputBox, number3InputBox].forEach(input => input.value = "");
  }
