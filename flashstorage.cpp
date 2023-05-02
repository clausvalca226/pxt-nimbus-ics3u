#include "pxt.h"

#if MICROBIT_CODAL
	#include "MicroBit.h"
#endif

namespace flashstorage {
	/* Stores the given key/value pair. */
	//% help=flashstorage/store-data
	//% parts="flashstorage"
	//% blockGap=8
	//% group="micro:bit (V2)"
	int storeData(String key, String value) {
		if (NULL == key || NULL == value)
			return DEVICE_INVALID_PARAMETER;
		#if MICROBIT_CODAL
			return uBit.storage.put(MSTR(key), MSTR(value), MSTR(value).length());
		#else
			return DEVICE_NOT_SUPPORTED;
		#endif
	}

	/* Retrieves the given key/value pair. */
	//% help=flashstorage/get-data
	//% parts="flashstorage"
	//% blockGap=8
	//% group="micro:bit (V2)"
	String getData(String key) {
		if (NULL == key)
			return "DEVICE_INVALID_PARAMETER";
		KeyValuePair* temp;
		#if MICROBIT_CODAL
			temp = uBit.storage.get(MSTR(key));
			return temp->value;
		#else
			return "DEVICE_NOT_SUPPORTED";
		#endif
	}
}
