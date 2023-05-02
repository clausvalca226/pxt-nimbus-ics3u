/* Work with flash storage */
//% block="Storage"
//% icon="\uf0ce"
//% color="#378273"
namespace storage {

    /* A key and value to save to flash storage
     * @param key the key to set
     * @param value the value to set.
     * @returns result
     */
    //% block="key $key value $value"
    //% value.shadow=math_number
    //% key.shadow=storage_keyfield
    //% blockId=storagecreatekeyvalue
    //% group="micro:bit (V2)"
    //% weight=80 help=storage/storedata
    export function storedata(key: string, value: any) {
        let temp = "" + value;
        flashstorage.storeData(key, value);
    }
    
    /* Retrieve value
     * @param key the key to get
     * @param value the value to get.
     * @returns result
     */
    //% block="key $key
    //% value.shadow=math_number
    //% key.shadow=storage_keyfield
    //% blockId=storagegetvalue
    //% group="micro:bit (V2)"
    //% weight=80 help=storage/getdata
    export function getdata(key: string): string {
        return flashstorage.getData(key);
    }
}
