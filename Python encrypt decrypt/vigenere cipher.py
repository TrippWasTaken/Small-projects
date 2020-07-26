import string

mykey = ""
code_text = ""

source = string.ascii_uppercase

shift = 1
matrix = [source[(i + shift) % 26] for i in range(len(source))]


def decrypt(code_text):
    control = 0
    plaintext = []

    for x, i in enumerate(code_text.upper()):
        if i not in source:
            plaintext.append(i)
            continue
        else:
            control = 0 if control % len(mykey) == 0 else control
            result = (matrix.index(i) - matrix.index(mykey[control])) % 26
            plaintext.append(source[result])
            control += 1

    return plaintext


print('Enter one line of your text')
code_text = input()

print('Enter your key')
mykey = input()

decrypted = decrypt(code_text)
print("Decoded text: {0}".format(''.join(decrypt(code_text)).lower()))
