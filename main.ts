let y = flashstorage.getData("test")
let x = 0
if ("KEY NOT FOUND".compare(y) != 0){
    x = parseInt(y)
    basic.showString("Key found")
    control.waitMicros(4000)
}
basic.showNumber(x)
control.waitMicros(4000)
while(true){
    if(input.buttonIsPressed(Button.A)){
        x++
        basic.showNumber(flashstorage.storeData("test",""+x))
    }
    if (input.buttonIsPressed(Button.B)) {
        basic.showString(flashstorage.getData("test"))
    }
}