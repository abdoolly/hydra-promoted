# Hydra Promoted

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

```
import { Controllers , Middlewares } from 'hydra-promoted';

// use it like that
Controllers.provide('./src/controllers/');
Middlewares.provide('./src/middlewares/');

```

the above lines tell hydra to go to those folders and create instances of the controllers and middlewares and put them on objects by their names and paths
to be able to use later when using the Routers.

### Example controller

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
	// optional property that could be used to rename the middleware
	// if does not exist the class name will be used and it will be 			     treated as controllers
	// in case of nested folders
	name = 'TestMiddlewareExample';

	handle(req:  AppRequest,  res:  AppResponse,  next:  Function)  {
		console.log('Hello world Middleware');
		return  next();
	}
}
```

as you can see above the handle function is the actual middleware
the `name` property here is an optional property which will be used for using the middleware if it does not exist the class name will be used.

### Using middlewares

middlewares are used like that

```
import { Router } from 'hydra-promoted';

// this will register the '/' to go to the example controller and run // the index function.
Router.get('/', 'TestMiddlewareExample','ExampleController@index');

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