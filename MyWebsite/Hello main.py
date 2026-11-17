# userName = "Vishnu"
# password ="12345"
# userLogin = False
# while userLogin == False:
#  userEnteredUsername = input("Enter your username: ")
#  userEnteredPassword = input("Enter password: ")
#  if(userEnteredUsername == userName):
#     if(userEnteredPassword == password):
#       print("Success")
#       userLogin = True
#     else:
#       print("Password is incorrect")
#  else:
#     print("Username is incorrect")


# userName = "Vishnu"
# password ="12345"
# userEnteredUsername = input("Enter your username: ")
# userEnteredPassword = input("Enter password: ")
# if userName == userEnteredUsername:
#     if password == userEnteredPassword:
#         print("Succesfull")
#     else:
#         print("Password is wrong")
# else:
#     print("Username is wrong")


# userName = ["Anupallavi","Midhun","Jacob","Fathima"]
# password = ["12345","james@123","python","java","javascript"]
# userEnteredUserName = input("Enter username: ")
# userName.append("Gopika")#(userEnteredUserName)#add.append
# if userEnteredUserName in userName:#in
#     print("Username available")
#     index = userName.index(userEnteredUserName)
#     userEnteredPassword = input("Enter password: ")
#     correctPassword = password[index]
#     if (correctPassword == userEnteredPassword):
#         print("Success")
#     else:
#         print("Password is incorrect")
# else:
#     print("Username not available")


# def correctPassword(password):
#     truePassword = "Jhon"
#     if password == truePassword:
#         print("Password is correct")
#     else:
#         print("Password is incorrect")
# userEnteredPassword = input("Enter password: ")
# correctPassword(userEnteredPassword)


# userName=["Vishnu","Ganga","Gayathri","Sanjay"]
# password =["12345","instagram","manga","cr7"]
# def loginCheck(userEnteredUserName,userEnteredPassword):
#     if userEnteredUserName in userName:
#       index = userName.index(userEnteredUserName)
#       correctPassword = password[index]
#       if correctPassword == userEnteredPassword:
#         print("Login Successfull--")
#       else:
#         print("Password is incorrect")
#     else:
#        print("Username is not found")
# userEnteredUserName = input("Enter username: ")
# userEnteredPassword = input("Enter password: ")
# loginCheck(userEnteredUserName,userEnteredPassword)


# userName=["Vishnu","Ganga","Gayathri","Sanjay"]
# password =["12345","instagram","manga","cr7"]
# def loginCheck(userEnteredUserName,userEnteredPassword):
#     if userEnteredUserName in userName:
#       index = userName.index(userEnteredUserName)
#       correctPassword = password[index]
#       if correctPassword == userEnteredPassword:
#         return "Login Successfull--"
#       else:
#         return "Password is incorrect"
#     else:
#        return "Username is not found"
# userEnteredUserName = input("Enter username: ")
# userEnteredPassword = input("Enter password: ")
# print(loginCheck(userEnteredUserName,userEnteredPassword))


