var Config = {
	accesskey: "",
	accesssecret: "",
	region: "",
	az: "",
	keypair: "",
    amiid: "",
};

var s3param = {
	verticarpm: "",
	mcrpm: "",
	s3bucket: "",
};

function InputCred(){
	Config.accesskey = document.getElementById("accesskey").value;
	Config.accesssecret = document.getElementById("accesssecret").value;
	Config.region = document.getElementById("region").value;
	switch (Config.region) {
		case "us-east-1":
            Config.az = 'us-east-1a';
            Config.amiid = 'ami-0947d2ba12ee1ff75';
            break;
		//case "us-east-2":
		//case "us-west-1":
		//case "us-west-2":
		//case "af-south-1":
		//case "ap-east-1":
		//case "ap-south-1":
		//case "ap-northeast-1":
		case "ap-northeast-2":
			Config.az = 'ap-northeast-2a';
            Config.amiid = 'ami-03b42693dc6a7dc35';
			break;
		//case "ap-southeast-1":
		//case "ap-southeast-2":
		//case "ca-central-1":
		//case "eu-central-1":
		//case "eu-west-1":
		//case "eu-west-2":
		//case "eu-south-1":
		//case "eu-west-3":
		//case "eu-north-1":
		//case "me-south-1":
		//case "sa-east-1":
    }
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
