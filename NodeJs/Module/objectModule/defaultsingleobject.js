function Hello(){
	var name;
	this.setName = function(thyName){
		name = thyName;
	}

	this.sayHello = function(){
		console.log(name);
	}
};

//module.exports  no exports

/*
不可以通过对 exports 直接赋值代替对 module.exports 赋值。
exports 实际上只是一个和 module.exports 指向同一个对象的变量，
它本身会在模块执行结束后释放，但 module 不会，因此只能通过指定
module.exports 来改变访问接口。
*/

/*
，exports 本身仅仅是一个普通的空对象，即 {}，它专门用来声明接口，本
质上是通过它为模块闭包①的内部建立了一个有限的访问接口。因为它没有任何特殊的地方，
所以可以用其他东西来代替，譬如我们上面例子中的 Hello 对象
**/
module.exports = Hello;