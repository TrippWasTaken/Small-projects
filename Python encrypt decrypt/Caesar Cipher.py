
key = 'abcdefghijklmnopqrstuvwxyz'


def decrypt(n, plaintext):
    result = ''

    for l in plaintext.lower():
        try:
            i = (key.index(l) - n) % 26
            result += key[i]
        except ValueError:
            result += l

    return result.lower()


print('Enter one line of your text')
text = input()
print('Enter your key')
offset = int(input())

decrypted = decrypt(offset, text)
print('Decrypted:', decrypted)
