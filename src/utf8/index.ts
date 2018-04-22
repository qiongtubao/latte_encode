/**
 * 参考了解utf8的基础
 * http://www.fmddlmyy.cn/text6.html
 * 
 */

module Utf8 {
  let stringFromCharCode = String.fromCharCode;
  /**
   * @desc unicode 2进制数组转换成utf8
   * @method
   * @param  {Array<number>}  array
   * @return {string} 
   * @example
   *    	let Utf8 = require("latte_encode").utf8;
	 *	    console.log(Utf8.ucs2encode([108,97,116,116,101,30340,19990,30028])) ;//"latte的世界"
   */
  export function ucs2encode(array: Array<number>): string {
    let length = array.length;
    let index = -1;
    let value;
    let output = '';
    while (++index < length) {
      value = array[index];
      if (value > 0xFFFF) {
        value -= 0x10000;
        output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
        value = 0xDC00 | value & 0x3FF;
      }
      output += stringFromCharCode(value);
    }
    return output;
  };
  /**
  * @desc utf8编码转成unicode2进制数组
  * @method
  * @param  {string} str
  * @return {Array<number>}  
  * @example
  *    	let Utf8 = require("latte_encode").utf8;
  *	    console.log(Utf8.ucs2decode("latte的世界")) ;//[108,97,116,116,101,30340,19990,30028]
  */
  export function ucs2decode(str: string): Array<number> {
    let output = [];
    let counter = 0;
    let length = str.length;
    let value;
    let extra;
    while (counter < length) {
      value = str.charCodeAt(counter++);
      if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
        // high surrogate, and there is a next character
        extra = str.charCodeAt(counter++);
        if ((extra & 0xFC00) == 0xDC00) { // low surrogate
          output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
        } else {
          // unmatched surrogate; only append this code unit, in case the next
          // code unit is the high surrogate of a surrogate pair
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }
    return output;
  }
  /**
   * @desc code码转成byte字符串
   * @private
   * @param {number} codePoint 
   * @param {number} shift 
   * @return {string}
   */
  function createByte(codePoint: number, shift: number): string {
    return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
  }

  function encodeCodePoint(codePoint: number): string {
    if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
      return stringFromCharCode(codePoint);
    }
    let symbol = '';
    if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
      symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
    }
    else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
      symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
      symbol += createByte(codePoint, 6);
    }
    else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
      symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
      symbol += createByte(codePoint, 12);
      symbol += createByte(codePoint, 6);
    }
    symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
    return symbol;
  }


  /**
  * @desc 字符串转成uf8
  *	@method encode
  *	@param {string}  str   utf8string
  *	@return {string} byteString
  *	@since 0.0.1
  *   @static
  *	@sync
  *	@example
      let Utf8 = require("latte_lib").utf8;
      log(Utf8.encode("latte的世界")) ;//latteçä¸ç
  *
  */
  export function encode(str: string): string {
    let codePoints = ucs2decode(str);
    let byteString = '';
    for (let i = 0, len = codePoints.length; i < len; i++) {
      let codePoint = codePoints[i];
      byteString += encodeCodePoint(codePoint);
    }
    return byteString;
  }



  /**
   * @desc utf8转成unicode字符串
	*	@method decode
	*	@sync
	*	@static
	*	@param {string}  byteString   bytes
	*	@return {string}
	*	@since 0.0.1
	*	@example
	*		let Utf8;
	*
	*		let Utf8 = require("latte_utf8");
	*
	*
	*		console.log(Utf8.decode("latteçä¸ç")) ; //latte的世界
	*/
  export function decode(byteString) {
    let byteArray = ucs2decode(byteString);
    let byteCount = byteArray.length;
    let byteIndex = 0;
    let codePoints = [];
    let tmp;
    function readContinuationByte() {
      if (byteIndex >= byteCount) {
        throw Error('Invalid byte index');
      }

      var continuationByte = byteArray[byteIndex] & 0xFF;
      byteIndex++;

      if ((continuationByte & 0xC0) == 0x80) {
        return continuationByte & 0x3F;
      }

      // If we end up here, it’s not a continuation byte
      throw Error('Invalid continuation byte');
    }
    function decodeSymbol() {
      let byte1;
      let byte2;
      let byte3;
      let byte4;
      let codePoint;

      if (byteIndex > byteCount) {
        throw Error('Invalid byte index');
      }

      if (byteIndex == byteCount) {
        return false;
      }

      // Read first byte
      byte1 = byteArray[byteIndex] & 0xFF;
      byteIndex++;

      // 1-byte sequence (no continuation bytes)
      if ((byte1 & 0x80) == 0) {
        return byte1;
      }

      // 2-byte sequence
      if ((byte1 & 0xE0) == 0xC0) {
        let byte2 = readContinuationByte();
        codePoint = ((byte1 & 0x1F) << 6) | byte2;
        if (codePoint >= 0x80) {
          return codePoint;
        } else {
          throw Error('Invalid continuation byte');
        }
      }

      // 3-byte sequence (may include unpaired surrogates)
      if ((byte1 & 0xF0) == 0xE0) {
        byte2 = readContinuationByte();
        byte3 = readContinuationByte();
        codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
        if (codePoint >= 0x0800) {
          return codePoint;
        } else {
          throw Error('Invalid continuation byte');
        }
      }

      // 4-byte sequence
      if ((byte1 & 0xF8) == 0xF0) {
        byte2 = readContinuationByte();
        byte3 = readContinuationByte();
        byte4 = readContinuationByte();
        codePoint = ((byte1 & 0x0F) << 0x12) | (byte2 << 0x0C) |
          (byte3 << 0x06) | byte4;
        if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
          return codePoint;
        }
      }

      throw Error('Invalid UTF-8 detected');
    }
    while ((tmp = decodeSymbol()) !== false) {
      codePoints.push(tmp);
    }
    return ucs2encode(codePoints);
  }
}

export default Utf8