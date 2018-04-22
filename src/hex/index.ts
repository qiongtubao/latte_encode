

module Hex {
  /**
   * @public
   * @desc 字符串转成hex
   * @method encode
   * @param {string} str
   * @return {string} 
   * @example
   *    let hex = Hex.encode('hello')
   *    console.log(hex); //
   */
  export function encode(str: string): string {
    let HEX = "0123456789ABCDEF",
      radix = 16,
      len = str.length,
      encodeStr = "";
    for (let i = 0; i < len; i++) {
      let num = parseInt(str.charCodeAt(i).toString(), 10);
      encodeStr += "%" + Math.floor(num / radix) + HEX.charAt(num % radix);
    }
    return encodeStr;
  }
  /**
  * @public
  * @desc hex字符串解码
  * @method encode
  * @param {string} str
  * @return {string} 
  * @example
  *    let hex = Hex.decode('hello')
  *    console.log(hex); //
  */
  export function decode(str: string): string {
    var arr = str.split("%"),
      str = "";
    for (var i = 1; arr[i]; i++) {
      str += String.fromCharCode(parseInt(arr[i], 16));
    }
    return str;
  }
}
export default Hex;