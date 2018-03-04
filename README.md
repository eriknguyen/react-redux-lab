# Udemy-React-Redux
*Study logs and projects following React and Redux course by Stephen Grider on Udemy*

## Contents
  * [Advanced topics](#advanced)
  * [Basic topics](#basic)


## <a id="advanced"></a>Advanced React and Redux

### Testing
#### 1. Basic concepts/keywords
  * `describe`: group together similar tests, params: description and a function containing tests
  * `it`: to test a single attribute of a target
  * `expect`: to make a single assertion about a target
  * `beforeEach`: for common setup of all test cases inside a `describe` block

#### 2. Test decision?
  * What do we care of how this component works?
  * What features we need to make sure work correctly?

#### 3. Different cases
  * Expect child element using className: `expect(component.find('.class-name')).to.exist;`
  * Test controlled input component with event simulation: `component.find('textarea').simulate('change', 'new comment');`
  * Pass state and props to testing component with `renderComponent` function

#### 4. Testing with Redux
  * Test action creator
  * Test reducers - TDD comments reducer
    - Test initial case first
    - Test each possible actions that the reducer cares about

___
### Test Environment Setup
#### 1. Purpose of Chai & Mocha - testing suite
  * Something to run the test
    - Loads test, runs them one by one, clean up after each, report errors
    - Eg. Mocha
  * Something to write test
    - Write assertion for certain properties of the test subject
    - eg. Chai

#### 2. Write a test helper
  * Setup testing environment to run like-a browser in the command line
  * Build `renderComponent` helper that render given React component
  * Build helpers for simulating events
  * Setup `chai-jquery` for testing DOM element

---
### Higher Order Components
#### 1. Overview
  * HOC is a function that take in a component and returns a new component with advanced/inhanced features or for other purposes, mainly to reuse component logic
  * Eg. `connect` and `Provider` in `react-redux`

#### 2. Authentication HOC
  * Component to show protected resources + `require_auth` HOC = Composed component that will check user authentication before rendering
  * Redux review:  
    - User click sign in button
    - Call the `authenticate` action creator -> return an action (with type=`CHANGE_AUTH` and payload=`true`)
    - Action will go to the Authentication Reducer -> return new state (what the payload is, `true` or `false`)
    - Application state is updated by reducer
    - New state flows into app -> re-render
  * Context:
    - Similar to props, but spans the entire tree
    - Can access `context` without passing through levels
    - Can be easily abused and be very careful when using
    - The child can only access `context` after declaring `contextTypes` as a class-level property/variable (use `static`)

---
### Middlewares
#### 1. Middleware in Redux
  * Sits between action creators and reducers -> intercepts any action
  * Once actions flow into middleware, the middleware can choose to stop/log/modify/.../do anything with actions

#### 2. Simple app to display list of users
  * App Building Process:
    1. Build app with dummy data
    2. Replace dummy data with AJAX
    3. Write middleware to help fetch data


## <a id="basic"></a>Modern React with Redux

### YouTube video search
___
* `youtube-api-search` npm package for youtube search
* Controlled Component
* Downward Data Flow
* ES6 syntax: `{videos: videos}` === `{videos}`
* Callback for selecting videos: passing from `App` to `VideoList` then pass to `VideoListItem` as prop
* Utility library `lodash`: using `_.debounce()` for throttling search term input change

### Modeling Application State with Redux
___
*Project dir: [`redux-book-list`](https://github.com/eriknguyen/udemy-react-redux/tree/master/redux-book-list)*
#### 1. Reducer
* *A function that return a piece of application state*
    ```js
    // application state
    {
      books: [/*book value*/], // -> Books Reducer
      activeBook: {/*active book value*/} //-> ActiveBook Reducer
    }
    ```
* Implement:
  * Create a reducer
  * Wire it up to the application by using a container component
* Reducer gets 2 arguments: current `state` (only the state that reducer is responsible for) and `action`

#### 2. Container
* *A component that has direct connection with Redux state*
* `react-redux`: bridge between `react` and `redux`
* Choose component to be container: the most parent component that cares about that particular piece of application state
* Using `connect`: takes a function and a component then produces a container
* Whenever state changes:
  - The container will auto re-render
  - The returned object from `mapStateToProps(state)` function will be assigned as `props` to the component

#### 3. Action & Action creator (for changing state)
* Action Creator is a function that returns an action object, is called by some client event (user click, ajax load completion)
* Action has `type` and optional action data 
    ```js
    {
      type: BOOK_SELECTED,
      book: { title: 'Book 1' }
    }
    ```
* Action is auto sent to all reducers
* The reducer that cares about that action will use the switch to check for it's according `action.type` and use `action` data (`payload`) to update the according piece of state
* Application state is updated -> all containers are notified of the changes -> containers will re-render with new `props`

#### 4. Review
* Redux app state is a single plain JS object, completely different from Component state
* App state is formed by reducers, all combined by `combineReducers` functions
* Reducer uses action to manipulate/ change app state. Whenever an action is dispatched, it flows through all reducers. Then each reducer has the option to return different piece of state based on type of action that it receives
* Action must always have `type` and optional data (`payload`, etc.)

### Redux Middleware
___
*Project dir: [`redux-middleware-weatherapp`](https://github.com/eriknguyen/udemy-react-redux/tree/master/redux-middleware-weatherapp])

#### 1. Binding Context
* `this.someEventCallback = this.someEventCallback.bind(this);` bind the context of this component to it's function so the `this` keyword in that function will always refer to this component.

#### 2. Middleware
* A function that takes in action and depending on the action type, payload, etc, it can choose to let the action pass through, manipulate action, log it or stop it >> gate keeper of reducers
* Middleware sits between action creator and reducer
* Why middleware?
* Middleware `redux-promise`:
  * When receive the action -> check if it has a `promise` as a payload
  * If yes -> stop the action -> after promise resolves, create new action and send to reducers

#### 3. Avoid State Mutations in Reducers
* Don't mutate the state
* Ensure that always return new instance of state

#### 4. Chart Component with [`react-sparklines`](https://github.com/borisyankov/react-sparklines)
* Create reusable compoent for chart to avoid repeating code
* Only need functional stateless component to render chart from data

#### 5. Integrate Google map
* `ref` system: allows to have direct reference to a HTML element that has been rendered to the page
  * After render `<div ref="divName" />` in the component, the `div` can be refered by `this.refs.divName` anywhere in the same component
* `componentDidMount()`: a life cycle method that is called right after the element is rendered
* Using Google Map:
  ```
    new google.maps.Map(targetHTMLElement, {
      //config of map
      zoon: 12,
      center: {
        lat: 0,
        lng: 0
      }
    });
  ```

#### 6. Review
* Action creator `fetchWeather` using constant for `action.type`
* Use of middleware `redux-promise`: detect the payload passed as promise to resolve promise and return new action
* Avoid mutating state directly, create and return new object to take a place of existing state
* Destructuring array in ES6
* `react-sparklines` for chart
* Make use of `react-google-maps` element

### React Router & Redux Form
___
*Project: [simple-blog](https://github.com/eriknguyen/udemy-react-redux/tree/master/simple-blog)*

#### 1. Initial setup
* API: All requests are based on this [API Reference](http://reduxblog.herokuapp.com/)
* Install react router: `npm install --save react-router-dom@4.0.0`

#### 2. React Router
* Overall flow:
  1. User changes URL > signal `History` module
  2. `History` module parses the change and tell `react-router` the new URL
  3. `react-router` updates the react components based on the URL
  4. `react-router` tell `React` the components need render
  5. `React` render new content to view

* Basic implementation
  * `BrowerRouter` interacts with `History` library and decide exactly what to do based on the change in URL
  * `Route` provides config to `react-router`
  * Syntax: `<Route path="/route_url" component={RouteComponent} />`
  * `Switch` contains collection of `Route` and render the first matched `Route`
  * `Link` component from `react-router-dom` for an anchor tag
  * Redirect between route: `this.props.history.push('/route/here');`
  * Access params of route: `this.props.match.params.paramName`

#### 3. Implement basic routes
* Create `/` route with `PostsIndex` component and `PostsReducer` to show list of posts
* New Post form:
  1. Scaffold `PostsNew` component
  2. Add route config
  3. Add navigation between index & new
  4. Add form to `PostsNew`
  5. Make action creator to save a post

#### 4. Using [`redux-form`](http://redux-form.com/7.0.0/) for rich function form
* Make sure to hookup form reducer from `redux-form` to the key `form` in `combineReducers()` function
* Flow:
    1. Identify different pieces of form state
    2. Make `Field` component for each piece of state
    3. User changes a `Field` input
    4. `redux-form` auto handle changes
    5. User submits form
    6. Validate inputs & handle form submission (by callback)
* Modules:
    * `Field` only know how to interact with Redux Form without display itself, so `component` property help to return some JSX to render the Field
    * `reduxForm` helper function (similar to `connect` from `react-redux`) -> allows our components to communicate with form reducer
    * `<input {...field.input} />`: pass all event handlers from redux form to an input element
* Form validation
    * Use a helper function `validate()` that is auto called by redux form once the user submits form
    * Return an errors object, if `errors === null`, the form is valid
    * Use `field.meta.error` to access the error object from `error.fieldName` to display error message for field with `name="fieldName"`
    * States of the redux form: *pristine*, *touched*, *invalid*
* Submit form
    * Redux Form only cares about state of the form, doesn't help posting form to backend

* Use destructuring to access property from nested object:  
    `const { meta: { touched, error } } = field;` means:  
    * Get `touch` and `error` from `field.meta` and assign them to `touch` & `error` variables accordingly

* POST form data to server
    * Use a `createPost` action creator: user submit->validate form->call `onSubmit`->call action creator to make API request->after success, navigate to post list
    * `OPTIONS` Request Method is used when making cross-origin request (CORS - Cross-Origin Resource Sharing)

* ES6 syntax
    * Key interpolation
    * `{ ...currentObject }` return a new object that is same with currentObject

* `function mapStateToProps({ posts }, ownProps)` -> `ownProps` is the props that going to the target component
