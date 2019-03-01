import ConverterTool from "./components/ConverterTool";

class Convert{
    static convertByType(inValue, inType, outType){
      switch(inType){
        case 'dec':
          switch(outType){
            case 'hex': return Convert.decToHex(inValue);
            case 'bin': return Convert.decToBin(inValue);
            case 'ascii': return Convert.decToAscii(inValue); //needs implement
            default: return inValue;
          }
        case 'hex':
          switch(outType){
            case 'dec': return Convert.hexToDec(inValue);
            case 'bin': return Convert.hexToBin(inValue);
            case 'ascii': return Convert.hexToAscii(inValue);
            default: return inValue;
          }

        case 'bin':
          switch(outType){
            case 'dec':return Convert.binToDec(inValue);
            case 'hex':return Convert.binToHex(inValue);
            case 'ascii': return Convert.binToAscii(inValue); 
            default: return inValue;
          }

        case 'ascii':
          switch(outType){
            case 'dec':return Convert.asciiToDec(inValue); // needs implement
            case 'hex':return Convert.asciiToHex(inValue);
            case 'bin':return Convert.asciiToBin(inValue);
            default: return inValue;
          }
        default: return inValue;
      }
    }

    static asciiToDec(ascii){
      return Convert.binToDec(Convert.asciiToBin(ascii));
    }

    static decToAscii(dec){
      return Convert.binToAscii(Convert.decToBin(dec));
    }

    static binToAscii(bin){
      return Convert.hexToAscii(Convert.binToHex(bin));
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
      var c0 = b0.length > b1.length ? b0 : b1, c1 = b0.length < b1.length ? b0 : b1;
      if(c0.length === c1.length){
        c0 = b0;
      }
      let result = '';

      for(let i = c0.length -1, j = c1.length -1; i >=  0; i--){
     
        let firstTerm = parseInt(c0[i],2);
        let secondTerm = (j < 0 ?  0 : parseInt(c1[j],2));
        
        let sum = firstTerm + secondTerm;
        result = `${(sum === 2 ? 0 : sum)}${result}`;

           j--;
      }

      return result;
    }

    static batchXor(arr){
      switch(arr.length){
        case 0: 
        case 1: return '0';
        default:
          let result = Convert.xor(arr[1], arr[0]);
          for(let i = 2; i < arr.length; i++){
            result = Convert.xor(arr[i], result);
          }
          return result;
      }
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