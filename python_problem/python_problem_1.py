num = 0
current = 1

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
    print(f"playerA : {current}")
    current += 1
