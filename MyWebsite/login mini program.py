# def menuItems():
#     print(" ")
#     print("------------MENU-------------")
#     print("1. Login")
#     print("2. Register")
#     print("3. Delete Account")
#     print("4. Exit")
#     print("----------------------------")
#     print(" ")
# userNames =["Ajay","Manu","Gopika","Dhrishya","Vishnu"]
# passwords =["Ajay12","1234","Enter","12345","Vish"]

# def login(userName,password):
#   if userName in userNames:
#      index = userNames.index(userName)
#      if password == passwords[index]:
#       return True
#      else:
#       return False
#   else:
#      False
# def register(userName,password):
#   if userName in userNames:
#        print("Username already available")
#   else:
#        userNames.append(userName)
#        passwords.append(password)
#        print("Account created")
# def delete(userName):
#    if userName in userNames:
#       index = userNames.index(userName)
#       userNames.pop(index)
#       passwords.pop(index)
#       print("Account deleted")
#    else:
#       print("Account not found")

# isRunning = True
# while isRunning == True:
#   menuItems()
#   choice = input("Enter your choice: ")
#   if choice == "1":
#      userName = input("Enter your username: ")
#      password = input("Enter pssword: ")
#      if login(userName,password):
#         print("Welcome ",userName)
#      else:
#         print("Invalid username or password")
#   else:
#      if choice == "2":
#         userName = input("Enter your username: ")
#         password = input("Enter pssword: ")
#         register(userName,password)
#      else:
#         if choice == "3":
#            userName = input(" Enter username to delete: ")
#            delete(userName)
#         else:
#            if choice == "4":
#               isRunning = False