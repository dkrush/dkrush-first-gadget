//class Matrix

//constructor
function toMatrix(obj)
{
	obj.N=0;
	obj.M=0;
	obj.size=0;
	obj.at=at;
	obj.setAt=setAt;
	obj.reset=reset;
	function at(i,j)
	{
		return this[i+j*this.N]; 
	}
	function setAt(val,i,j)
	{
		this[i+j*this.N]=val; 
	}
	function reset(n,m)
	{
		obj.length=0;
		obj.N=n;
		obj.M=m;
		obj.size=n*m;
	}
}

function toMatrix(obj,n,m)
{
	obj.N=n;
	obj.M=m;
	obj.size=n*m;
	obj.at=at;
	obj.setAt=setAt;
	obj.reset=reset;
	function at(i,j)
	{
		return this[i+j*this.N]; 
	}
	function setAt(val,i,j)
	{
		this[i+j*this.N]=val; 
	}
	function reset(n,m)
	{
		obj.length=0;
		obj.N=n;
		obj.M=m;
		obj.size=n*m;
	}
}