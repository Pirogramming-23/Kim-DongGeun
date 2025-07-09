# 조건문 예제
name = 'Sonja'
if name == 'Ola':
    print('Hey Ola!')
elif name == 'Sonja':
    print('Hey Sonja!')
else:
    print('Hey anonymous!')

print()  # 출력 구분을 위한 줄바꿈

# 여러 조건 처리 예제
volume = 57
if volume < 20:
    print("It's kinda quiet.")
elif 20 <= volume < 40:
    print("It's nice for background music")
elif 40 <= volume < 60:
    print("Perfect, I can hear all the details")
elif 60 <= volume < 80:
    print("Nice for parties")
elif 80 <= volume < 100:
    print("A bit loud!")
else:
    print("My ears are hurting! :(")

print()

# 주석 사용 예제
# volume 값을 바꿔보세요
if volume < 20 or volume > 80:
    volume = 50
    print("That's better!")

print()

# 매개변수 없는 함수 정의 및 호출
def hi_simple():
    print('Hi there!')
    print('How are you?')

hi_simple()

print()

# 매개변수 있는 함수 정의 및 조건 분기
def hi(name):
    if name == 'Ola':
        print('Hi Ola!')
    elif name == 'Sonja':
        print('Hi Sonja!')
    else:
        print('Hi anonymous!')

hi("Ola")
hi("Sonja")
hi("Anyone Else")

print()

# 이름을 이용한 간단한 출력 함수
def hi_simple_name(name):
    print('Hi ' + name + '!')

hi_simple_name("Rachel")

print()

# 리스트와 반복문을 활용한 함수 호출
girls = ['Rachel', 'Monica', 'Phoebe', 'Ola', 'You']
for name in girls:
    hi_simple_name(name)
    print('Next girl')

print()

# 숫자 반복문
for i in range(1, 6):
    print(i)
