# Udemy-React-Redux
*Study logs and projects following React and Redux course by Stephen Grider on Udemy*

## Modern React with Redux

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
    ```
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
    ```
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