
 var base16chars = '0123456789ABCDEF'.split("");
 var base16inv = new Array;

function base16_Init()
{
	var i,s="";
	for(i=0;i<256;i++){
		base16inv[i]=0;
	}
	for (i=0; i < base16chars.length; i++) 
	{ 
	  base16inv[base16chars[i].charCodeAt(0)] = i; 
	}
	for(i=0;i<255;i++){
		s+=base16inv[i]+",";
	} s+=base16inv[i];
	//s+=']';//alert(s);
	return s;
}
 
 function base16_encode(s)
{//alert("encode");
  // the result/encoded string, the padding string, and the pad count
	var r = "";
	var n,c;  
  
  // increment over the length of the string, 1 character at a time
  for (c = 0; c < s.length; c += 1) {
    // we add newlines after every 76 output characters, according to the MIME specs
    if (c > 0 && (c * 2) % 64 == 0) { 
      r += "\r\n"; 
    }
   
    n = [(s.charCodeAt(c)>>4) & 15,s.charCodeAt(c) & 15];
    // those two 4-bit numbers are used as indices into the base16 character list
    r += base16chars[n[0]] + base16chars[n[1]];
  }
  return r;
}

function base16_decode(s)
{//alert("decode");
	// remove/ignore any characters not in the base32 characters list
	//  or the pad character -- particularly newlines
	s = s.replace(new RegExp('[^'+base16chars.join("")+'=]', 'g'), "");
	var r = "";
 
	var n;
	// increment over the length of this encoded string, two characters at a time
	for (var c = 0; c < s.length; c += 2) {
		n = (base16inv[s.charCodeAt(c  )] << 4) + (base16inv[s.charCodeAt(c+1)] );
		r += String.fromCharCode(n & 255);
	}
	// remove any zero pad that was added to make this a multiple of 40 bits
	return r;
}