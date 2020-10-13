var Config = {
	accesskey: "",
	accesssecret: "",
	region: "",
	az: "",
	keypair: "",
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
		//case "us-east-1":
		//case "us-east-2":
		//case "us-west-1":
		//case "us-west-2":
		//case "af-south-1":
		//case "ap-east-1":
		//case "ap-south-1":
		//case "ap-northeast-1":
		case "ap-northeast-2":
			Config.az = 'ap-northeast-2a';
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

function handleButton(elem) {
	switch (elem.id) {
		case "0":
			rockSamples++;
			document.getElementById("rocksamples").innerText = "Rock samples:" + rockSamples;
			break;
		case "1":
			paperSamples++;
			document.getElementById("papersamples").innerText = "Paper samples:" + paperSamples;
			break;
		case "2":
			scissorsSamples++;
			document.getElementById("scissorssamples").innerText = "Scissors samples:" + scissorsSamples;
			break;
	}
	label = parseInt(elem.id);
	const img = webcam.capture();
	dataset.addExample(mobilenet.predict(img), label);

}