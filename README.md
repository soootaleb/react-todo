# React Todo

This Todo App is a simple example to demonstrate React usage & my coding style. While many versions are available on the net, this implementation was made by me alone within several hours (on a sunday afternoon).

While my main projects are done through companies private projects, I'm not allowed to publish anything. So I implemented this code for people to get an overview of my frontend skills.

You can see the result at http://descartes.yoyobro.wtf/

## Tools

Along with React JS, I used several packages:

- RxJs & Redux Observables for async management (e.g notifications auto destruction)
- CreateReactApp CLI (that's why there is no Webpack configuration)
- Jest for unit testing
- TypeScript over Javascript (for autocompletion & proper conventions between my components)

## Style

Please note that I separated containers & components. While this level of detail is not necessary on a simple Todo App, that's a practice a use a lot on bigger project.

Also, I concentrated entities in simples files (reducers, epics, states, ...) because this app is small enought and won't scale. I always split files in dedicated folders for bigger projects.

## Next steps

- Implementing a backend in order to push a bit more on network mechanics & data flow management.
- Introducing my legendary skills with d3.js
- Add functionnalities & more complex design.
