
 var base32chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ23456789'.split("");
 var base32inv = new Array;

function base32_Init()
{
	var i,s="";
	for(i=0;i<256;i++){
		base32inv[i]=0;
	}
	for (i=0; i < base32chars.length; i++) 
	{ 
	  base32inv[base32chars[i].charCodeAt(0)] = i; 
	}
	for(i=0;i<255;i++){
		s+=base32inv[i]+",";
	} s+=base32inv[i];
	//s+=']';//alert(s);
	return s;
}
 
 function base32_encode(s)
{//alert("encode");
  // the result/encoded string, the padding string, and the pad count
  var r = ""; 
  var p = ""; 
  var c = s.length % 5;
 
  // add a right zero pad to make this string a multiple of 5 characters
  if (c > 0) { 
    for (; c < 5; c++) { 
      p += '='; 
      s += "\0"; 
    } 
  }
  if(p.length>=4){p+="==";}
  else{if(p.length>=2){p+="=";}}
  var n0,n1,n;
  // increment over the length of the string, three characters at a time
  for (c = 0; c < s.length; c += 5) {
    // we add newlines after every 76 output characters, according to the MIME specs
    if (c > 0 && (c / 5 * 8) % 64 == 0) { 
      r += "\r\n"; 
    }
   
    n0 = (s.charCodeAt(c) << 24) + (s.charCodeAt(c+1) << 16) + (s.charCodeAt(c+2) << 8) + s.charCodeAt(c+3);
	n1 = s.charCodeAt(c+4);
   
    n = [(n0 >>> 27) & 31, (n0 >>> 22) & 31, (n0 >>> 17) & 31, (n0 >>> 12) & 31, (n0 >>> 7) & 31, (n0 >>> 2) & 31, ((n0 << 3) + (n1 >>> 5)) & 31, n1 & 31];
	//alert((n0&15)+","+n1+":"+(((n0 << 3) + (n1 >>> 5)) & 255)+","+(n1 & 31));
    // those eight 5-bit numbers are used as indices into the base32 character list
    r += base32chars[n[0]] + base32chars[n[1]] + base32chars[n[2]] + base32chars[n[3]]
	   + base32chars[n[4]] + base32chars[n[5]] + base32chars[n[6]] + base32chars[n[7]];
  }
   // add the actual padding string, after removing the zero pad
  return r.substring(0, r.length - p.length) + p;
}

function base32_decode(s)
{//alert("decode");
	// remove/ignore any characters not in the base32 characters list
	//  or the pad character -- particularly newlines
	s = s.replace(new RegExp('[^'+base32chars.join("")+'=]', 'g'), "");
 
	// replace any incoming padding with a zero pad (the 'A' character is zero)
	var n = s.indexOf('='),p="";//padding
	if(n>0){
		n=s.length-n;
		switch(n){
		case 1:p="A";n=1;break;
		case 3:p="AAA";n=2;break;
		case 4:p="AAAA";n=3;break;
		case 6:p="AAAAAA";n=4;break;
		}
	}
	var r = ""; 
	s = s.substr(0, s.length - p.length) + p;
 
	var n0,n1;
	// increment over the length of this encoded string, eight characters at a time
	for (var c = 0; c < s.length; c += 8) {
		n0 = (base32inv[s.charCodeAt(c  )] << 27) + (base32inv[s.charCodeAt(c+1)] << 22) + (base32inv[s.charCodeAt(c+2)] << 17)
		+ (base32inv[s.charCodeAt(c+3)] << 12) + (base32inv[s.charCodeAt(c+4)] <<  7) + (base32inv[s.charCodeAt(c+5)] <<  2)
		+ ((base32inv[s.charCodeAt(c+6)] >>> 3) & 3);
		n1 = (base32inv[s.charCodeAt(c+6)] << 5) + (base32inv[s.charCodeAt(c+7)]);//alert(r+":"+base32inv[s.charCodeAt(c+6)]+","+base32inv[s.charCodeAt(c+7)]+"-"+n1);
		r += String.fromCharCode((n0 >>> 24) & 255, (n0 >>> 16) & 255, (n0 >>> 8) & 255, n0 & 255, n1 & 255);
	}
	// remove any zero pad that was added to make this a multiple of 40 bits
	return r.substring(0, r.length - n);
}