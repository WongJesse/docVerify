contract('DocumentVerify', function(accounts){
	it("应该存储文件哈希值", function(done){
		var doc = DocumentVerify.deployed();
		DocumentVerify.new({from: accounts[0]}).then(
		function(doc){
			var tmphash = "0eb3be2db3a534c192be5570c6c42f59";
			doc.documentExists.call(tmphash).then(               //..1
		function(res){
			assert.equal(res,false,"文件已经在区块链中认证！");
		}).then( function(){
			return doc.newDocument.call(tmphash,{from: accounts[0]});    //..2
        }).then( function(result){
			console.log(result);
			assert.equal(result, true, "哈希值存在！");
			done();
}).catch(done);	
}).catch(done);
});	

	it("应该得到认证的文件数目", function(done){
	var doc = DocumentVerify.deployed();
		DocumentVerify.new({from: accounts[0]}).then(
		function(doc){
			var tmphash = "0eb3be2db3a534c192be5570c6c42f59";
			doc.documentExists.call(tmphash).then(
		function(res){
			assert.equal(res,false,"文件已经在区块链中认证！");
		}).then( function(){
			doc.newDocument(tmphash,{from: accounts[0]}); }).then(
			function(){
			return doc.getLatest.call();       //3...得到认证的文件数目（该合约的交易数目）
		}).then( function(result){
			assert.equal(result,1,"认证文件大于1个");
			done();
}).catch(done);	
}).catch(done);
});


	it("应该得到存储的文件信息", function(done){
	var doc = DocumentVerify.deployed();
		DocumentVerify.new({from: accounts[0]}).then(
		function(doc){
			var tmphash = "0eb3be2db3a534c192be5570c6c42f59";
			doc.documentExists.call(tmphash).then(
		function(res){
			assert.equal(res,false,"文件已经在区块链中认证！");
		}).then( function(){
			doc.newDocument(tmphash,{from: accounts[0]}); }).then(
			function(){
			return doc.getDocument.call(1);     //4..返回数组（块号数目，hash，发送账户，接受账户，时间戳）
		}).then( function(result){
			var rs4 = result[4];
			//console.log(rs4);
			var newDate = new Date();
			newDate.setTime(rs4*1000);
			console.log(newDate.toString(),result[0]);
			assert.equal(result[1],tmphash,"验证hash错误");
			assert.equal(result[0],web3.eth.blockNumber,"区块链存储块号错误");
			assert.equal(result[2],accounts[0],"发送者账户错误");
			assert.equal(result[3],accounts[0],"接受者账户错误");
			assert.equal(result[4],rs4,"时间错误");
			done();
}).catch(done);	
}).catch(done);
});


	it("应该得到存储的文件所属转移信息", function(done){
	var doc = DocumentVerify.deployed();
		DocumentVerify.new({from: accounts[0]}).then(
		function(doc){
			var tmphash = "0eb3be2db3a534c192be5570c6c42f59";
			doc.documentExists.call(tmphash).then(
		function(res){
			assert.equal(res,false,"文件已经在区块链中认证！");
		}).then( function(){
			doc.newDocument(tmphash,{from: accounts[0]}); 
			return doc.getDocument.call(1);
		}).then( function(result){
			console.log(result);
			assert.equal(result[2],result[3],"发送接收方账户不同");
		}).then( function(){
			doc.transferDocument(tmphash,accounts[1]); //5..文件所属转移
			return doc.getDocument.call(2);
		}).then(function(result1){
			assert.equal(result1[3], accounts[1],"接收方账户不匹配");
			done();
}).catch(done);	
}).catch(done);
});
});






