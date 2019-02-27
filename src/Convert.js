class Convert{
    static convertByType(inValue, inType, outType){
      switch(inType){
        case 'dec':
          switch(outType){
            case 'hex':
            return Convert.decToHex(inValue);
            case 'bin':
            return Convert.decToBin(inValue);
            case 'ascii':
            return Convert.decToAscii(inValue); //needs implement
          }
        case 'hex':
          switch(outType){
            case 'dec':
            return Convert.hexToDec(inValue);
            case 'bin':
            return Convert.hexToBin(inValue);
            case 'ascii':
            return Convert.hexToAscii(inValue);
          }

        case 'bin':
          switch(outType){
            case 'dec':
            return Convert.binToDec(inValue);
            case 'hex':
            return Convert.binToHex(inValue);
            case 'ascii': 
            return Convert.binToAscii(inValue); // needs implement
          }

        case 'ascii':
          switch(outType){
            case 'dec':
            return Convert.asciiToDec(inValue); // needs implement
            case 'hex':
            return Convert.asciiToHex(inValue);
            case 'bin':
            return Convert.asciiToBin(inValue);
          }
      }
    }
    static decToHex(dec){
        const r = dec % 16;
        const d = Math.floor(dec / 16);
        const map = {10: 'a', 11: 'b', 12: 'c', 13: 'd', 14: 'e', 15: 'f'};
        return `${d !== 0 ? Convert.decToHex(d) : ''}${r < 10 ? r : map[r]}`;
    };
    
    static decToBin(dec){
        const r = dec % 2;
        const d = Math.floor(dec / 2);
        return `${d !== 0 ? Convert.decToBin(d) : ''}${r}`;
    };
    
    static hexToDec(hex){
      
      let dec = 0;
      const map = {'a': 10, 'b': 11, 'c': 12, 'd': 13, 'e': 14, 'f': 15};
      for(let i = 0; i < hex.length; i++ ){
        dec += parseInt('abcdef'.includes(hex[i]) ? map[hex[i]] : hex[i]) * Math.pow(16, hex.length - 1 - i);
      }
      return dec;
    }
    
    
    static asciiToHex(ascii){
      let hex = '';
      for(let i = 0; i < ascii.length; i++ ){
        let decimal = ascii.charCodeAt(i);
        hex += Convert.decToHex(decimal); 
      }
      return hex;
    }
     
    static hexToBin(hex){
      let bin = '';
      
      for(let i = 0; i < hex.length; i++){
        let nibble = Convert.decToBin(Convert.hexToDec(hex[i]));
        while(nibble.length < 4)
          nibble = '0' + nibble;
        bin += nibble;
      }
      
      return bin;
      
    }
    
    static asciiToBin(ascii){
      return Convert.hexToBin(Convert.asciiToHex(ascii));
    }
    
    static xor(b0, b1){
      let result = '';
      for(let i = 0; i < b0.length; i++){
        let sum = parseInt(b0[i],2) + parseInt(b1[i],2);
        result += (sum === 2 ? 0 : sum);
      }
      return result;
    }

    static batchXor(arr){
      let result = '';
      for(let i = 1; i < arr.length; i++){
        result = Convert.xor(arr[i], arr[i-1]);
      }
      return result;
    }
    
    static binToDec(bin){
      let rev = bin.split('').reverse().join('');
      let dec = 0;
      
      for(let i = 0; i < rev.length; i++){
        dec += parseInt(rev[i]) * Math.pow(2, i);
      }
      return dec;
    }
    
    static binToHex(bin){
      let hex = '';
      
      for(let i = 0; i < bin.length; i+=4){
        let nibble = Convert.decToHex(Convert.binToDec(bin.substr(i, 4)));
        hex += nibble;
      }
      
      
      return hex;
    }

    static hexToAscii(hex){
        let ascii = '';
        for(let i = 0; i < hex.length; i+=2){
            ascii += String.fromCharCode(Convert.hexToDec(hex.substr(i, 2)));
        }
        return ascii;
    }
    
    
};

export default Convert;