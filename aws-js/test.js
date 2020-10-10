var Config = {
	accesskey: "",
	accesssecret: "",
	region: "",
};

function InputCred(){
	Config.accesskey = document.getElementById("accesskey").value;
	Config.accesssecret = document.getElementById("accesssecret").value;
	Config.region = document.getElementById("region").value;
    alert("Your credential has been configured!");
}

function ShowCred(){
	document.getElementById("AccessKey").innerText = "AccessKey:" + Config.accesskey;
	document.getElementById("AccessSecret").innerText = "AccessSecret:" + Config.accesssecret;
}
    