type TypedArray =
  | Uint8Array
  | Int8Array
  | Uint16Array
  | Int16Array
  | Uint32Array
  | Int32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array

const hexadecimal = '0123456789abcdef'
export const hex = {
  encode: (data: string | ArrayBuffer | TypedArray) => {
    if (typeof data === 'string') {
      data = new TextEncoder().encode(data)
    }
    if (data.byteLength === 0) {
      return ''
    }
    // Ensure 'data' is ArrayBuffer or ArrayBufferView (TypedArray)
    let buffer: Uint8Array
    if (ArrayBuffer.isView(data)) {
      buffer = new Uint8Array(data.buffer, data.byteOffset, data.byteLength)
    } else if (data instanceof ArrayBuffer) {
      buffer = new Uint8Array(data)
    } else {
      throw new TypeError('Expected ArrayBuffer or TypedArray')
    }
    let result = ''
    for (const byte of buffer) {
      result += byte.toString(16).padStart(2, '0')
    }
    return result
  },
  decode: (data: string | ArrayBuffer | TypedArray) => {
    if (!data) {
      return ''
    }
    if (typeof data === 'string') {
      if (data.length % 2 !== 0) {
        throw new Error('Invalid hexadecimal string')
      }
      if (!new RegExp(`^[${hexadecimal}]+$`).test(data)) {
        throw new Error('Invalid hexadecimal string')
      }
      const result = new Uint8Array(data.length / 2)
      for (let i = 0; i < data.length; i += 2) {
        result[i / 2] = parseInt(data.slice(i, i + 2), 16)
      }
      return new TextDecoder().decode(result)
    }
    return new TextDecoder().decode(data)
  },
}
