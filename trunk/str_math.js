var n_add=0,n_cmp=0;

function trim_leading_zeros(x)
{
	x=x.replace(/^0+/,'');
	if(x==""){x="0";}
	return x;
}

function str_le(x,y)
{var nx,ny,n,a,b,i;
 var res="";
 var tmp;
	//alert("str_le("+x+","+y+")");
	n_cmp++;
	if(x=="NaN" || y=="NaN"){return 0;}
   if(x=="INF"){return 0;} 
   if(y=="INF"){return 1;}   
	if(x==undefined){x="0";}
	if(y==undefined){y="0";}
	nx=x.length;
	ny=y.length;
	n=Math.max(nx,ny);
	//alert("str_le:\nnx="+nx+"  ny="+ny);
	for(i=0;i<n;i++){
		if(i>=n-nx){a=parseInt(x.charAt(i+nx-n));}else{a=parseInt(0);}
		if(i>=n-ny){b=parseInt(y.charAt(i+ny-n));}else{b=parseInt(0);}
		//alert(a+" ? "+b);
		if(a>b){return 0;}
		if(a<b){return 1;}
		if((i+1)==n && a==b){return 0;}
	}
	return 1;
}

function str_leq(x,y)
{var nx,ny,n,a,b,i;
 var res="";
 var tmp;
	//alert("str_leq("+x+","+y+")");
	n_cmp++;
	if(x=="NaN" || y=="NaN"){return 0;}
   if(x=="INF" && y!="INF"){return 0;} 
   if(y=="INF"){return 1;} 
	if(x==undefined){x="0";}
	if(y==undefined){y="0";}
	nx=x.length;
	ny=y.length;
	n=Math.max(nx,ny);
	//alert("str_add:\nnx="+nx+"  ny="+ny);
	for(i=0;i<n;i++){
		if(i>=n-nx){a=parseInt(x.charAt(i+nx-n));}else{a=parseInt(0);}
		if(i>=n-ny){b=parseInt(y.charAt(i+ny-n));}else{b=parseInt(0);}
		//alert(a+" ? "+b);
		if(a>b){return 0;}
		if(a<b){return 1;}
		//if((i+1)==n && a==b){return 0;}
	}
	return 1;
}

function str_add(x,y)
{var nx,ny,n,i;
 var res="";
 var tmp;
	//alert("str_add("+x+","+y+")");
	n_add++;
	//return x+"+"+y;
	if(x=="NaN" || y=="NaN"){return "NaN";}
   if(x=="INF" || y=="INF"){return "INF";} 
	if(x=="0"){return y;}
	if(y=="0"){return x;}
	if(x==undefined){x="0";}
	if(y==undefined){y="0";}
	nx=x.length-1;
	ny=y.length-1;
	//alert("str_add:\nnx="+nx+"  ny="+ny);
	z=0;
	while(z>0 || nx>=0 || ny>=0){
		//alert("["+nx+","+ny+"]"+z+"/"+res);
		if(nx>=0){z+=parseInt(x.charAt(nx));}
		if(ny>=0){z+=parseInt(y.charAt(ny));}
		if(z>9){
			tmp=String(z)+"x";
			res=tmp.charAt(1)+res;
			z=parseInt(tmp.charAt(0));//parseInt(z.charAt(0));
		}else{
			res=z+res;
			z=0;
		}
		nx--;
		ny--;
	}
	//alert("str_add("+x+","+y+")= "+res);
	return res;
}

function str_sub(x,y)
{var nx,ny,a,b,i;
 var res="";
 var tmp;
	//alert("str_sub("+x+","+y+")");
	n_add++;
	if(x=="NaN" || y=="NaN"){return "NaN";}
   if(x=="INF" || y=="INF"){return "INF";}  
	if(x==undefined){x="0";}
	if(y==undefined){y="0";}
	if(y=="0"){return x;}
	nx=x.length;
	ny=y.length;
	tmp=parseInt(0);
	while(nx>0 || ny>0){
		if(nx>0){a=parseInt(x.charAt(nx-1));nx--;}else{a=parseInt(0);}
		if(ny>0){b=parseInt(y.charAt(ny-1));ny--;}else{b=parseInt(0);}
		//alert(a+" ? "+b);
		if(b+tmp<=a){
			res=(a-b-tmp)+res;
			tmp=0;
		}else{
			a+=parseInt(10);
			res=(a-b-tmp)+res;
			tmp=1;
		}
	}
	return trim_leading_zeros(res);
}

function str_mul(x,y)
{var nx,ny,n,i;
 var res="";
 var tmp,c,a,b;
	//alert("str_mul("+x+","+y+")");
	if(x==undefined){x="0";}
	if(y==undefined){y="0";}
	if(x=="NaN" || y=="NaN"){return "NaN";}
   if(x=="INF" || y=="INF"){return "INF";}  
	if(x=="0" || y=="0"){return "0";}
	if(x=="1"){return y;}
	if(y=="1"){return x;}
	nx=x.length-1;
	ny=y.length-1;
	//n=Math.max(nx,ny);
	//alert("str_mul:\nnx="+nx+"  ny="+ny);
	z=0;res="0";tmp="";
	while(ny>=0){
		c=y.charAt(ny);
		nx=x.length-1;b="";
		while(nx>=0){
			a=parseInt(x.charAt(nx))*parseInt(c);
			if(a>0){res=str_add(res,a+tmp+b);}
			b+="0";
			nx--;
		}
		tmp+="0";
		ny--;
	}
	//while(nx>=0){res=x.charAt(nx)+res;nx--;}
	//while(ny>=0){res=y.charAt(ny)+res;ny--;}
	//alert("str_mul:\nres= "+res);
	return res;
}

function str_div2(x,y)
{var nx,ny,n,i;
 var res="";
 var c,a,b;
	//alert("str_div("+x+","+y+")");
	if(x==undefined){x="0";}
	if(y==undefined){y="0";}
	if(x=="NaN" || y=="NaN"){return new Array("NaN","NaN");}
	if(x=="INF" && y=="INF"){return new Array("1","0");}
	if(x=="INF"){return new Array("INF","NaN");}
	if(y=="INF"){return new Array("0","NaN");}
	if(x=="0" && y=="0"){return new Array("1","0");}
	if(y=="0"){return new Array("INF","INF");}
	if(x=="0"){return new Array("0","0");}
	if(y=="1"){return new Array("x","0");}
	if(str_le(x,y)=="1"){return new Array("0",x);}
	a=trim_leading_zeros(x);
	b=trim_leading_zeros(y);
	res="0";
	while(str_leq(b,a)==1){
		nx=a.length;
		ny=b.length;
		c="1";
		for(i=ny;i<nx;i++){b=b+"0";c=c+"0";}
		if(str_leq(b,a)==0){b=b.substr(0,b.length-1);c=c.substr(0,c.length-1);}
		res=str_add(res,c);
		a=str_sub(a,b);
		b=y;
	}
	//alert("str_div:\nres= "+res);
	return new Array(res,a);
}

function str_div(x,y)
{var nx,ny,n,i;
 var res="";
 var c,a,b;
	//alert("str_div("+x+","+y+")");
	if(x==undefined){x="0";}
	if(y==undefined){y="0";}
	if(x=="NaN" || y=="NaN"){return "NaN";}
	if(x=="INF" && y=="INF"){return "1";}
	if(x=="INF"){return "INF";}
	if(y=="INF"){return "0";}
	if(x=="0" && y=="0"){return "1";}
	if(y=="0"){return "INF";}
	if(x=="0"){return "0";}
	if(y=="1"){return x;}
	if(str_le(x,y)=="1"){return "0";}
	a=trim_leading_zeros(x);
	b=trim_leading_zeros(y);
	res="0";
	while(str_leq(b,a)==1){
		nx=a.length;
		ny=b.length;
		c="1";
		for(i=ny;i<nx;i++){b=b+"0";c=c+"0";}
		if(str_leq(b,a)==0){b=b.substr(0,b.length-1);c=c.substr(0,c.length-1);}
		res=str_add(res,c);
		a=str_sub(a,b);
		b=y;
	}
	//alert("str_div:\nres= "+res);
	return res;
}

function str_mod(x,y)
{var nx,ny,n,i;
 var res="";
 var c,a,b;
	//alert("str_mod("+x+","+y+")");
	if(x==undefined){x="0";}
	if(y==undefined){y="0";}
	if(x=="NaN" || y=="NaN"){return "NaN";}
	if(x=="INF" && y=="INF"){return 0;}
	if(x=="INF"){return "INF";}
	if(y=="INF"){return x;}
	if(x=="0" && y=="0"){return "0";}
	if(y=="0"){return "INF";}
	if(x=="0"){return "0";}
	if(y=="1"){return x;}
	if(str_le(x,y)=="1"){return x;}
	a=trim_leading_zeros(x);
	b=trim_leading_zeros(y);
	//res="0";
	while(str_leq(b,a)==1){
		nx=a.length;
		ny=b.length;
		c="1";
		for(i=ny;i<nx;i++){b=b+"0";c=c+"0";}
		if(str_leq(b,a)==0){b=b.substr(0,b.length-1);c=c.substr(0,c.length-1);}
		//res=str_add(res,c);
		a=str_sub(a,b);
		b=y;
	}
	//alert("str_div:\nres= "+res);
	return a;
}

function str_pow(x,y)
{var v=new Array("0","0");
 var res="";
 var c,a,b;
	//alert("str_pow("+x+","+y+")");
	if(x==undefined){x="0";}
	if(y==undefined){y="0";}
	if(x=="NaN" || y=="NaN"){return "NaN";}
	if(y=="0"){return "1";}
	if(x=="INF" || y=="INF"){return "INF";}
	if(x=="0"){return "0";}
	if(y=="1"){return x;}
	a=trim_leading_zeros(x);
	v[0]=trim_leading_zeros(y);//alert(v);
	res="1";
	while(parseInt(v[0])>0){
		//alert(v);
		v=str_div2(v[0],"2");//alert(v);
		if(v[1]=="1"){res=str_mul(res,a);}
		a=str_mul(a,a);
	}
	//alert("str_pow:\nres= "+res);
	return res;
}