var Config = {
	accesskey: "",
	accesssecret: "",
	region: "",
};

var s3param = {
    verticarpm: "",
    mcrpm: "",
    s3bucket: "",
}

function InputCred(){
	Config.accesskey = document.getElementById("accesskey").value;
	Config.accesssecret = document.getElementById("accesssecret").value;
	Config.region = document.getElementById("region").value;
	alert("Your credential has been configured!");
	AwsConfig();
	var ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });
	detecteon();
	describeInstances();
}

function ShowCred(){
	document.getElementById("AccessKey").innerText = "AccessKey:" + Config.accesskey;
	document.getElementById("AccessSecret").innerText = "AccessSecret:" + Config.accesssecret;
}

function InvalidCrendentialHandler() {
	alert("The provided Credential is invalid!");
}