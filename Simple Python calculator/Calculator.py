from tkinter import *
# Konrad Knecht C16395636
# Simple 4 function calculator with a GUI using tkinter

# Creating frame for calculator
def frame(source, side):
    storeObj = Frame(source, borderwidth=4, bd=4, bg="powder blue")
    storeObj.pack(side=side, expand=YES, fill=BOTH)
    return storeObj


# Creating Button
def button(source, side, text, command=None):
    storeObj = Button(source, text=text, command=command)
    storeObj.pack(side=side, expand=YES, fill=BOTH)
    return storeObj


class calculator(Frame):
    def __init__(self):
        Frame.__init__(self)
        self.option_add('*Font', 'arial 20 bold')
        self.pack(expand=YES, fill=BOTH)
        self.master.title('Calculator')

        display = StringVar()
        Entry(self, relief=FLAT, textvariable=display,
              justify='right',
              bd=30, bg="powder blue").pack(side=TOP, expand=YES, fill=BOTH)

        # adding the clear button
        for clearButton in (["C"]):
            erase = frame(self, TOP)
            for ichar in clearButton:
                button(erase, LEFT, ichar, lambda store_obj=display, q=ichar: store_obj.set(''))

        # adding the input buttons
        for numButton in ("789/", "456*", "123-", "0.+"):
            FunctionNum = frame(self, TOP)
            for iEquals in numButton:
                button(FunctionNum, LEFT, iEquals,
                       lambda store_obj=display, q=iEquals: store_obj.set(store_obj.get() + q))

        # adding the equals button
        EqualButton = frame(self, TOP)
        for iEquals in "=":
            if iEquals == '=':
                buttonEquals = button(EqualButton, LEFT, iEquals)
                buttonEquals.bind('<ButtonRelease-1>', lambda e, s=self, store_obj=display: s.calc(store_obj), '+')

            else:
                buttonEquals = button(EqualButton, LEFT, iEquals,
                                      lambda store_obj=display, s=' %s ' % iEquals: store_obj.set(store_obj.get() + s))

    # Action triggers
    @staticmethod
    def calc(display):
        try:
            display.set(eval(display.get()))
        except:
            display.set("ERROR")


if __name__ == '__main__':
    calculator().mainloop()
