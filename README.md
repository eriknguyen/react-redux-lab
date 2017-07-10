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
* Usage: npm package `redux-middleware`