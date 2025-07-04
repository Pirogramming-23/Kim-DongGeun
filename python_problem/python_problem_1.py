num = 0
current = 1
turn = 0  # 0: playerA, 1: playerB

while current <= 31:
    while True:
        try:
            num = int(input("부를 숫자의 개수를 입력하세요(1, 2, 3만 입력 가능) : "))
            if num not in [1, 2, 3]:
                print("1,2,3 중 하나를 입력하세요")
                continue
            break
        except ValueError:
            print("정수를 입력하세요")
    for i in range(num):
        if current > 31:
            break
        if turn == 0:
            print(f"playerA : {current}")
        else:
            print(f"playerB : {current}")
        current += 1
    if current > 31:
        break
    turn = 1 - turn

if turn == 1:
    print("playerA win!")
else:
    print("playerB win!")
