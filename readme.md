# Hydra Promoted

[![npm version](https://badge.fury.io/js/hydra-promoted.svg)](https://badge.fury.io/js/hydra-promoted)

This package wraps hydra express and it's all built in typescript it offers
hydra and hydra express interfaces , controllers , middlewares and dependency injection capabilities

## Installation and Prerequisites

First install it by this command
```
 npm i hydra-promoted
```

#### Dependency injection 

also to be able to use dependency injection you will need to install inversify
```
 npm i inversify
```

After that please install this library for decorators dependency injection

```
npm i reflect-metadata
```

then don't forget to  import it in your app.ts (assuming you  are in a typescript project).

```
import  'reflect-metadata';
```

#### Tsconfig changes

Now make sure in your tsconfig.json you have enabled the decorators , emitted their metadata and added reflect-metadata to the types field

```
"experimentalDecorators":  true,
"emitDecoratorMetadata":  true,
"types":  ["reflect-metadata"],
```


# Usage

### Controllers and Middlewares

using hydra-promoted allows you to have controllers in express
so , for example if your code is inside directory called `src`

create a folder called `controllers` and another folder called `middlewares` inside it.
then assuming you are in a typescript project add those lines to your app.ts

In this version we have renewed how you can initialize the controllers and middlewares to prevent dynamic imports since it makes some problems if you are using something like webpack for example 

so here is the new way to initialize the controllers and middlewares 

```
import { Controllers , Middlewares } from 'hydra-promoted';
import { AuthMiddleware } from './middlewares';
import { ExampleController } from './controllers';

// use it like that
Controllers.provide([
    ExampleController
	or 
	{ instance: ExampleController , name: 'TestController' }
]);

Middlewares.provide([
	AuthMiddleware
	or 
	{ instance: AuthMiddleware , name: 'TestMiddleware' }
]);
```
the above lines registers your controllers and middlewares that are in those arrays
so , they can be used later using the Routers.

**IMPORTANT NOTE**
When putting the controller instance like that this will be it's name to be used in making the routers to them .

and note here this is another way to change the instance name if there are two middlewares with the same name you can use this way to change a middlewares name. by specifying the instance and the instance name to be used with in the Routers
` { instance: AuthMiddleware , name: 'TestMiddleware' }`

also it's usually recommended to put the above controller and middleware providers
in separate config files for example `ControllerRegistery.ts` and `MiddlewaresRegistery.ts`


### Example controller

**NOTE** do not forget to register the controller in the controllers provider as explained above

A Controller should look like that for the provider to be able to use it.

```
import { injectable } from 'inversify';
import { AppRequest, AppResponse } from 'hydra-promoted';

@injectable()
export  class  ExampleController  {
	index(req:  AppRequest,  res:  AppResponse)  {
		// your code here
	}
}
```

now how will you route to that controller open the file where your routes exist for example the index.ts file 

### Routing to controllers

this is how to use that controller
```
import { Router } from 'hydra-promoted';

// this will register the '/' to go to the example controller and run // the index function.
Router.get('/', 'ExampleController@index');

module.exports  =  Router.getRouter();
```

### Example middleware

middlewares should look like that

```
import { injectable } from 'inversify';
import { AppRequest, AppResponse } from 'hydra-promoted';

@injectable()
export class TestMiddleware {
	
	handle(req:  AppRequest,  res:  AppResponse,  next:  Function)  {
		console.log('Hello world Middleware');
		return  next();
	}
}
```

### Using middlewares

**NOTE** don't forget to register your middleware using the middleware provider mentioned
in the first section.

middlewares are used like that

```
import { Router } from 'hydra-promoted';

// this will register the '/' to go to the example controller and run // the index function.
Router.get('/', 'TestMiddleware','ExampleController@index');

module.exports  =  Router.getRouter();

```

## Dependency injection

As you have noticed above there were some decorators above the controllers
those helps the dependency injection **DI** inside hydra-promoted to make instances from those controllers and middlewares.

we will now see how to make services and inject them.
you should also know that we are using [inversify js]([http://inversify.io/](http://inversify.io/)) to make all this possible.

Also you may refer to inversify [docs]([http://inversify.io/](http://inversify.io/)) if you have any difficulties understanding.

### Example Service
First we will start making an example service

```
import { injectable } from 'inversify';

@injectable()
export  class  ExampleService  {
	testMe()  {
		console.log('Hello world is an Example service');
	}
}
```

### Register service in the DI container

now you should register the services in the bindings array 
create a file called `DIManager.ts`
which will look like that

```
import { DIManager } from 'hydra-promoted';
import { ExampleService } from '../serviceProviders/ExampleService';

DIManager.registerServices([ExampleService]);
```
as you can notice we have imported the DIManager from the hydra-promoted which will put  that service in the bindings container for inversify js.

### How to inject the service in your controller or any other service

now you want to inject and use your service this is how you can do it in your controller also 
**NOTE** **that any class with the `@injectable` can inject any service as long as it is registered in the DI container as in the above snippet.**

```
import { injectable } from 'inversify';
import { AppRequest, AppResponse } from 'hydra-promoted';
import { ExampleService } from '../serviceProviders/ExampleService';

@injectable()
export  class  ExampleController  {
	// NOTICE here how we injected our service
	constructor(public  testService:  ExampleService)  {}

	index(req:  AppRequest,  res:  AppResponse)  {
		this.testService.testMe();
		return  res.sendOk({
				hello:  'world'
		});
	}
}
```

as easy as that your service instance exists with you in the controller also a service can also be injected in another service.

## Making API requests

This section will explain how to make api requests to other hydra services 
since hydra provide load balancing if we have multiple services of the same service.

we have two methods for making api requests 

### HydraApiRequest

This method is the normal way of requesting we just give it a UMF message 
and then it will send the request 

you can check the UMF message format docs [here]([https://github.com/cjus/umf](https://github.com/cjus/umf)).

#### Example 

```
import { HydraApiRequest } from 'hydra-promoted';

let result = await HydraApiRequest({
	body:  { message: 'some data'},
	to:'serviceName:[method]/route/path'
});
``` 

and the response will just be a json object that looks like that 

```
{
	headers:  { // response headers here},
	result:  { // response body },
	statusCode:  200, 
	statusDescription:  '',
	statusMessage:  'Ok'
}
```
**NOTE: this is the response standard shape so , you will always receive something like the above json in any response from a hydra service**

### HydraSecureApiRequest

This is the second method which provides secure encrypted requests between the hydra services using the Rsa encryption.

#### Example

it's usage is exactly similar to the above method but with additional required field
which is the public key of the service you are going to call.

```
let  result  =  await  HydraSecureApiRequest({
	body:  { message : 'some data' },
	to:  'serviceName:[method]/path/to/router',
	publicKey:  './public.pem'
});
```

as you can see it is the same with the additional field the public key

responses from the HydraSecureApiRequest will be exactly the same as the above method as it will handle any decryption needed to be done on the responses.

### Handling Hydra Secure request from the receiver side 

Now you should be asking what if I am the receiver of the request should I handle everything myself in that case we are exposing a middleware which handles all the decryption logic for you as a receiver for the Rsa encrypted request

middleware is called HandleRsaRequest
#### HandleRsaRequest

this is a normal express middleware which can be used like that 

```
import { HandleRsaRequest } from 'hydra-promoted';

app.use(HandleRsaRequest('./private.pem'));
```
 as you can see it just requires the private key path or object which will handle all the decryption of the request needed for you and you will then receive a normal request as usual.


#### Example private key with passphrase

Sometimes the private key will have a passphrase so , in such a case the private key property will accept an object instead of a string 

```
import { HandleRsaRequest } from 'hydra-promoted';

app.use(HandleRsaRequest({
		path: './private.pem',
		passphrase: 'supersecretpassphrase'
	}));
```

also this is how you can use in the middleware that we provide

```
import { HandleRsaRequest, Middleware, AppRequest, AppResponse } from 'hydra-promoted';
import { injectable } from 'inversify';

@injectable()
export class HandleRsa implements Middleware {
    handle(req: AppRequest, res: AppResponse, next: Function) {
        return HandleRsaRequest('./private.pem')(req, res, next);
    }
}
```

we are just calling the HandleRsaRequest which will return a middleware and we are just passing it the req , res and next that it needs it.


#### How the Receiver will respond an encrpyted response

the sender will be waiting for encrypted response too from the receiver so,
we need to have a method too to encrypt the receiver response.

```
import { injectable } from 'inversify';
import { AppRequest, AppResponse, SendSecure } from 'hydra-promoted';

@injectable()
class ExampleController{

	securedFunction(req: AppRequest, res: AppResponse) {
		return SendSecure({
			body: "This response string will be encrypted",
			privateKey:{
				path: './privateKey.pem',
				passphrase: '123'
			},
			res: res
		});
	}

}
```

as the example above this `SendSecure` function will handle all the encryption logic for you
it just encrypts the response using the private key and the other requesting service will just use 
the receiving side public key to decrypt it.


## Encryption helpers

hydra promoted also provide some helpers for encryption and decryption which ease out the Rsa encryption and decrpytion steps.

#### Rsa Encryption using private key

```
import { RsaEncryptWithPrivate } from 'hydra-promoted';

let encryptedString = await RsaEncryptWithPrivate("string you want to decrypt","./privatekey/path.pem");

or

let encryptedString = await RsaEncryptWithPrivate("string you want to decrypt",{
    path: "./privatekey/path.pem",
    passphrase: process.env.PASS_PHRASE
})

```

the return result is the encrypted is a promise which resolves to your encrpyted string
in  a base64 string format

#### Rsa Decryption using public key

```
import { RsaDecryptWithPublic } from 'hydra-promoted';

let yourString = await RsaDecryptWithPublic(encryptedString,"./publickey/path.pem");
```

the rsa decrypt just need your encrypted string and the public key path to decrypt 

**NOTE** of course the the public key should be the other key pair for the encryption private key.

## Some Important Helpers

Now if you were wondering where is the hydra part in this there you go 
hydra-promoted exposes the following variables which will let you use Hydra and hydra express with intellisense.

### HydraExpress
`import { HydraExpress } from 'hydra-promoted';`

This is the hydra express instance .

### Hydra
`import { Hydra } from 'hydra-promoted';`

This is the Hydra instance itself.

### ServerResponse
`import { ServerResponse } from 'hydra-promoted';`
This is a hydra utility for adding service responses.

### ExpressInstance

`import { ExpressInstance as Express } from 'hydra-promoted';`

This is the express instance which is used inside hydra.

## Release Notes

### 3.1.0

added feature that you can now not only send string handlers that target controllers
now you can also put functions instead of strings exactly as express

Example 

```
	Router.get('/path',(req,res) => res.send('I can work with that'));
```

### 3.1.1

bug fix where the middleware handle functions were losing context of the middleware class 

### 3.1.2 , 3.1.3

bug fix where the controller function error handler catch was not running in the case of a promise 
function controller now all controller functions are automatically handled

### 3.2.0

- bug fix where HydraApiRequest was not working correctly from the controllers
- adding a new function for sending an encrypted response back from an encrypted request 
- hydra does not accept string as body but this is handled inside the hydraMakeRequest function by including that string inside an object with a `message` as key and the string as the value.
- fixed a bug where encryped and decrypted body were not parsed and they stayed on their string forms

### 3.2.1,3.2.2

exposed the Rsa encrypt private and decrypt using public functions