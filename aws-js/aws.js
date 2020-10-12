function AwsConfig() {
    var creds = new AWS.Credentials({
	accessKeyId: Config.accesskey, secretAccessKey: Config.accesssecret
	});
	
	AWS.config.credentials = creds;
	AWS.config.update({region: Config.region});    
}

function creates3bucket() {
    s3 = new AWS.S3({apiVersion: '2006-03-01'});
    var bucketParams = {
        Bucket : 'mybucket-zheng-20191223',
    };
    
    // Call S3 to obtain a list of the objects in the bucket
    s3.listObjects(bucketParams, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });
}

function describeInstances() {
	//var creds = new AWS.Credentials({
	//accessKeyId: Config.accesskey, secretAccessKey: Config.accesssecret
	//});
	//
	//AWS.config.credentials = creds;
	//AWS.config.update({region: Config.region});
    //AwsConfig();

	var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
	
	var params = {
	DryRun: false
	};
// Call EC2 to retrieve policy for selected bucket
	ec2.describeInstances(params, function(err, data) {
	if (err) {
        console.log("Error", err.stack);
        InvalidCrendentialHandler();
	} else {
		console.log("Success");
		var json = JSON.parse(JSON.stringify(data));
		console.log(json.Reservations);
        if (document.getElementById("instancelist")) {
            //var f = document.getElementById("instancelist")
            //var childs = document.getElementById("instancelist").childNodes;
            //for(var i = 0; i < childs.length; i++) {
            //    f.removeChild(childs[i]); 
            //}
            $("tr").remove(".test");
        }

		for (var i in json.Reservations) {
			instances = json.Reservations[i].Instances;
			//document.write(instances[0].InstanceId + "<br>");

			var instanceid=document.createTextNode(instances[0].InstanceId);
			var publicip=document.createTextNode(instances[0].PublicIpAddress);
			var privateip=document.createTextNode(instances[0].PrivateIpAddress);
			var state=document.createTextNode(instances[0].State.Name);
			var launchtime=document.createTextNode(instances[0].LaunchTime);
            var r=document.createElement("TR");
            var d1=document.createElement("TD");
            var d2=document.createElement("TD");
            var d3=document.createElement("TD");
            var d4=document.createElement("TD");
            var d5=document.createElement("TD");

            d1.appendChild(launchtime);
            d2.appendChild(instanceid);
            d3.appendChild(publicip);
            d4.appendChild(privateip);
            d5.appendChild(state);

            r.appendChild(d1)
            r.appendChild(d2)
            r.appendChild(d3)
            r.appendChild(d4)
            r.appendChild(d5)


            r.className="test";
			//h.appendChild(privateip);
            t.appendChild(r);


			//document.body.appendChild(publicip);
			//document.body.appendChild(br);
			//document.body.appendChild(privateip);
			//document.body.style.backgroundColor = "yellow";
		}
        document.body.appendChild(t);
	}
	});
}

function CreateInstance() {
    AwsConfig();
    var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
    var userData=`#cloud-config
        repo_update: true
        repo_upgrade: all
        
        packages:
        - httpd
        - dialog
        
        runcmd:
        - [ sh, -c, "amazon-linux-extras install -y lamp-mariadb10.2-php7.2 php7.2" ]
        - systemctl start httpd
        - sudo systemctl enable httpd
        - [ sh, -c, "usermod -a -G apache ec2-user" ]
        - [ sh, -c, "chown -R ec2-user:apache /var/www" ]
        - chmod 2775 /var/www
        - [ find, /var/www, -type, d, -exec, chmod, 2775, {}, \; ]
        - [ find, /var/www, -type, f, -exec, chmod, 0664, {}, \; ]
        `

    var userDataEncoded = btoa(userData);
    // AMI is amzn-ami-2011.09.1.x86_64-ebs
    var instanceParams = {
        ImageId: 'ami-01288945bd24ed49a', 
        //ImageId: 'ami-05dbc2395794a5a52', 
        InstanceType: 't2.micro',
        KeyName: 'home_key_seoul',
        MinCount: 1,
        MaxCount: 1,
        SecurityGroupIds: ["sg-e6c67b86"],
        UserData: userDataEncoded,
    };
    
    // Create a promise on an EC2 service object
    var instancePromise = new AWS.EC2({apiVersion: '2016-11-15'}).runInstances(instanceParams).promise();
    
    // Handle promise's fulfilled/rejected states
    instancePromise.then(
        function(data) {
            console.log(data);
            var instanceId = data.Instances[0].InstanceId;
            console.log("Created instance", instanceId);
        }).catch(
        function(err) {
                console.error(err, err.stack);
                InvalidCrendentialHandler();
        });
}

function TerminateInstances() {
    var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
    var param1 = {
        DryRun: false
	};
    var ids = new Array();
    var param2 = {
        InstanceIds: ids,
        DryRun: false   
    };
    
    ec2.describeInstances(param1, function (err, data) {
        if (err) {
            console.log("Error", err.stack);
            InvalidCrendentialHandler();
        } else {
            console.log("Success");
            var json = JSON.parse(JSON.stringify(data));
            console.log(json.Reservations);
            for (var i in json.Reservations) {
                instances = json.Reservations[i].Instances;
                //document.write(instances[0].InstanceId + "<br>");
                //inst=JSON.stringify(instances[0].InstanceId);

                ids.push(instances[0].InstanceId);
            }
        }


        ec2.terminateInstances(param2, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else
                console.log(data);
            describeInstances();
        });
    });
}

function detecteon() {
    var ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });
    var params = {
        Filters: [
            {
                Name: 'tag:Type',
                Values: [
                    'eon'
                ]
            }
        ]
    };
    ec2.describeVpcs(params, function (err, datalistvpc) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        } else {
            console.log(datalistvpc);
            json = JSON.parse(JSON.stringify(datalistvpc));
            if (json.Vpcs.length != 0) {
                alert("Detect eon vpc existing , the buildeon button will be disabled!")
                $("#buildeon").attr("disabled", true);
            } else {
                console.log("No eon vpc detected");
            }
        }
    });
}