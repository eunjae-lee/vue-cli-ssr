// runs on server only

import { createApp } from "./main";

const getComponentTree = component => {
  const name = component.$options.name || component.$options._componentTag;
  console.log("name:", name);
  const props = component.$attrs;
  const children = component.$children.map(getComponentTree);
  return {
    name,
    props,
    children
  };
};

export default context => {
  // since there could potentially be asynchronous route hooks or components,
  // we will be returning a Promise so that the server can wait until
  // everything is ready before rendering.
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();
    const result = app.$mount();
    console.log({ result });
    console.log(JSON.stringify(getComponentTree(app), null, 2));

    // set server-side router's location
    router.push(context.url);

    // wait until router has resolved possible async components and hooks
    router.onReady(() => {
      // This `rendered` hook is called when the app has finished rendering
      // After the app is rendered, our store is now
      // filled with the state from our components.
      // When we attach the state to the context, and the `template` option
      // is used for the renderer, the state will automatically be
      // serialized and injected into the HTML as `window.__INITIAL_STATE__`.
      context.rendered = () => (context.state = store.state);
      // no matched routes, reject with 404
      const matchedComponents = router.getMatchedComponents();
      if (matchedComponents.length === 0) {
        return reject({ code: 404 });
      }
      // I don't think the following way is used any more.
      // vue-server-renderer@2.6.0+ uses `serverPrefetch`.
      // It doesn't need `asyncData` any more.

      // Promise.all(
      //   matchedComponents.map(component => {
      //     if (component.asyncData) {
      //       return component.asyncData({
      //         store,
      //         route: router.currentRoute
      //       });
      //     }
      //   })
      // ).then(() => {
      //   context.state = store.state;
      //   // the Promise should resolve to the app instance so it can be rendered
      //   resolve(app);
      // });
      resolve(app);
    }, reject);
  });
};
