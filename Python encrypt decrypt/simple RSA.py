
# getting gcd
def gcd(a,b): 
    if b==0: 
        return a 
    else: 
        return gcd(b,a%b) 

p = int(input('Enter the value of p = ')) 
q = int(input('Enter the value of q = ')) 
no = int(input('Enter the value of text = ')) 

#Calculate the Modulus
n = p*q 
#Calculate totient
t = (p-1)*(q-1) 
#Calculate e
for e in range(2,t): 
    if gcd(e,t)== 1: 
        break
#Calculate private key d  
for i in range(1,10): 
    x = 1 + i*t 
    if x % e == 0: 
        d = int(x/e) 
        break
    
cipher = 0 
cipher =pow(no,e) 
cipher = cipher % n 
  
decrypt = 0
decrypt = pow(cipher,d) 
decrypt = decrypt % n 
 
print('n = '+str(n)+' e = '+str(e)+' t = '+str(t)+' d = '+str(d)+' cipher text = '+str(cipher)+' decrypted text = '+str(decrypt)) 

