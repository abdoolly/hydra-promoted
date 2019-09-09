# Hydra Promoted

This package wraps hydra express and it's all built in typescript it offers
hydra and hydra express interfaces , controllers , middlewares and dependency injection capabilities

## Installation

First install it by this command

```
 npm i hydra-promoted
```

also to be able to use dependency injection you will need to install inversify

```
 npm i inversify
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
